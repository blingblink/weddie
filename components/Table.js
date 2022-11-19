import { Fragment, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Table(props) {
  const {
    columns,
    rows,
    onRowSelect,
    selectText,
  } = props;
  
  return (
    <div className="-mx-4 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              {columns[0].label}
            </th>
            {columns.filter((col, idx) => idx > 0).map(col => (
              <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={`table-row-${rowIdx}`}>
              <td
                className={classNames(
                  rowIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                )}
              >
                <div className="font-medium text-gray-900">
                  {row[0]}
                </div>
                <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                  {row.filter((cell, cellIdx) => cellIdx > 0).map((cell, cellIdx) => (
                    <>
                      <span>{cell}</span>
                      {cellIdx < row.length - 1 && (<span className="hidden sm:inline">·</span>)}
                    </>
                  ))}
                </div>
                {rowIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
              </td>
              {row.filter((cell, cellIdx) => cellIdx > 0).map((cell) => (
                <td
                  className={classNames(
                    rowIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-sm text-gray-500 sm:table-cell'
                  )}
                >
                  {cell}
                </td>
              ))}
              {selectText && (
                <td className={'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'}>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => onRowSelect(rowIdx)}
                  >
                    {selectText}
                  </button>
                  {rowIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
