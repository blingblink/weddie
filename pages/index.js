import { Fragment, useState } from 'react'
import { useSession } from "next-auth/react";
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
import { hasPermission } from '../lib/permissions';


const statuses = {
  paid: {
    label: 'Đã thanh toán',
    style: 'bg-green-100 text-green-800',
  },
  waiting_for_payment: {
    label: 'Chưa thanh toán',
    style: 'bg-yellow-100 text-yellow-800',
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function WeddingPage(props) {
  const { weddings } = props;

  const { data: session } = useSession();
  const isSignedIn = !!(session);
  const { user } = session || {};
  const hasWriteAccess = hasPermission({ user, resource: '', action: 'write' });

  // // 1. Uncomment this button to set up DB
  // const setupDB = async () => {
  //   await fetch('/api/setup_db', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // };

  return (
    <Layout title="Drinkies" description="Selling drinks">
      <main className="flex-1">
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Trang chủ</h1>
          </div>
          {/* 2. Uncomment this button to set up DB */}
          {/* <div className="mt-4 flex sm:mt-0 sm:ml-4"> */}
          {/*   <button */}
          {/*     type="button" */}
          {/*     className="order-0 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3" */}
          {/*     onClick={async () => await setupDB()} */}
          {/*   > */}
          {/*     Setup DB */}
          {/*   </button> */}
          {/* </div> */}

          {hasWriteAccess && (
            <div className="mt-4 flex sm:mt-0 sm:ml-4">
              <button
                type="button"
                className="order-0 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
                onClick={async () => await Router.push('/weddings/create')}
              >
                Đặt tiệc cưới
              </button>
            </div>
          )}
        </div>

        {/* Activity list (smallest breakpoint only) */}
        <div className="mt-6 sm:hidden">
          <div className="px-4 sm:px-6">
            <h2 className="text-sm font-medium text-gray-900">Các tiệc cưới</h2>
          </div>
          <ul role="list" className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
            {weddings.map((wedding) => (
              <li key={wedding.id}>
                <a href={`/weddings/${wedding.id}`} className="block bg-white px-4 py-4 hover:bg-gray-50">
                  <span className="flex items-center space-x-4">
                    <span className="flex flex-1 space-x-2 truncate">
                      <span className="flex flex-col truncate text-sm text-gray-500">
                        <span className="truncate text-sm font-medium leading-6">
                          <span className="truncate font-normal text-gray-500">Chú rể </span>
                          {wedding.groomName}
                        </span>
                        <span className="truncate text-sm font-medium leading-6">
                          <span className="truncate font-normal text-gray-500">Cô dâu </span>
                          {wedding.brideName}
                        </span>
                        <time dateTime={wedding.dateOfWedding}>{wedding.dateOfWedding}</time>
                      </span>
                    </span>
                    <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Activity table (small breakpoint and up) */}
        <div className="hidden sm:block">
          <div className="inline-block min-w-full border-b border-gray-200 align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-b border-gray-200">
                  <th
                    className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Tiệc cưới
                  </th>
                  <th
                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Sảnh
                  </th>
                  <th
                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Thời gian
                  </th>
                  <th
                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Tình trạng
                  </th>
                  <th
                    className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Ngày cưới
                  </th>
                  {hasWriteAccess && (
                    <th
                      className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Hành động
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {weddings.map((wedding) => (
                  <tr key={wedding.id} className="bg-white">
                    <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      <div className="flex">
                        <a href={`/weddings/${wedding.id}`} className="truncate hover:text-gray-600">
                          <span>
                            <span className="text-sm font-medium leading-6">
                              <span className="font-normal text-gray-500">Chú rể </span>
                              {wedding.groomName}
                            </span>
                            <span className="font-normal text-gray-500">&nbsp;&&nbsp;</span>
                            <span className="text-sm font-medium leading-6">
                              <span className="font-normal text-gray-500">Cô dâu </span>
                              {wedding.brideName}
                            </span>
                          </span>
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      {wedding.hall.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      {wedding.workingShift.startHour}h - {wedding.workingShift.endHour}h
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                      <span
                        className={classNames(
                          statuses[wedding.status].style,
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                        )}
                      >
                        {statuses[wedding.status].label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <time dateTime={wedding.dateOfWedding}>{wedding.dateOfWedding}</time>
                    </td>
                    {hasWriteAccess && (
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                        <a
                          href={`/weddings/${wedding.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Chỉnh sửa
                        </a>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const weddings = await prisma.wedding.findMany({
    orderBy: {
      dateOfWedding: "desc",
    },
    include: {
      workingShift: {
        select: {
          startHour: true,
          endHour: true,
        },
      },
      hall: {
        select: {
          name: true,
        },
      },
      receipts: {
        select: {
          isDeposit: true,
          isPaid: true,
        },
      },
    }
  });
  const formattedWeddings = weddings.map(wedding => {
    const paidReceipt = wedding.receipts.find(receipt => !receipt.isDeposit && receipt.isPaid);
    const status = paidReceipt ? 'paid' : 'waiting_for_payment';
    delete wedding.receipts;

    return ({
      ...wedding,
      status,
      dateOfWedding: wedding.dateOfWedding.toISOString().substring(0, 10),
      createdAt: wedding.createdAt.toISOString().substring(0, 10),
      updatedAt: wedding.updatedAt.toISOString().substring(0, 10),
    });
  })

  return {
    props: {
      weddings: formattedWeddings,
    },
  }
}

