import { Fragment, useState } from 'react';
import Router from 'next/router';
import * as Yup from 'yup';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import Layout from '../components/Layout';
import ListPage from '../components/ListPage';
import prisma from '../lib/prisma'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReportsPage(props) {
  const { reports } = props;

  // TODO: Update API
  const onCreate = async (report) => {
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: parseInt(report.month),
          year: parseInt(report.year),
        }),
      });
      const resJson = await res.json();
      await Router.push(`/reports/${resJson.id}`);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const onDelete = async (report) => {
    try {
      const res = await fetch('/api/report', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: report.id,
        }),
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const columns = [
    {
      key: 'createdAt',
      label: 'Thời gian tạo',
      type: 'text',
      default: (new Date()).toISOString().substring(0, 10),
      disabled: true,
      href: (report) => `/reports/${report.id}`,
    },
    {
      key: 'month',
      label: 'Tháng',
      type: 'number',
      default: '',
      disabled: 'edit',
    },
    {
      key: 'year',
      label: 'Năm',
      type: 'number',
      default: '',
      disabled: 'edit',
    },
    {
      key: 'totalRevenue',
      label: 'Tổng doanh thu',
      type: 'number',
      default: '',
      disabled: true,
    },
  ];

  const validationSchema = Yup.object({
    month: Yup.number()
      .min(1, 'Tháng phải lớn hơn hoặc bằng 1.')
      .max(12, 'Tháng phải nhỏ hơn hoặc bằng 12.')
      .integer()
      .required('Bắt buộc'),
    year: Yup.number()
      .min(2000, 'Năm phải lớn hơn hoặc bằng 2000.')
      // .max(new Date().getFullYear(), 'Năm không được trong tương lai')
      .integer()
      .required('Bắt buộc'),
  });

  return (
    <Layout title="Drinkies" description="Selling drinks">
      <ListPage
        pageTitle="Báo cáo tháng"
        smallPageTableName="Các báo cáo"
        createButtonText="Tạo báo cáo"
        columns={columns}
        values={reports}
        onCreate={onCreate}
        onDelete={onDelete}
        validationSchema={validationSchema}
        resource="report"
      />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const reports = await prisma.monthlyReport.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      month: true,
      year: true,
      totalRevenue: true,
      createdAt: true

      // dailyReports: {
      //   wedding: {
      //     orderBy: {
      //       date: "asc",
      //     },
      //     select: {
      //       id: true,
      //       date: true,
      //       numOfWeddings: true,
      //       revenue: true,
      //     },
      //   },
      // },
    },
  });

  const formattedReports = reports.map(report => ({
    ...report,
    totalRevenue: report.totalRevenue.toString(),
    createdAt: report.createdAt.toISOString().substring(0, 16).replace('T', ' '),
  }));

  // const formattedReports = reports.map(report => ({
  //   ...report,
  //   dailyReports: report.dailyReports.map(dailyReport => ({
  //     ...dailyReport,
  //     date: dailyReport.date.toISOString().substring(0, 10),
  //   })),
  // }));

  return {
    props: {
      reports: formattedReports,
    },
  }
}

