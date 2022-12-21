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

export default function DishesPage(props) {
    const { dishes } = props;
    const onCreate = async (dish) => {
        try {
            const res = await fetch('/api/dish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dish),
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
                body: JSON.stringify(dish),
            });
            const resJson = await res.json();
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const onDelete = async (dish) => {
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
          default: '',
        },
        {
          key: 'price',
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
          label: 'Còn món',
          type: 'checkbox',
          default: true,
        },
    ]

    const validationSchema = Yup.object({
      name: Yup.string()
        .max(50, 'Nhiều nhất 50 kí tự')
        .min(1, 'Ít nhất 1 kí tự')
        .required('Bắt buộc'),
      price: Yup.number()
        .required('Bắt buộc')
        .positive('Phải lớn hơn 0')
        .integer()
        .required('Bắt buộc'),
      note: Yup.string()
        .max(50, 'Nhiều nhất 100 kí tự'),
      isAvailable: Yup.boolean()
        .default(true),
    });

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
          validationSchema={validationSchema}
          resource="employee"
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
