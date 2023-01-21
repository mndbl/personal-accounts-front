import { useTable, useSortBy, usePagination } from "react-table"
import { OptionsActionsTable } from "./options-actions-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronRightIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { SearchInput } from "../inputs/search-input";
import { AddButton } from "../buttons/add-button";
import { BackButton } from "../buttons/back-button";
import { useState } from "react";
import { DataCellOptions } from "./data-cells-options";

export function Table({ columns, data, caption, query }) {
    const [widthScreen, setWidthScreen] = useState()

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useSortBy, usePagination)


    return (
        <div className="flex flex-col w-auto mt-2">
            
            <div className=" overflow-scroll">
                <div className="flex justify-between py-3 px-2">
                    <div className="relative max-w-xs">
                        <SearchInput query={query} />
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* <div className="relative">
                            <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                                <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3 h-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="hidden sm:block">
                                        Filters
                                    </div>
                                </span>
                            </button>
                        </div> */}
                        <AddButton />
                        <BackButton />
                    </div>
                </div>
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300" {...getTableProps()}>
                            <caption className="bg-gray-900 text-white font-bold uppercase">{`${caption}'s List`}</caption>
                            <thead className="bg-blue-200">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map((column) => {
                                                const classNameHeader = column.render('Header') === 'id' ? ' hidden' : ''
                                                return <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    className={`${classNameHeader} px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase`}>
                                                    <p>{column.render('Header')}
                                                        <span className="inline-flex items-center">
                                                            {
                                                                column.isSorted ?
                                                                    column.isSortedDesc ?
                                                                        <ArrowDownIcon className="h-4 w-4" aria-hidden="true" /> :
                                                                        <ArrowUpIcon className="h-4 w-4" aria-hidden="true" /> :
                                                                    ''
                                                            }
                                                        </span>
                                                    </p>
                                                </th>

                                            })
                                        }
                                        <th
                                            scope="col" colSpan='3'
                                            className="px-4 py-2 text-xs font-bold  text-center text-gray-500 uppercase "
                                        >
                                            Actions
                                        </th>

                                    </tr>
                                ))

                                }
                            </thead>
                            <tbody className="divide-y divide-gray-200" {...getTableBodyProps()}>
                                {
                                    page.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()} className="odd:bg-gray-200 even:bg-slate-50 hover:bg-gray-500 text-gray-600 hover:text-white">
                                                {

                                                    row.cells.map((cell, i) => (
                                                        <DataCellOptions key={'data-cell-' + i + cell.row.values.id} cell={cell} i={i} />
                                                    )
                                                    )
                                                }


                                            </tr>)
                                    })
                                }

                            </tbody>
                        </table>
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{data.length ? 1 + (pageIndex * pageSize) : 0}</span> to {' '}
                                        <span className="font-medium">{pageIndex + 1 * pageSize > data.length ? data.length : (pageIndex + 1) * pageSize}</span> of{' '}
                                        <span className="font-medium">{data.length}</span> results
                                    </p>
                                </div>
                                <div className="inline-flex items-center space-x-2">
                                    <p className="text-sm text-gray-700">
                                        Go to page
                                    </p>
                                    <input className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                        type="number"
                                        defaultValue={pageIndex + 1}
                                        onChange={e => {
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                                            gotoPage(page)
                                        }}
                                        style={{ width: '100px' }}
                                    />
                                </div>
                                <div>

                                    <select className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                        value={pageSize}
                                        onChange={e => {
                                            setPageSize(Number(e.target.value))
                                        }}
                                    >
                                        {[10, 20, 30, 40, 50].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                Show {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>


                                    <span className="sr-only">Previous</span>

                                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}
                                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                    >
                                        <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button onClick={() => previousPage()} disabled={!canPreviousPage}
                                        className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>

                                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                    {/* <a
                                            href="#"
                                            aria-current="page"
                                            className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                                        >
                                            1
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                        >
                                            2
                                        </a>
                                        <a
                                            href="#"
                                            className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                                        >
                                            3
                                        </a>
                                        <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                                            ...
                                        </span>
                                        <a
                                            href="#"
                                            className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                                        >
                                            8
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                        >
                                            9
                                        </a>
                                        <a
                                            href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                        >
                                            10
                                        </a> */}

                                    <span className="sr-only">Next</span>
                                    <button onClick={() => gotoPage(nextPage())} disabled={!canNextPage}
                                        className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
                                        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                        <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}