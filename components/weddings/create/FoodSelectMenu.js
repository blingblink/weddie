import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import DraggableTable from '../DraggableTable';


// TODO: Actually get food items from DB
export default function FoodSelectMenu() {
	return (
		<>
	        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	          <div className="mx-auto max-w-4xl pt-16">
	            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Menu</h1>

	            <form className="mt-12">
	              <section aria-labelledby="cart-heading">
	                <h2 id="cart-heading" className="sr-only">
	                	Các món ăn trong menu
	                </h2>

	                <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
	                  {products.map((product, productIdx) => (
	                    <li key={product.id} className="flex py-6 sm:py-10">
	                      <div className="flex-shrink-0">
	                        <img
	                          src={product.imageSrc}
	                          alt={product.imageAlt}
	                          className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
	                        />
	                      </div>

	                      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
	                        <div>
	                          <div className="flex justify-between sm:grid sm:grid-cols-2">
	                            <div className="pr-6">
	                              <h3 className="text-sm">
	                                <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
	                                  {product.name}
	                                </a>
	                              </h3>
	                              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
	                              {product.size ? <p className="mt-1 text-sm text-gray-500">{product.size}</p> : null}
	                            </div>

	                            <p className="text-right text-sm font-medium text-gray-900">{product.price}</p>
	                          </div>

	                          <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
	                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
	                              Quantity, {product.name}
	                            </label>
	                            <select
	                              id={`quantity-${productIdx}`}
	                              name={`quantity-${productIdx}`}
	                              className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
	                            >
	                              <option value={1}>1</option>
	                              <option value={2}>2</option>
	                              <option value={3}>3</option>
	                              <option value={4}>4</option>
	                              <option value={5}>5</option>
	                              <option value={6}>6</option>
	                              <option value={7}>7</option>
	                              <option value={8}>8</option>
	                            </select>

	                            <button
	                              type="button"
	                              className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
	                            >
	                              <span>Remove</span>
	                            </button>
	                          </div>
	                        </div>

	                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
	                          {product.inStock ? (
	                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
	                          ) : (
	                            <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
	                          )}

	                          <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
	                        </p>
	                      </div>
	                    </li>
	                  ))}
	                </ul>
	              </section>

	              {/* Order summary */}
	              <section aria-labelledby="summary-heading" className="mt-10 sm:ml-32 sm:pl-6">
	                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
	                  <h2 id="summary-heading" className="sr-only">
	                    Order summary
	                  </h2>

	                  <div className="flow-root">
	                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
	                      <div className="flex items-center justify-between py-4">
	                        <dt className="text-gray-600">Subtotal</dt>
	                        <dd className="font-medium text-gray-900">$99.00</dd>
	                      </div>
	                      <div className="flex items-center justify-between py-4">
	                        <dt className="text-gray-600">Shipping</dt>
	                        <dd className="font-medium text-gray-900">$5.00</dd>
	                      </div>
	                      <div className="flex items-center justify-between py-4">
	                        <dt className="text-gray-600">Tax</dt>
	                        <dd className="font-medium text-gray-900">$8.32</dd>
	                      </div>
	                      <div className="flex items-center justify-between py-4">
	                        <dt className="text-base font-medium text-gray-900">Order total</dt>
	                        <dd className="text-base font-medium text-gray-900">$112.32</dd>
	                      </div>
	                    </dl>
	                  </div>
	                </div>
	                <div className="mt-10">
	                  <button
	                    type="submit"
	                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
	                  >
	                    Checkout
	                  </button>
	                </div>

	                <div className="mt-6 text-center text-sm text-gray-500">
	                  <p>
	                    or
	                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
	                      Continue Shopping
	                      <span aria-hidden="true"> &rarr;</span>
	                    </a>
	                  </p>
	                </div>
	              </section>
	            </form>
	          </div>
	        </div>

	        {/* Policy grid */}
	        <section aria-labelledby="policies-heading" className="mt-24 border-t border-gray-200 bg-gray-50">
	          <h2 id="policies-heading" className="sr-only">
	            Our policies
	          </h2>

	          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
	            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
	              {policies.map((policy) => (
	                <div
	                  key={policy.name}
	                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
	                >
	                  <div className="md:flex-shrink-0">
	                    <div className="flow-root">
	                      <img className="-my-1 mx-auto h-24 w-auto" src={policy.imageSrc} alt="" />
	                    </div>
	                  </div>
	                  <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
	                    <h3 className="text-base font-medium text-gray-900">{policy.name}</h3>
	                    <p className="mt-3 text-sm text-gray-500">{policy.description}</p>
	                  </div>
	                </div>
	              ))}
	            </div>
	          </div>
	        </section>
      	</>
	);
}