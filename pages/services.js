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
      label: 'Còn hàng',
      type: 'checkbox',
    },
  ]

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

