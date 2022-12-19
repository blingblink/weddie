import { Fragment, useState } from 'react'
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import WeddingForm from './WeddingForm';
import ServiceSelectMenu from './ServiceSelectMenu';
import FoodSelectMenu from './FoodSelectMenu';

const tabs = [
  { name: 'Thông tin cơ bản', component: WeddingForm },
  { name: 'Dịch vụ', component: ServiceSelectMenu },
  { name: 'Món ăn', component: FoodSelectMenu },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function WeddingCreateOrEditMenu(props) {
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
  const [mutableDishesForWedding, setDishesForWedding] = useState(dishesForWedding || []);
  const [mutableServicesForWedding, setServicesForWedding] = useState(servicesForWedding || []);

  const sortAndSetDishesForWedding = (newDishes) => {
    // Sort the dishes by (ascending) serving order
    newDishes.sort((firstDish, secondDish) => firstDish.servingOrder - secondDish.servingOrder);
    setDishesForWedding(newDishes);
  };
  const isCreate = wedding ? false : true;

  const formik = useFormik({
    initialValues: wedding || {
      groomName: '',
      brideName: '',
      dateOfWedding: '',
      workingShiftId: null,
      phoneNumber: '',
      hallId: null,
      deposit: 0,
      numOfTables: 0,
    },
    validationSchema: Yup.object({
      groomName: Yup.string()
        .max(50, 'Nhiều nhất 50 kí tự')
        .min(1, 'Ít nhất 1 kí tự')
        .required('Bắt buộc'),
      brideName: Yup.string()
        .max(50, 'Nhiều nhất 50 kí tự')
        .min(1, 'Ít nhất 1 kí tự')
        .required('Bắt buộc'),
      dateOfWedding: Yup.date()
        .min(new Date(), 'Sớm nhất là hôm nay.')
        .required('Bắt buộc'),
      workingShiftId: Yup.string()
        .min(1, 'Chưa chọn ca đám cưới')
        .required('Bắt buộc'),
      hallId: Yup.string()
        .min(1, 'Chưa chọn ca đám cưới')
        .required('Bắt buộc'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Chỉ có thể nhập số")
        .required('Bắt buộc')
        .min(10, 'ít nhất 8 số')
        .max(12, 'Nhiều nhất 12 số'),
      deposit: Yup.number()
        .required('Bắt buộc')
        .positive('Phải lớn hơn 0')
        .integer(),
      numOfTables: Yup.number()
        .required('Bắt buộc')
        .positive('Phải lớn hơn 0')
        .integer(),
    }),
    onSubmit: async (wedding) => {
      let requestData;
      let response;

      if (isCreate) {
        requestData = {
          ...wedding,
          dishes: mutableDishesForWedding,
          services: mutableServicesForWedding,
        };

        response = await fetch('/api/wedding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        });
      } else {
        requestData = {
          ...wedding,
          dishes: mutableDishesForWedding,
          services: mutableServicesForWedding,
        };

        response = await fetch('/api/wedding', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        });
      }

      const createdWedding = await response.json();
      const weddingId = createdWedding.id;
      await Router.push(`/weddings/${weddingId}`);
    },
  });

  const BodyComponent = tabs[selectedTabIndex].component;

  return (
    <main className="flex-1">
      <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cập nhật tiệc cưới</h1>
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
                  {/* <form onSubmit={submitData}> */}
                  <form onSubmit={formik.handleSubmit}>
                    <BodyComponent
                      wedding={formik.values}
                      onWeddingChange={formik.handleChange}
                      dishesForWedding={mutableDishesForWedding}
                      setDishesForWedding={sortAndSetDishesForWedding}
                      servicesForWedding={mutableServicesForWedding}
                      setServicesForWedding={setServicesForWedding}
                      workingShifts={workingShifts}
                      halls={halls}
                      dishes={dishes}
                      services={services}
                      touched={formik.touched}
                      errors={formik.errors}
                      handleBlur={formik.handleBlur}
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
                        {isCreate ? 'Tạo' : 'Cập nhật'}
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
  )
}
