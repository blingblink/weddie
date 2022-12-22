import { Fragment, useState } from 'react'
import * as Yup from 'yup';
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
            default: '',
        },
        {
            key: 'type',
            label: 'Loại sảnh',
            type: 'number',
            default: '',
        },
        {
            key: 'maxTables',
            label: 'Số lượng bàn',
            type: 'number',
            default: 0,
        },
        {
            key: 'pricePerTable',
            label: 'Giá tiền',
            type: 'number',
            default: 0,
        },
        {
            key: 'note',
            label: 'Ghi chú',
            type: 'text',
            default: '',
        },
        {
            key: 'isAvailable',
            label: 'Có thể sử dụng',
            type: 'checkbox',
            default: true,
        },
    ];
    const validationSchema = Yup.object({
        name: Yup.string()
            .max(50, 'Nhiều nhất 50 kí tự')
            .min(1, 'Ít nhất 1 kí tự')
            .required('Bắt buộc'),
        type: Yup.number()
            .required('Bắt buộc')
            .positive('Phải lớn hơn 0')
            .integer()
            .required('Bắt buộc'),
        maxTables: Yup.number()
            .required('Bắt buộc')
            .positive('Phải lớn hơn 0')
            .integer()
            .required('Bắt buộc'),
        pricePerTable: Yup.number()
            .min(1500000, 'Giá bàn phải lớn hơn 1,500,000 VND')
            .max(5000000, 'Giá bàn phải nhỏ hơn 5000000')
            .required('Bắt buộc')

            .integer()
            .required('Bắt buộc'),
        note: Yup.string()
            .max(50, 'Nhiều nhất 100 kí tự'),
        isAvailable: Yup.boolean()
            .default(true),
    });

    return (
        <Layout title="Sảnh" description="Các sảnh của nhà hàng">
            <ListPage
                pageTitle="Sảnh"
                smallPageTableName="Các sảnh"
                createButtonText="Tạo sảnh"
                columns={columns}
                values={halls}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                validationSchema={validationSchema}
                resource="hall"
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
