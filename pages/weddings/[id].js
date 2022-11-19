import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  ArrowLongLeftIcon,
  CheckIcon,
  ClockIcon,
  DocumentPlusIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';

const eventTypes = {
  initial: { icon: DocumentPlusIcon, bgColorClass: 'bg-gray-400' },
  pending: { icon: ClockIcon, bgColorClass: 'bg-gray-500' },
  advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-gray-100 text-gray-800',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function WeddingInfoPage(props) {
  const { wedding } = props;
  const {
    hall,
    workingShift,
    dishes,
    services,
    contracts,
    receipts,
  } = wedding;

  const nextActions = {
    payDeposit: {
      buttonText: 'Thanh toán tiền cọc',
      href: `/weddings/${wedding.id}/pay`,
    },
    payTotal: {
      buttonText: 'Thanh toán tổng tiền',
      href: `/weddings/${wedding.id}/pay`,
    },
  }


  // Populate the activities in the timeline
  const actions = [];
  const initialActivities = [
    {
      type: eventTypes.initial,
      content: 'Tiệc cưới được đặt',
      // target: 'Front End Developer',
      date: wedding.createdAt,
    },
    // {
    //   type: eventTypes.completed,
    //   content: 'Hợp đồng được tạo',
    //   date: wedding.createdAt,
    // },
    {
      type: eventTypes.completed,
      content: 'Đơn đặt cọc và tổng tiền được tạo',
      date: wedding.createdAt,
    },
  ];
  const depositReceipt = receipts.find(receipt => receipt.isDeposit && !receipt.isCancelled);
  const finalReceipt = receipts.reverse().find(receipt => !receipt.isDeposit);

  const activitiesWithDate = [];
  const pendingActivities = [];

  if (depositReceipt.isPaid)
    activitiesWithDate.push({
      type: eventTypes.completed,
      content: 'Tiền cọc đã được thanh toán',
      target: 'Khách hàng',
      date: depositReceipt.paidAt,
    });
  else {
    pendingActivities.push({
      type: eventTypes.pending,
      content: 'Chờ thanh toán tiền cọc từ',
      target: 'Khách hàng',
    });
    actions.push(nextActions.payDeposit);
  }

  if (finalReceipt.isPaid)
    activitiesWithDate.push({
      type: eventTypes.completed,
      content: 'Tổng tiền đã được thanh toán bởi',
      target: 'Khách hàng',
      date: depositReceipt.paidAt,
    });
  else {
    pendingActivities.push({
      type: eventTypes.pending,
      content: 'Chờ thanh toán tổng tiền từ',
      target: 'Khách hàng',
    });
    actions.push(nextActions.payTotal);
  }

  const today = new Date();
  const weddingDate = new Date(wedding.dateOfWedding);
  if (today > weddingDate)
    activitiesWithDate.push({
      type: eventTypes.pending,
      content: (
        <span>
          Còn <span className="font-medium text-gray-900">
            {Math.round((today - weddingDate) / (1000 * 60 * 60 * 24))}
          </span>
          {' '}ngày đến ngày cưới{' '}
          <span className="font-medium text-gray-900">
            {wedding.dateOfWedding}
          </span>
        </span>
      ),
    });
  else if (today < weddingDate)
    activitiesWithDate.push({
      type: eventTypes.completed,
      content: 'Tiệc cưới đã hoàn thành',
      date: wedding.dateOfWedding,
    });
  else
    activitiesWithDate.push({
      type: eventTypes.completed,
      content: 'Tiệc cưới diễn ra vào hôm nay',
      date: wedding.dateOfWedding,
    });

  activitiesWithDate.sort((act1, act2) => new Date(act1.date) - new Date(act2.date));
  const timeline = initialActivities.concat(activitiesWithDate, pendingActivities)

  // Decide which action to show next
  const nextAction = actions.length > 0 ? actions[0] : null;

  return (
    <Layout title="Drinkies" description="Selling drinks" className="bg-gray-50">
      <main className="py-10">
        {/* Page header */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {wedding.groomName}
                <span className="text-base font-medium text-gray-500">{' '}&{' '}</span>
                {wedding.brideName}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                Đám cưới tại{' '}
                <span className="text-gray-900">
                  Sảnh {hall.name}
                </span>{' '}
                vào lúc{' '}
                <time className="text-gray-900" dateTime="2020-08-25">
                  {`${wedding.workingShift.startHour}h, ${wedding.dateOfWedding}`}
                </time>
              </p>
            </div>
          </div>
          <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Chỉnh sửa
            </button>
            <a
              href={nextAction.href}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              {nextAction.buttonText}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    Thông tin tiệc cưới
                  </h2>
                  {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Thông tin cá nhân của khách hàng</p> */}
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Chú rể</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.groomName}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Cô dâu</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.brideName}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Tiền cọc</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.deposit} VND</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.totalPrice} VND</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Điện thoại</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.phoneNumber || '-'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Thời gian</dt>
                      <dd className="mt-1 text-sm text-gray-900">{`${wedding.workingShift.startHour}h - ${wedding.workingShift.endHour}h`}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Ngày cưới</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.dateOfWedding}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* Hall */}
            <section aria-labelledby="hall-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="hall-title" className="text-lg font-medium leading-6 text-gray-900">
                    Sảnh
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Sảnh cho tiệc cưới</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Tên</dt>
                      <dd className="mt-1 text-sm text-gray-900">{hall.name}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Loại sảnh</dt>
                      <dd className="mt-1 text-sm text-gray-900">{hall.type}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Giá mỗi bàn</dt>
                      <dd className="mt-1 text-sm text-gray-900">{hall.pricePerTable} VND</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Số bàn tối đa</dt>
                      <dd className="mt-1 text-sm text-gray-900">{hall.maxTables}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Có thể sử dụng</dt>
                      <dd className="mt-1 text-sm text-gray-900">{hall.isAvailable ? 'Đúng' : 'Không'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* Dishes */}
            <section aria-labelledby="food-title">
              <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="food-title" className="text-lg font-medium text-gray-900">
                      Món ăn
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Các món ăn được phục vụ trong tiệc cưới</p>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul role="list" className="space-y-8">
                      {dishes.map((dish) => (
                        <li key={dish.id}>
                          <div className="flex space-x-3">
                            <div>
                              <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                  {dish.name}
                                </div>
                              </div>
                              {dish.note && (
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{dish.note}</p>
                                </div>
                              )}
                              <div className="mt-2 space-x-2 text-sm">
                                <span className="font-medium text-gray-500">{dish.price} VND</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section aria-labelledby="service-title">
              <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="service-title" className="text-lg font-medium text-gray-900">
                      Dịch vụ
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Các dịch vụ trong tiệc cưới</p>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul role="list" className="space-y-8">
                      {services.map((service) => (
                        <li key={service.id}>
                          <div className="flex space-x-3">
                            <div>
                              <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                  {service.name}
                                </div>
                              </div>
                              {service.note && (
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{service.note}</p>
                                </div>
                              )}
                              <div className="mt-2 space-x-2 text-sm">
                                <span className="font-medium text-gray-500">{service.price} VND</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="space-y-6 lg:col-span-1 lg:col-start-3">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                Mốc thời gian
              </h2>

              {/* Activity Feed */}
              <div className="mt-6 flow-root">
                <ul role="list" className="-mb-8">
                  {timeline.map((item, itemIdx) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                item.type.bgColorClass,
                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                              )}
                            >
                              <item.type.icon className="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-500">
                                {item.content}{' '}
                                <span className="font-medium text-gray-900">
                                  {item.target}
                                </span>
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              <time dateTime={item.datetime}>{item.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {nextAction && (
                <div className="justify-stretch mt-6 flex flex-col">
                  <a
                    href={nextAction.href}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {nextAction.buttonText}
                  </a>
                </div>
              )}
            </div>

            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                Hoá đơn
              </h2>

              <div className="mt-6 flow-root">
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {receipts.map((receipt) => {
                    let receiptStatusText = 'Chờ thanh toán';
                    let statusStyle = statusStyles.processing;

                    if (receipt.isCancelled) {
                      receiptStatusText = 'Đã huỷ';
                      statusStyle = statusStyles.cancelled;
                    }
                    else if (receipt.isPaid) {
                      receiptStatusText = 'Đã thanh toán';
                      statusStyle = statusStyles.success;
                    }
                    
                    return (
                      <li key={receipt.id} className="flex items-center space-x-3 py-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {receipt.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {receipt.price} VND
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={classNames(
                              statusStyle,
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                            )}
                          >
                            {receiptStatusText}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

{/*             <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6"> */}
{/*               <h2 id="timeline-title" className="text-lg font-medium text-gray-900"> */}
{/*                 Hợp đồng */}
{/*               </h2> */}
{/*  */}
{/*               <div className="mt-6 flow-root"> */}
{/*                 <ul role="list" className="-my-4 divide-y divide-gray-200"> */}
{/*                   {contracts.map((contract) => { */}
{/*                     let statusText = 'Chờ khách kí tên'; */}
{/*                     let statusStyle = statusStyles.processing; */}
{/*                     if (contract.isSigned) { */}
{/*                       statusText = 'Đã kí tên'; */}
{/*                       statusStyle = statusStyles.success; */}
{/*                     } */}
{/*                      */}
{/*                     return ( */}
{/*                       <li key={contract.id} className="flex items-center space-x-3 py-4"> */}
{/*                         <div className="min-w-0 flex-1"> */}
{/*                           <p className="text-sm font-medium text-gray-900"> */}
{/*                             Hợp đồng tiệc cưới */}
{/*                           </p> */}
{/*                           <p className="text-sm text-gray-500"> */}
{/*                             {contract.createdAt} */}
{/*                           </p> */}
{/*                         </div> */}
{/*                         <div className="flex-shrink-0"> */}
{/*                           <span */}
{/*                             className={classNames( */}
{/*                               statusStyle, */}
{/*                               'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize' */}
{/*                             )} */}
{/*                           > */}
{/*                             {statusText} */}
{/*                           </span> */}
{/*                         </div> */}
{/*                       </li> */}
{/*                     ); */}
{/*                   })} */}
{/*                 </ul> */}
{/*               </div> */}
{/*             </div> */}
          </section>
        </div>
      </main>
    </Layout>
  )
}


export const getServerSideProps = async (context) => {
  const { params } = context;
  const { id } = params;
  const wedding = await prisma.wedding.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      groomName: true,
      brideName: true,
      dateOfWedding: true,
      deposit: true,
      totalPrice: true,
      numOfTables: true,
      phoneNumber: true,
      createdAt: true,
      workingShift: {
        select: {
          startHour: true,
          endHour: true,
        },
      },
      hall: {
        select: {
          name: true,
          type: true,
          isAvailable: true,
          maxTables: true,
          pricePerTable: true,
        },
      },
      dishes: {
        select: {
          servingOrder: true,
          dish: {
            select: {
             name: true,
             price: true,
             isAvailable: true, 
            },
          },
        },
      },
      services: {
        select: {
          service: {
            select: {
             name: true,
             price: true,
             isAvailable: true,
            },
          },
        },
      },
      receipts: {
        select: {
          name: true,
          isDeposit: true,
          price: true,
          isPaid: true,
          paidAt: true,
          cancelledAt: true,
          createdAt: true,
        },
        orderBy: {
          price: 'asc', // HACK: To sort the deposit before totalPrice
        },
      },
      contracts: {
        select: {
          description: true,
          isSigned: true,
          signedAt: true,
          createdAt: true,
        }
      },
    }
  });
  if (wedding === null) return {
    props: { wedding: null }
  }

  const formattedDishes = wedding.dishes.map(dish => ({
    ...dish.dish,
    servingOrder: dish.servingOrder,
  }));
  const formattedServices = wedding.services.map(service => service.service);
  const formattedReceipts = wedding.receipts.map(receipt => ({
    ...receipt,
    paidAt: receipt.paidAt ? receipt.paidAt.toISOString().substring(0, 10) : null,
    cancelledAt: receipt.cancelledAt ? receipt.cancelledAt.toISOString().substring(0, 10) : null,
    createdAt: receipt.createdAt.toISOString().substring(0, 10),
  }));
  const formattedContracts = wedding.contracts.map(contract => ({
    ...contract,
    signedAt: contract.signedAt ? contract.signedAt.toISOString().substring(0, 10) : null,
    createdAt: contract.createdAt.toISOString().substring(0, 10),
  }));

  const formattedWedding = {
    ...wedding,
    dateOfWedding: wedding.dateOfWedding.toISOString().substring(0, 10),
    createdAt: wedding.createdAt.toISOString().substring(0, 10),
    dishes: formattedDishes,
    services: formattedServices,
    receipts: formattedReceipts,
    contracts: formattedContracts,
  }

  return {
    props: {
      wedding: formattedWedding,
    },
  }
}
