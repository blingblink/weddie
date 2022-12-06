import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'

import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  BanknotesIcon,
} from '@heroicons/react/20/solid'

import Layout from '../../components/Layout';
import { dateToString } from '../../components/utils';
import prisma from '../../lib/prisma';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function ReportIdPage(props) {
  const {
    report,
  } = props;

  const { dailyReports } = report;

  const cards = [
    { name: 'Tổng doanh thu', icon: BanknotesIcon, value: `${report.totalRevenue} VND` },
    // More items...
  ]

  return (
    <Layout title="Drinkies" description="Selling drinks" className="bg-gray-50">
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Báo cáo tháng {report.month}/{report.year}</h1>
          </div>
        </div>

        {/* Overview cards */}
        <div className="mt-6 px-4 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Tổng quát</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {cards.map((card) => (
              <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{card.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects list (only on smallest breakpoint) */}
        <div className="mt-10 sm:hidden">
          <div className="px-4 sm:px-6">
            <h2 className="text-sm font-medium text-gray-900">Báo cáo ngày</h2>
          </div>
          <ul role="list" className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
            {dailyReports.map((dailyReport) => (
              <li key={dailyReports.id}>
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full px-4 py-4 items-start justify-between text-left text-gray-400">
                        <span className="flex flex-1 space-x-2 truncate">
                          <span className="flex flex-col truncate text-sm text-gray-500">
                            <span className="truncate text-sm font-medium leading-6 text-gray-900">
                              {dailyReport.date}
                            </span>
                            <span className="truncate text-sm font-medium leading-6">
                              {dailyReport.numOfWeddings} tiệc cưới
                            </span>
                            <span>{dailyReport.revenue} VND</span>
                          </span>
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel as="div" className="mt-2">
                        <ul role="list" className="text-gray-500 space-y-4 px-6">
                          {dailyReport.weddings.map(wedding => (
                            <li key={wedding.id}>
                              <a href={`/weddings/${wedding.id}`} className="text-gray-500 hover:text-gray-800">
                                Đám cưới của {wedding.groomName}
                                <span className="text-base font-medium text-gray-500">{' '}&{' '}</span>
                                {wedding.brideName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects table (small breakpoint and up) */}
        <div className="mt-8 hidden sm:block">
          <div className="inline-block min-w-full border-b border-gray-200 align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th
                    className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Ngày
                  </th>
                  <th
                    className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Số lượng tiệc cưới
                  </th>
                  <th
                    className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Doanh thu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {dailyReports.map((dailyReport) => (
                  <tr key={dailyReport.id}>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                              <span className="font-medium text-gray-900">{dailyReport.date}</span>
                              <span className="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel as="div" className="mt-2">
                              <ul role="list" className="text-gray-500 space-y-4">
                                {dailyReport.weddings.map(wedding => (
                                  <li key={wedding.id}>
                                    <a href={`/weddings/${wedding.id}`} className="text-gray-500 hover:text-gray-800">
                                      Đám cưới của {wedding.groomName}
                                      <span className="text-base font-medium text-gray-500">{' '}&{' '}</span>
                                      {wedding.brideName}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </td>
                    <td className="px-6 py-3 text-right text-sm text-gray-500">
                      {dailyReport.numOfWeddings}
                    </td>
                    <td className="px-6 py-3 text-right text-sm text-gray-500">
                      {dailyReport.revenue} VND
                    </td>
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

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { id } = params;
  const report = await prisma.monthlyReport.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      month: true,
      year: true,
      totalRevenue: true,
      createdAt: true,

      dailyReports: {
        orderBy: {
          date: 'asc',
        },
        select: {
          id: true,
          date: true,
          numOfWeddings: true,
          revenue: true,

          weddingsInDailyReport: {
            select: {
              wedding: {
                select: {
                  id: true,
                  groomName: true,
                  brideName: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const formattedReport = {
    ...report,
    totalRevenue: report.totalRevenue.toString(),
    createdAt: dateToString(report.createdAt),
    dailyReports: report.dailyReports.map(dailyReport => ({
      ...dailyReport,
      date: dateToString(dailyReport.date),
      revenue: dailyReport.revenue.toString(),
      weddings: dailyReport.weddingsInDailyReport.map(weddingInReport => weddingInReport.wedding),
    })),
  };

  return {
    props: {
      report: formattedReport,
    },
  }
}