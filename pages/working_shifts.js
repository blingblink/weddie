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

export default function WorkingShiftsPage(props) {
  const { workingShifts } = props;

  const onCreate = async (workingShift) => {
    try {
      const res = await fetch('/api/working_shifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workingShift),
      });
      const resJson = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const onUpdate = async (workingShift) => {
    try {
      const res = await fetch('/api/working_shift', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workingShift),
      });
      const resJson = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const onDelete = async (workingShift) => {
    try {
      const res = await fetch('/api/working_shift', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workingShift),
      });
      const resJson = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const columns = [
    {
      key: 'weekday',
      label: 'Ngày trong tuần',
      type: 'number',
    },
    {
      key: 'startHour',
      label: 'Giờ bắt đầu',
      type: 'number',
    },
    {
      key: 'endHour',
      label: 'Giờ kết thúc',
      type: 'number',
    },
  ]

  return (
    <Layout title="Drinkies" description="Selling drinks">
      <ListPage
        pageTitle="Ca làm việc"
        smallPageTableName="Các ca làm việc"
        createButtonText="Tạo ca làm việc"
        columns={columns}
        values={workingShifts}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const workingShifts = await prisma.workingShift.findMany({
    orderBy: {
      weekday: "asc",
    },
    select: {
      id: true,
      weekday: true,
      startHour: true,
      endHour: true,
    },
  });

  return {
    props: {
      workingShifts,
    },
  }
}

