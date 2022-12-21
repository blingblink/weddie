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
    errors,
    touched,
    handleBlur,
  } = props;

  const objDateOfWedding = new Date(wedding.dateOfWedding);
  const weekdayOfWedding = objDateOfWedding ? objDateOfWedding.getDay() : null;
  const availableWorkingShifts = weekdayOfWedding === null ? [] : workingShifts.filter(
    shift => shift.weekday === weekdayOfWedding
  );

  const renderError = (field) => (
    <>
      {touched[field] && errors[field] && (
        <div className="mt-2 max-w-xl text-sm text-red-500">
          <p>{errors[field]}</p>
        </div>
      )}
    </>
  );

  return (
    <div className="">
      <div className="mt-6 grid grid-cols-4 gap-6">
        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="groomName" className="block text-sm font-medium text-gray-700">
            Tên chú rể
          </label>
          <input
            type="text"
            name="groomName"
            id="groomName"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            value={wedding.groomName}
            onChange={onWeddingChange}
            onBlur={handleBlur}
            maxLength={50}
          />
          {renderError('groomName')}
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="brideName" className="block text-sm font-medium text-gray-700">
            Tên cô dâu
          </label>
          <input
            type="text"
            name="brideName"
            id="brideName"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            value={wedding.brideName}
            onChange={onWeddingChange}
            onBlur={handleBlur}
            maxLength={50}
          />
          {renderError('brideName')}
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Điện thoại
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            value={wedding.phoneNumber}
            onBlur={handleBlur}
            onChange={onWeddingChange}
          />
          {renderError('phoneNumber')}
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="dateOfWedding" className="block text-sm font-medium text-gray-700">
            Ngày cưới
          </label>
          <input
            type="date"
            name="dateOfWedding"
            id="dateOfWedding"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            placeholder="YYYY-MM-DD"
            value={wedding.dateOfWedding}
            onChange={onWeddingChange}
            onBlur={handleBlur}
          />
          {renderError('dateOfWedding')}
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="workingShiftId" className="block text-sm font-medium text-gray-700">
            Ca
          </label>
          <select
            id="workingShiftId"
            name="workingShiftId"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            disabled={availableWorkingShifts.length < 1}
            onChange={evt => evt.target.value && onWeddingChange(evt)}
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
          {wedding.workingShiftId === null && (
            <div className="mt-2 max-w-xl text-sm text-red-500">
              <p>Chưa chọn ca (Ca chỉ có thể chọn sau khi điền ngày cưới).</p>
            </div>
          )}
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="hallId" className="block text-sm font-medium text-gray-700">
            Sảnh
          </label>
          <select
            id="hallId"
            name="hallId"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            disabled={halls.length < 1}
            onChange={evt => evt.target.value && onWeddingChange(evt)}
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
          {wedding.hallId === null && (
            <div className="mt-2 max-w-xl text-sm text-red-500">
              <p>Chưa chọn sảnh.</p>
            </div>
          )}
        </div>

        {/* <div className="col-span-4 sm:col-span-2"> */}
        {/*   <label htmlFor="deposit" className="block text-sm font-medium text-gray-700"> */}
        {/*     Tiền cọc */}
        {/*   </label> */}
        {/*   <input */}
        {/*     type="number" */}
        {/*     name="deposit" */}
        {/*     id="deposit" */}
        {/*     className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" */}
        {/*     value={wedding.deposit} */}
        {/*     onChange={onWeddingChange} */}
        {/*     onBlur={handleBlur} */}
        {/*   /> */}
        {/*   {renderError('deposit')} */}
        {/* </div> */}
        <div className="col-span-4 sm:col-span-2">
          <label htmlFor="numOfTables" className="block text-sm font-medium text-gray-700">
            Số lượng bàn
          </label>
          <input
            type="number"
            name="numOfTables"
            id="numOfTables"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
            value={wedding.numOfTables}
            onChange={onWeddingChange}
            onBlur={handleBlur}
          />
          {renderError('numOfTables')}
        </div>
      </div>
    </div>
  );
}
