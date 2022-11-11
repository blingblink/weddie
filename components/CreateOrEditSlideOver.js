import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

const DynamicInput = (props) => {
	const {
		label,
		type,
		inputKey,
		value,
		onChange,
	} = props;
	if (type === 'checkbox') return (
		<div className="relative flex items-start">
      <div className="min-w-0 flex-1 text-sm">
        <label htmlFor={`form-field-${inputKey}`} className="select-none font-medium text-gray-700">
        	{label}
        </label>
      </div>
      <div className="ml-3 flex h-5 items-center">
        <input
          type="checkbox"
          name={`form-field-${inputKey}`}
          id={`form-field-${inputKey}`}
          defaultChecked={value}
          onChange={event => onChange(inputKey, !value)}
          className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
    </div>
	);

	return (
		<div>
			<label htmlFor={`form-field-${inputKey}`} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={`form-field-${inputKey}`}
          id={`form-field-${inputKey}`}
          value={value}
          onChange={event => {
            let value = event.target.value;
            if (type === 'number') value = parseInt(value, 10);
            onChange(inputKey, value);
          }}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
		</div>
	);
}

export default function CreateOrEditSlideOver(props) {
	const {
		isCreate,
		onCreate,
		onUpdate,
    columns,
    rowValue,
    onFieldChange,
    open,
    setOpen,
  } = props;
  const onSave = isCreate ? onCreate : onUpdate;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">{isCreate ? 'Tạo Mới' : 'Cập Nhật'}</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Get started by filling in the information below to create your new project.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        	<div className="space-y-6 pt-6 pb-5">
                        		{columns.map((column) => (
                        			<DynamicInput
                        				key={`slideover-dynamic-input-${column.key}`}
                        				label={column.label}
                        				type={column.type}
                                inputKey={column.key}
                                value={rowValue[column.key]}
                                onChange={onFieldChange}
                        			/>
                        		))}
                        	</div>
                        </div>
                      </div>
                    </div>
                    
                  {/* Button group */}
                  <div className="flex">
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        Xoá
                      </button>
                    </div>
                    <div className="grow" />
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        Huỷ
                      </button>
                      <button
                        // type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={async () => await onSave()}
                      >
                        {isCreate ? 'Tạo' : 'Cập nhật'}
                      </button>
                    </div>
                  </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}