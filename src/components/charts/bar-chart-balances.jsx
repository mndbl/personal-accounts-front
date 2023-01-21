import CanvasJSReact from '../../assets/canvasjs-3.7.4/canvasjs.react';
import { nf } from '../../config/main.config';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


export function BarChartBalances({ accountsData }) {
    let debitsData = []

    accountsData.map((account) => {
        const initial_deb_balance = account.initial_deb_balance
        const initial_cre_balance = account.initial_cre_balance
        let debits = 0
        let credits = 0
        account.registers_deb.forEach((reg_deb) =>
            debits += reg_deb.amount
        )
        account.registers_cre.forEach((reg_cre) =>
            credits += reg_cre.amount
        )

        const totalDebits = initial_deb_balance + debits
        const totalCredits = initial_cre_balance + credits
        const balance = Number(totalDebits - totalCredits)
        debitsData.push({
            label: account.name,
            y: balance
        })

     
    })

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Accounts"
        },
        subtitles: [{
            text: "Balances"
        }],
        axisX: {
            title: "Accounts"
        },
        axisY: {
            title: "$",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            includeZero: true
        },
        
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            // itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "Debits",
            showInLegend: true,
            yValueFormatString: "$ #,##0.##",
            dataPoints: debitsData
        },
        ]
    }

    return <CanvasJSChart options={options} />
}