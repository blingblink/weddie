import { Fragment, useState } from 'react'
import { Dialog, Switch, Transition, RadioGroup, Menu } from '@headlessui/react'
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Layout from '../../components/Layout';
// import prisma from '../lib/prisma';

const tabs = [
  { name: 'Thông tin cơ bản', href: '#', current: true },
  { name: 'Dịch vụ', href: '#', current: false },
  { name: 'Món ăn', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function WeddingCreatePage(props) {
  return (
    <Layout title="Drinkies" description="Selling drinks">
      <main className="flex-1">
        <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Thông tin tiệc cưới</h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                {/* Tabs */}
                <div className="lg:hidden">
                  <label htmlFor="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current
                              ? 'border-purple-500 text-purple-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                          )}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Description list with inline editing */}
                <div className="mt-6 divide-y divide-gray-200 space-y-6 lg:col-span-9 lg:px-0">
                  <section aria-labelledby="payment-details-heading">
                    <form action="#" method="POST">
                      <div className="lg:pb-8">
                        {/* <div> */}
                        {/*   <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2> */}
                        {/*   <p className="mt-1 text-sm text-gray-500"> */}
                        {/*     This information will be displayed publicly so be careful what you share. */}
                        {/*   </p> */}
                        {/* </div> */}

                        <div className="mt-6 grid grid-cols-4 gap-6">
                          <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="groom-name" className="block text-sm font-medium text-gray-700">
                              Tên chú rể
                            </label>
                            <input
                              type="text"
                              name="groom-name"
                              id="groom-name"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="bride-name" className="block text-sm font-medium text-gray-700">
                              Tên cô dâu
                            </label>
                            <input
                              type="text"
                              name="bride-name"
                              id="bride-name"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700">
                              Điện thoại
                            </label>
                            <input
                              type="text"
                              name="contact-number"
                              id="contact-number"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-4 sm:col-span-1">
                            <label htmlFor="wedding-date" className="block text-sm font-medium text-gray-700">
                              Ngày cưới
                            </label>
                            <input
                              type="text"
                              name="wedding-date"
                              id="wedding-date"
                              autoComplete="cc-exp"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                              placeholder="DD / MM / YY"
                            />
                          </div>

                          <div className="col-span-4 sm:col-span-1">
                            <label
                              htmlFor="security-code"
                              className="flex items-center text-sm font-medium text-gray-700"
                            >
                              <span>Security code</span>
                              <QuestionMarkCircleIcon
                                className="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
                                aria-hidden="true"
                              />
                            </label>
                            <input
                              type="text"
                              name="security-code"
                              id="security-code"
                              autoComplete="cc-csc"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="working-shift" className="block text-sm font-medium text-gray-700">
                              Ca
                            </label>
                            <select
                              id="working-shift"
                              name="working-shift"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>

                          <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="hall" className="block text-sm font-medium text-gray-700">
                              Sảnh
                            </label>
                            <select
                              id="hall"
                              name="hall"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>

                          <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                              Số lượng bàn
                            </label>
                            <input
                              type="number"
                              name="postal-code"
                              id="postal-code"
                              autoComplete="postal-code"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        >
                          Huỷ
                        </button>
                        <button
                          type="submit"
                          className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        >
                          Tạo
                        </button>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
