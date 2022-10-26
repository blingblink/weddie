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


const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Applicants', href: '#' },
  { name: 'Company', href: '#' },
]
const breadcrumbs = [
  { name: 'Jobs', href: '#', current: false },
  { name: 'Front End Developer', href: '#', current: false },
  { name: 'Applicants', href: '#', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
  applied: { icon: DocumentPlusIcon, bgColorClass: 'bg-gray-400' },
  pending: { icon: ClockIcon, bgColorClass: 'bg-gray-500' },
  advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Tiệc cưới được đặt',
    // target: 'Front End Developer',
    date: '2022-10-22',
    datetime: '2022-10-22',
  },
  {
    id: 2,
    type: eventTypes.completed,
    content: 'Thu ngân tạo hợp đồng đặt cọc',
    // target: 'Bethany Blake',
    date: '2022-10-23',
    datetime: '2022-10-23',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Khách hàng kí hợp đồng đặt cọc',
    // target: 'Martha Gardner',
    date: '2022-10-25',
    datetime: '2022-10-25',
  },
  {
    id: 4,
    type: eventTypes.pending,
    content: 'Chờ thanh toán tiền cọc từ khách hàng',
    // target: 'Katherine Snyder',
    date: '2022-10-25',
    datetime: '2022-10-25',
  },
]
const comments = [
  {
    id: 1,
    name: 'Mì ý cua sốt kem',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    imageUrl: 'https://cdn.tgdd.vn/Files/2021/06/20/1361779/cach-lam-mi-y-cua-sot-kem-beo-ngay-ngon-chuan-pizza-4ps-202201122031546776.jpeg',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Mì Quảng trộn',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    imageUrl: 'https://static.riviu.co/960/image/2020/10/31/90ea462a91b99d088fe6964441a27dc1_output.jpeg',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Sashimi cá hồi',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    imageUrl: 'https://cookingchew.com/wp-content/uploads/2021/11/What-Is-Sashimi.jpg',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function WeddingInfoPage(props) {
  const { wedding } = props;
  const { hall } = wedding;

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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Thanh toán tiền cọc
            </button>
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
                      <dt className="text-sm font-medium text-gray-500">Điện thoại</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.phoneNumber || '-'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Thời gian</dt>
                      <dd className="mt-1 text-sm text-gray-900">{`${wedding.workingShift.startHour}h - ${wedding.workingShift.startHour}h`}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Ngày</dt>
                      <dd className="mt-1 text-sm text-gray-900">{wedding.dateOfWedding}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

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

            {/* Hall */}
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
                      {comments.map((comment) => (
                        <li key={comment.id}>
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={comment.imageUrl}
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">
                                  {comment.name}
                                </a>
                              </div>
                              <div className="mt-1 text-sm text-gray-700">
                                <p>{comment.body || '-'}</p>
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

          <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
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
                                <a href="#" className="font-medium text-gray-900">
                                  {item.target}
                                </a>
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
              <div className="justify-stretch mt-6 flex flex-col">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Thanh toán tiền cọc
                </button>
              </div>
            </div>
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
      groomName: true,
      brideName: true,
      dateOfWedding: true,
      deposit: true,
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
    }
  });
  if (wedding === null) return {
    props: { wedding: null }
  }

  const formattedWedding = {
    ...wedding,
      dateOfWedding: wedding.dateOfWedding.toISOString().substring(0, 10),
      createdAt: wedding.createdAt.toString(),
  }

  return {
    props: {
      wedding: formattedWedding,
    },
  }
}
