import React, { ReactNode } from "react";
import Header from "./Header";
import Head from 'next/head';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  CalendarDaysIcon,
  CogIcon,
  DocumentChartBarIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  ShoppingCartIcon,
  SquaresPlusIcon,
  TruckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronLeftIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { hasPermission } from '../lib/permissions';

const navigation = [
  { name: 'Tiệc cưới', href: '/', icon: HomeIcon },
  { name: 'Sảnh', href: '/halls', icon: MapIcon },
  { name: 'Dịch vụ', href: '/services', icon: TruckIcon },
  { name: 'Món ăn', href: '/dishes', icon: ShoppingCartIcon },
  { name: 'Các ca làm việc', href: '/working_shifts', icon: CalendarIcon },
  { name: 'Lịch làm việc nhân viên', href: '/working_schedules', icon: CalendarDaysIcon },
  { name: 'Nhân viên', href: '/employees', icon: UserGroupIcon },
  { name: 'Báo cáo', href: '/reports', icon: DocumentChartBarIcon },
]

const secondaryNavigation = [
  { name: 'Apps', href: '#', icon: SquaresPlusIcon },
  { name: 'Settings', href: '#', icon: CogIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Layout = props => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const isSignedIn = !!(session);
  const { user } = session || {};
  const hasAccessToPage = hasPermission({ user });

  // TODO: Uncomment this after adding Landing page
  // if (status !== 'loading' && !hasAccessToPage) return 'No permissions';

  return (
    <div className={props.className || 'bg-white'}>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <div className="flex h-full h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    {/* <div className="flex flex-shrink-0 items-center px-4"> */}
                    {/*   <img */}
                    {/*     className="h-8 w-auto" */}
                    {/*     src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500" */}
                    {/*     alt="Your Company" */}
                    {/*   /> */}
                    {/* </div> */}
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-4 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      {/* <hr className="my-5 border-t border-gray-200" aria-hidden="true" /> */}
                      {/* <div className="space-y-1 px-2"> */}
                      {/*   {secondaryNavigation.map((item) => ( */}
                      {/*     <a */}
                      {/*       key={item.name} */}
                      {/*       href={item.href} */}
                      {/*       className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                      {/*     > */}
                      {/*       <item.icon */}
                      {/*         className="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" */}
                      {/*         aria-hidden="true" */}
                      {/*       /> */}
                      {/*       {item.name} */}
                      {/*     </a> */}
                      {/*   ))} */}
                      {/* </div> */}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <div className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          {isSignedIn ? (
                            <img className="inline-block h-10 w-10 rounded-full" src={user.image} alt="" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline-block h-10 w-10 rounded-full">
                             <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          
                        </div>
                        <div className="ml-3">
                          {isSignedIn ? (
                            <>
                              <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                              <button
                                className="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                                onClick={() => signOut()}
                              >
                                Đăng xuất
                              </button>
                            </>
                          ) : (
                            <a
                              href="/api/auth/signin"
                              className="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                            >
                              Đăng nhập
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                {/* <div className="flex flex-shrink-0 items-center px-4"> */}
                {/*   <img */}
                {/*     className="h-8 w-auto" */}
                {/*     src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500" */}
                {/*     alt="Your Company" */}
                {/*   /> */}
                {/* </div> */}
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  {/* <hr className="my-5 border-t border-gray-200" aria-hidden="true" /> */}
                  {/* <div className="flex-1 space-y-1 px-2"> */}
                  {/*   {secondaryNavigation.map((item) => ( */}
                  {/*     <a */}
                  {/*       key={item.name} */}
                  {/*       href={item.href} */}
                  {/*       className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                  {/*     > */}
                  {/*       <item.icon */}
                  {/*         className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" */}
                  {/*         aria-hidden="true" */}
                  {/*       /> */}
                  {/*       {item.name} */}
                  {/*     </a> */}
                  {/*   ))} */}
                  {/* </div> */}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <div className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      {isSignedIn ? (
                        <img className="inline-block h-9 w-9 rounded-full" src={user.image} alt="" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline-block h-10 w-10 rounded-full">
                         <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      {isSignedIn ? (
                        <>
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                          <button
                            className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                            onClick={() => signOut()}
                          >
                            Đăng xuất
                          </button>
                        </>
                      ) : (
                        <a
                          href="/api/auth/signin"
                          className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                        >
                          Đăng nhập
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              {/* <div> */}
              {/*   <img */}
              {/*     className="h-8 w-auto" */}
              {/*     src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500" */}
              {/*     alt="Your Company" */}
              {/*   /> */}
              {/* </div> */}
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {props.children}
              </article>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;