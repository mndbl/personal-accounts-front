import CanvasJSReact from '../../assets/canvasjs-3.7.4/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


export function PieChart({ accountsData, accountCategoriesData }) {

    let dataPoints = []

    if (accountCategoriesData.error) {
        return
    } else {
        accountCategoriesData.forEach(accCat => {
            let initial_balances = 0
            const accounts = accountsData.filter((acc) => (
                acc.account_categorie_id === accCat.id
            ))
            accounts.forEach((acc) => {
                let initial_balance_acc = acc.initial_deb_balance != 0 ? acc.initial_deb_balance : acc.initial_cre_balance
                initial_balances += Number(initial_balance_acc)
            })
            dataPoints.push({
                y: initial_balances,
                label: accCat.name
            })
        });
    }
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Accounts"
        },
        subtitles: [{
            text: "Accounts Categories"
        }],
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: $ {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - $ {y}",
            dataPoints
        }]
    }
    return (
        <CanvasJSChart options={options} className='capitalize' />
    )
}

//capitalize a string ?