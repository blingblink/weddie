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
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";
import Layout from '../components/Layout';
import ListPage from '../components/ListPage';
import prisma from '../lib/prisma'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function EmployeesPage(props) {
  // Only Admin and QuanLy could modify the roles
  const { users } = props;
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
      default: '',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      disabled: true,
      default: '',
    },
    {
      key: 'roleId',
      label: 'Mã vai trò',
      type: 'number',
      default: '',
    },
    {
      key: 'disabled',
      label: 'Vô hiệu hoá',
      type: 'checkbox',
      default: false,
    },
  ];
  const validationSchema = Yup.object({
    roleId: Yup.number()
      .required('Bắt buộc')
      .positive('Phải lớn hơn 0')
      .integer(),
    disabled: Yup.boolean()
      .default(false),
  });

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

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  const users = await prisma.user.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      OR: [
        {
          roleId: {
            not: 0, // Exclude Admin users
          },
        },
        {
          roleId: null,
        },
      ],
      AND: {
        id: {
          not: (session && session.user) ? session.user.id : null,
        },
      },
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

