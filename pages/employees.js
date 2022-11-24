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

export default function EmployeesPage(props) {
  // Only Admin and QuanLy could modify the roles
  const { users } = props;
  console.log('users', users)
  const onUpdate = async (user) => {
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const resJson = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Tên nhân viên',
      type: 'text',
      disabled: true,
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      disabled: true,
    },
    {
      key: 'roleId',
      label: 'Mã vai trò',
      type: 'number',
    },
    {
      key: 'disabled',
      label: 'Vô hiệu hoá',
      type: 'checkbox',
    },
  ]

  return (
    <Layout title="Danh sách nhân viên" description="Quản lý nhân viên">
      <ListPage
        pageTitle="Nhân viên"
        smallPageTableName="Các nhân viên"
        columns={columns}
        values={users}
        onUpdate={onUpdate}
      />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      OR: [
        {
          roleId: {
            not: 0,
          },
        },
        {
          roleId: null,
        },
      ],
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      roleId: true,
      disabled: true,
    },
  });
  const formattedUsers = users.map(user => ({
    ...user,
    disabled: (user.disabled === null || user.disabled === undefined) ? false : user.disabled,
  }));

  return {
    props: {
      users: formattedUsers,
    },
  }
}

