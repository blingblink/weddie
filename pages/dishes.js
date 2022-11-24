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

export default function DishesPage(props) {
    const { dishes } = props;
    const onCreate = async (hall) => {
        try {
            const res = await fetch('/api/dish', {
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
    const onUpdate = async (dish) => {
        try {
            const res = await fetch('/api/dish', {
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
            const res = await fetch('/api/dish', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dish),
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
            label: 'Tên Món Ăn',
            type: 'text',
        },
        {
            key: 'price',
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
            label: 'Còn món',
            type: 'checkbox',
        },

    ]

    return (
        <Layout title="Drinkies" description="Selling drinks">
            <ListPage
                pageTitle="Món Ăn"
                smallPageTableName="Các Món Ăn"
                createButtonText="Tạo Món"
                columns={columns}
                values={dishes}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </Layout>
    );
}
export const getServerSideProps = async () => {
    const dishes = await prisma.dish.findMany({
        orderBy: {
            name: "asc",
        },
        select: {
            id: true,
            name: true,
            price: true,
            note: true,
            isAvailable: true,


        },
    });

    return {
        props: {
            dishes,
        },
    }
}
