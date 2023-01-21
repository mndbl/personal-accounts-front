import CanvasJSReact from '../../assets/canvasjs-3.7.4/canvasjs.react';
import { nf } from '../../config/main.config';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


export function BarChartAccounts({ accountsData }) {
    let debitsDataPoints = []
    let creditsDataPoints = []

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
        debitsDataPoints.push({
            label: account.name,
            y: totalDebits
        })

        creditsDataPoints.push({
            label: account.name,
            y: totalCredits
        })
    })

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Accounts"
        },
        subtitles: [{
            text: "Debits & Credits"
        }],
        axisX: {
            title: "Accounts"
        },
        axisY: {
            title: "Debits",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            includeZero: true
        },
        axisY2: {
            title: "Credits",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E",
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
            dataPoints: debitsDataPoints
        },
        {
            type: "column",
            name: "Credits",
            axisYType: "secondary",
            showInLegend: true,
            yValueFormatString: "$ #,##0.##",
            dataPoints: creditsDataPoints
        }]
    }

    return <CanvasJSChart options={options} />
}