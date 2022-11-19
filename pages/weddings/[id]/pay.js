import { Fragment, useState } from 'react'
import { Disclosure, Popover, Transition } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

import Layout from '../../../components/Layout';
import prisma from '../../../lib/prisma';

const steps = [
  { name: 'Cart', href: '#', status: 'complete' },
  { name: 'Billing Information', href: '#', status: 'current' },
  { name: 'Confirmation', href: '#', status: 'upcoming' },
]
const products = [
  {
    id: 1,
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
  // More products...
]

const getNameFromFullName = (fullName) => fullName.split(' ')[fullName.length - 1];

export default function PaymentPage(props) {
  const { wedding } = props;
  const {
    hall,
    workingShift,
    dishes,
    services,
    contracts,
    receipts,
  } = wedding;
  const [paymentDetails, setPaymentDetails] = useState({
    payerName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const onPaymentDetailChange = (key, value) => {
    setPaymentDetails({
      ...paymentDetails,
      [key]: value,
    });
  };

  let totalPriceOfDishes = 0;
  dishes.forEach(dish => totalPriceOfDishes += wedding.numOfTables * dish.price);
  let totalPriceOfServices = 0;
  services.forEach(service => totalPriceOfServices += wedding.numOfTables * service.price);

  const orderItems = [
    {
      name: `Sảnh ${hall.name} - Loại ${hall.type}`,
      price: `${wedding.numOfTables * hall.pricePerTable} VND`,
      details: [
        `${wedding.numOfTables} bàn`,
        `${hall.pricePerTable} VND / bàn`,
      ],
    },
    {
      name: `Món ăn`,
      price: `${totalPriceOfDishes} VND`,
      details: [
        `${wedding.numOfTables} bàn`,
        ...dishes.map(dish => `${dish.name} - ${dish.price} VND`),
      ],
    },
    {
      name: `Dịch vụ`,
      price: `${totalPriceOfServices} VND`,
      details: [
        `${wedding.numOfTables} bàn`,
        ...services.map(service => `${service.name} - ${service.price} VND`),
      ],
    },
  ];

  const depositReceipt = receipts.find(receipt => receipt.isDeposit && !receipt.isCancelled);
  const finalReceipt = receipts.reverse().find(receipt => !receipt.isDeposit);
  const receiptToPay = (!depositReceipt.isPaid && depositReceipt) || (!finalReceipt.isPaid && finalReceipt);
  const finalPriceAfterDeposit = finalReceipt.price - depositReceipt.price;
  const percentageOfPriceAfterDeposit = ((finalPriceAfterDeposit / finalReceipt.price) * 100).toFixed(2);
  const priceToPay = (receiptToPay && receiptToPay.isDeposit ? receiptToPay.price : finalPriceAfterDeposit);

  const onSubmit = async e => {
    e.preventDefault();
    if (!receiptToPay) return;

    await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receiptId: receiptToPay.id,
        ...paymentDetails,
      }),
    });
  };

  return (
    <Layout title="Drinkies" description="Selling drinks" className="bg-white">
  		{/* Background color split screen for large screens */}
      <div className="absolute top-0 left-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="absolute top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block" aria-hidden="true" />

      <header className="relative border-b border-gray-200 bg-white text-sm font-medium text-gray-700">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-end sm:justify-center">
            <nav aria-label="Progress" className="hidden sm:block">
              <ol role="list" className="flex space-x-4">
                <li className="flex items-center">
                  <a href=''>
                    {`Tiệc cưới của ${getNameFromFullName(wedding.groomName)} & ${getNameFromFullName(wedding.brideName)}`}
                  </a>
                  <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                </li>
                <li className="flex items-center">
                  <a href='/' aria-current="page" className="text-indigo-600">
                    Thanh toán {receiptToPay && receiptToPay.isDeposit ? 'tiền cọc' : 'tổng tiền'}
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Thông tin đơn hàng
            </h2>

            <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
              {orderItems.map((item) => (
                <li key={item.name} className="flex items-start space-x-4 py-6">
                  <div className="flex-auto space-y-1">
                    <h3>{item.name}</h3>
                    {item.details.map(detail => (
                      <p className="text-gray-500">{detail}</p>
                    ))}
                  </div>
                  <p className="flex-none text-base font-medium">{item.price}</p>
                </li>
              ))}
            </ul>

            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Thành tiền</dt>
                <dd>{finalReceipt.price} VND</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">
                  Chỉ thanh toán tiền cọc
                  <span className="ml-2 rounded-full bg-gray-200 py-0.5 px-2 text-xs tracking-wide text-gray-600">
                    -{percentageOfPriceAfterDeposit}%
                  </span>
                </dt>
                <dd>-{finalPriceAfterDeposit} VND</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">{receiptToPay && receiptToPay.isDeposit ? 'Tiền cọc' : 'Tổng tiền'}</dt>
                <dd className="text-base">{priceToPay} VND</dd>
              </div>
            </dl>

            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                <div className="mx-auto max-w-lg">
                  <Popover.Button className="flex w-full items-center py-6 font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">$361.80</span>
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                      <dl className="mx-auto max-w-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd>$320.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd>$15.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Taxes</dt>
                          <dd>$26.80</dd>
                        </div>
                      </dl>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </Popover>
          </div>
        </section>

        {receiptToPay ? (
          <form
            className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
            onSubmit={onSubmit}
          >
            <div className="mx-auto max-w-lg lg:max-w-none">
              <section aria-labelledby="payment-heading">
                <h2 id="payment-heading" className="text-lg font-medium text-gray-900">
                  Thông tin thanh toán
                </h2>

                <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                      Họ tên trên thẻ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name-on-card"
                        name="name-on-card"
                        autoComplete="cc-name"
                        onChange={evt => onPaymentDetailChange('payerName', evt.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Mã số thẻ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-number"
                        name="card-number"
                        autoComplete="cc-number"
                        onChange={evt => onPaymentDetailChange('cardNumber', evt.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Hạn sử dụng (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        onChange={evt => onPaymentDetailChange('cardExpiry', evt.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        onChange={evt => onPaymentDetailChange('cardCvc', evt.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Thanh toán {priceToPay} VND
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="mx-auto max-w-xl py-16 sm:py-24">
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Tiệc cưới đã được thanh toán
              </h1>
              <p className="mt-2 text-lg text-gray-500">Tiền cọc và tổng tiền của tiệc cưới đã được thanh toán.</p>
            </div>
          </div>
        )}
      </main>
    </Layout>
	);
};

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
          id: true,
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
              id: true,
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
              id: true,
             name: true,
             price: true,
             isAvailable: true,
            },
          },
        },
      },
      receipts: {
        select: {
          id: true,
          name: true,
          isDeposit: true,
          price: true,
          isPaid: true,
          paidAt: true,
          cancelledAt: true,
          createdAt: true,
        },
      },
      contracts: {
        select: {
          id: true,
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