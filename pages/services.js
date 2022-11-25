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

export default function ServicesPage(props) {
  const { services } = props;

  const onCreate = async (service) => {
    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      const resJson = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const onUpdate = async (service) => {
    try {
      const res = await fetch('/api/service', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      const resJson = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const onDelete = async (service) => {
    try {
      const res = await fetch('/api/service', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
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
      label: 'Tên dịch vụ',
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
      label: 'Còn hàng',
      type: 'checkbox',
      default: true,
    },
  ];
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
        pageTitle="Dịch vụ"
        smallPageTableName="Các dịch vụ"
        createButtonText="Đặt dịch vụ"
        columns={columns}
        values={services}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        validationSchema={validationSchema}
      />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const services = await prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
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
      services,
    },
  }
}

