import { Fragment, useState } from 'react'
import { useRouter } from 'next/router';
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
import WeddingForm from '../../components/weddings/create/WeddingForm';
import ServiceSelectMenu from '../../components/weddings/create/ServiceSelectMenu';
import FoodSelectMenu from '../../components/weddings/create/FoodSelectMenu';
import prisma from '../../lib/prisma';

const tabs = [
  {name: 'Thông tin cơ bản', component: WeddingForm},
  {name: 'Dịch vụ', component: ServiceSelectMenu},
  {name: 'Món ăn', component: FoodSelectMenu},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function WeddingCreatePage(props) {
  const {
    wedding,
    dishesForWedding,
    servicesForWedding,
    workingShifts,
    halls,
    dishes,
    services,
  } = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [mutableDishesForWedding, setDishesForWedding] = useState(dishesForWedding);
  const [mutableServicesForWedding, setServicesForWedding] = useState(servicesForWedding);

  const [mutableWedding, setWedding] = useState(wedding ? wedding : ({
    groomName: '',
    brideName: '',
    dateOfWedding: '',
    workingShiftId: null,
    phoneNumber: '',
    hallId: null,
    deposit: 0,
    numOfTables: 0,
  }));

  const sortAndSetDishesForWedding = (newDishes) => {
    // Sort the dishes by (ascending) serving order
    newDishes.sort((firstDish, secondDish) => firstDish.servingOrder - secondDish.servingOrder);
    setDishesForWedding(newDishes);
  };

  const onWeddingChange = (key, value) => {
    setWedding({
      ...mutableWedding,
      [key]: value,
    });
  };

  const submitData = async e => {
    e.preventDefault();

    let requestData = {
      ...mutableWedding,
      deposit: parseInt(mutableWedding.deposit),
      numOfTables: parseInt(mutableWedding.numOfTables),
      dishes: mutableDishesForWedding,
      services: mutableServicesForWedding,
    };

    await fetch('/api/wedding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
  };

  const BodyComponent = tabs[selectedTabIndex].component;

  return (
    <Layout title="Drinkies" description="Selling drinks">
      <main className="flex-1">
        <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tạo tiệc cưới</h1>
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
                    defaultValue={selectedTabIndex}
                  >
                    {tabs.map((tab, tabIndex) => (
                      <option
                        key={`select-option-${tabIndex}`}
                        value={tabIndex}
                        onChange={evt => setSelectedTabIndex(evt.target.value)}
                      >
                        {tab.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab, tabIndex) => (
                        <button
                          key={`tab-option-${tabIndex}`}
                          onClick={() => setSelectedTabIndex(tabIndex)}
                          className={classNames(
                            tabIndex === selectedTabIndex
                              ? 'border-purple-500 text-purple-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                          )}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Description list with inline editing */}
                <div className="mt-6 divide-y divide-gray-200 space-y-6 lg:col-span-9 lg:px-0">
                  <section aria-labelledby="payment-details-heading">
                    <form onSubmit={submitData}>
                      <BodyComponent
                        wedding={mutableWedding}
                        onWeddingChange={onWeddingChange}
                        dishesForWedding={mutableDishesForWedding}
                        setDishesForWedding={sortAndSetDishesForWedding}
                        servicesForWedding={mutableServicesForWedding}
                        setServicesForWedding={setServicesForWedding}
                        workingShifts={workingShifts}
                        halls={halls}
                        dishes={dishes}
                        services={services}
                      />
                      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end py-4 px-4">
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
                          Đặt tiệc cưới
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

export const getServerSideProps = async (context) => {
  // id would be null if it is a Create page.
  const { id } = context.query;

  // Wedding's data
  let dishesForWedding = [];
  let servicesForWedding = [];
  let wedding = null;
  if (id) {
    dishesForWedding = await prisma.dishForWedding.findMany({
      where: {
        weddingId: id,
      },
      select: {
        id: true,
        servingOrder: true,
        dish: {
          select: {
            id: true,
            name: true,
            price: true,
            note: true,
            isAvailable: true,
          },
        },
      },
    });
    dishesForWedding = dishesForWedding.map(dishForWedding => ({
      ...dishForWedding.dish,
      servingOrder: dishForWedding.servingOrder,
    }));
    servicesForWedding = await prisma.serviceForWedding.findMany({
      where: {
        weddingId: id,
      },
      select: {
        id: true,
        service: {
          select: {
            id: true,
            name: true,
            price: true,
            note: true,
            isAvailable: true,
          },
        },
      },
    });
    servicesForWedding = servicesForWedding.map(serviceForWedding => serviceForWedding.service);

    wedding = await prisma.wedding.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        groomName: true,
        brideName: true,
        dateOfWedding: true,
        workingShiftId: true,
        hallId: true,
        deposit: true,
        totalPrice: true,
        numOfTables: true,
        phoneNumber: true,
      },
    });
  }

  // Restaurant's data
  const workingShifts = await prisma.workingShift.findMany({
    select: {
      id: true,
      weekday: true,
      startHour: true,
      endHour: true,
    },
  });
  const halls = await prisma.hall.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      maxTables: true,
      pricePerTable: true,
      note: true,
    },
  });
  const dishes = await prisma.dish.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      note: true,
    },
  });

  const services = await prisma.service.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      note: true,
    },
  });

  return {
    props: {
      wedding,
      dishesForWedding,
      servicesForWedding,
      workingShifts,
      halls,
      dishes,
      services,
    },
  }
}
