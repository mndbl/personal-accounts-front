import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { BarChartAccounts } from "../../charts/bar-chart-accounts";
import { BarChartBalances } from "../../charts/bar-chart-balances";
import { PieChart } from "../../charts/pie-charts";

export function IndexDashboard() {
    const charts = [
        'pie', 'barAcc', 'barBal'
    ]
    const longitude = charts.length - 1
    const [showChart, setShowChart] = useState(0)
    const { accountCategories, accounts} = useLoaderData()
    const handleRightCharts = () => {
        if (showChart < longitude) {
            setShowChart(prevState => prevState + 1)
        }
    }
    const handleLeftCharts = () => {

        if (longitude >= showChart) {
            setShowChart(prevState => prevState - 1)
        }
    }


    return (
        <div className="bg-gray-600 p-8 h-full">
            <div className={(showChart === 0 ? '' : 'hidden') + " shadow-lg rounded-lg w-4/5 mx-auto"}>
                <PieChart accountCategoriesData={accountCategories} accountsData={accounts} />
            </div>
            <div className={(showChart === 1 ? '' : 'hidden') + " shadow-lg rounded-lg w-4/5 mx-auto"}>
                <BarChartAccounts accountsData={accounts} />
            </div>
            <div className={(showChart === 2 ? '' : 'hidden') + " shadow-lg rounded-lg w-4/5 mx-auto"}>
                <BarChartBalances accountsData={accounts} />
            </div>


            <div className="flex justify-center">
                <button disabled={showChart === 0} onClick={() => setShowChart(0)}
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                    <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button disabled={showChart === 0} onClick={() => handleLeftCharts()}
                    className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <span className="sr-only">Next</span>
                <button disabled={showChart === charts.length} onClick={() => handleRightCharts()}
                    className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button disabled={showChart === charts.length} onClick={() => setShowChart(charts.length - 1)}
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>

            </div>
        </div>
    )
}