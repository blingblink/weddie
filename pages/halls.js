import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
    ChevronRightIcon,
    ChevronUpDownIcon,
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import Router from 'next/router';
import Layout from '../components/Layout';
import ListPage from '../components/ListPage';
import prisma from '../lib/prisma'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HallsPage(props) {
    const { halls } = props;
    const onCreate = async (hall) => {
        try {
            const res = await fetch('/api/hall', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hall),
            });
            const resJson = await res.json();
        } catch (error) {
            console.error(error);
            return;
        }
    };
    const onUpdate = async (hall) => {
        try {
            const res = await fetch('/api/hall', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hall),
            });
            const resJson = await res.json();
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const onDelete = async (hall) => {
        try {
            const res = await fetch('/api/hall', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hall),
            });
            const resJson = await res.json();
        } catch (error) {
            console.error(error);
            return;
        }
    }
    const columns = [
        {
            key: 'name',
            label: 'Tên sảnh',
            type: 'text',
        },
        {
            key: 'type',
            label: 'Loại sảnh',
            type: 'number',
        },
        {
            key: 'maxTables',
            label: 'Số lượng bàn',
            type: 'number',
        },
        {
            key: 'pricePerTable',
            label: 'Giá tiền',
            type: 'number',
        },
        {
            key: 'note',
            label: 'Ghi chú',
            type: 'text',
        },
        {
            key: 'isAvailable',
            label: 'Có thể sử dụng',
            type: 'checkbox',
        },
    ]

    return (
        <Layout title="Drinkies" description="Selling drinks">
            <ListPage
                pageTitle="Sảnh"
                smallPageTableName="Các sảnh"
                createButtonText="Tạo sảnh"
                columns={columns}
                values={halls}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </Layout>
    );
}
export const getServerSideProps = async () => {
    const halls = await prisma.hall.findMany({
        orderBy: {
            name: "asc",
        },
        select: {
            id: true,
            name: true,
            type: true,
            maxTables: true,
            pricePerTable: true,
            note: true,
            isAvailable: true,


        },
    });

    return {
        props: {
            halls,
        },
    }
}
