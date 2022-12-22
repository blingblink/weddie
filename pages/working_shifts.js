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

const daysOfWeek = ["Chủ nhật", "Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];

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
      default: '',
      displayConverter: (weekdayInt) => daysOfWeek[weekdayInt],
    },
    {
      key: 'startHour',
      label: 'Giờ bắt đầu (24h)',
      type: 'number',
      default: '',
    },
    {
      key: 'endHour',
      label: 'Giờ kết thúc (24h)',
      type: 'number',
      default: '',
    },
  ]
  const validationSchema = Yup.object({
    weekday: Yup.number()
      .required('Bắt buộc')
      .min(0, 'Lớn hơn hoặc bằng 0 (0 là chủ nhật, 6 là thứ bảy).')
      .max(6, 'Nhỏ hơn hoặc bằng 6 (0 là chủ nhật, 6 là thứ bảy).')
      .integer(),
    startHour: Yup.number()
      .min(0, 'Lớn hơn hoặc bằng 0')
      .max(24, 'Nhỏ hơn hoặc bằng 24')
      .integer()
      .required('Bắt buộc'),
    endHour: Yup.number()
      .min(0, 'Lớn hơn hoặc bằng 0')
      .max(24, 'Nhỏ hơn hoặc bằng 24')
      .integer()
      .required('Bắt buộc'),
  });

  return (
    <Layout title="Ca làm việc" description="Các ca làm việc của nhà hàng">
      <ListPage
        pageTitle="Ca làm việc"
        smallPageTableName="Các ca làm việc"
        createButtonText="Tạo ca làm việc"
        columns={columns}
        values={workingShifts}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        validationSchema={validationSchema}
        resource="working_shift"
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

