import { Fragment, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function WeddingForm(props) {
  const {
    wedding,
    onWeddingChange,
    workingShifts,
    halls,
  } = props;

  const objDateOfWedding = new Date(wedding.dateOfWedding);
  const weekdayOfWedding = objDateOfWedding ? objDateOfWedding.getDay() : null;
  const availableWorkingShifts = weekdayOfWedding === null ? [] : workingShifts.filter(
    shift => shift.weekday === weekdayOfWedding
  );

  return (
    <div className="">
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
            value={wedding.groomName}
            onChange={evt => onWeddingChange('groomName', evt.target.value)}
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
            value={wedding.brideName}
            onChange={evt => onWeddingChange('brideName', evt.target.value)}
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
            value={wedding.phoneNumber}
            onChange={evt => onWeddingChange('phoneNumber', evt.target.value)}
          />
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="wedding-date" className="block text-sm font-medium text-gray-700">
            Ngày cưới
          </label>
          <input
            type="text"
            name="wedding-date"
            id="wedding-date"
            autoComplete="cc-exp"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            placeholder="YYYY-MM-DD"
            value={wedding.dateOfWedding}
            onChange={evt => onWeddingChange('dateOfWedding', evt.target.value)}
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
            disabled={availableWorkingShifts.length < 1}
            onChange={evt => evt.target.value && onWeddingChange('workingShiftId', evt.target.value)}
          >
            {wedding.workingShiftId === null && (<option></option>)}
            {availableWorkingShifts.map(shift => (
              <option
                key={`working-shift-option-${shift.id}`}
                value={shift.id}
              >
                {`${shift.startHour}:00 - ${shift.endHour}:00`}
              </option>
            ))}
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
            disabled={halls.length < 1}
            onChange={evt => evt.target.value && onWeddingChange('hallId', evt.target.value)}
          >
            {wedding.hallId === null && (<option></option>)}
            {halls.map(hall => (
              <option
                key={`hall-option-${hall.id}`}
                value={hall.id}
              >
                {`${hall.name} (${hall.maxTables} bàn | ${hall.pricePerTable}/bàn)`}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
            Tiền cọc
          </label>
          <input
            type="number"
            name="deposit"
            id="deposit"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            value={wedding.deposit}
            onChange={evt => onWeddingChange('deposit', evt.target.value)}
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="number-of-tables" className="block text-sm font-medium text-gray-700">
            Số lượng bàn
          </label>
          <input
            type="number"
            name="number-of-tables"
            id="number-of-tables"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            value={wedding.numOfTables}
            onChange={evt => onWeddingChange('numOfTables', evt.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
