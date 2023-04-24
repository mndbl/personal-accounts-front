import CanvasJSReact from '../../assets/canvasjs-3.7.4/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


export function PieChart({ accountsData, accountCategoriesData }) {

    let dataPoints = []

    if (accountCategoriesData.error) {
        return
    } else {

        let balance_account = 0
        let register_debs = 0
        let register_creds = 0
        accountCategoriesData.forEach(accCat => {

            const accounts = accountsData.filter((account) => (
                account.account_categorie_id === accCat.id
            ))
            balance_account = 0
            accounts.forEach((acc) => {
                register_debs = 0
                register_creds = 0
                acc.registers_deb.forEach((deb) => {
                    register_debs += deb.amount
                })
                acc.registers_cre.forEach((cre) => {
                    register_creds += cre.amount
                })

                balance_account += Number(acc.initial_deb_balance) - Number(acc.initial_cre_balance) + Number(register_debs) - Number(register_creds)

            })
            dataPoints.push({
                y: balance_account,
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
            indexLabel: "{label} -> $ {y}",
            dataPoints
        }]
    }
    return (
        <CanvasJSChart options={options} className='capitalize' />
    )
}

//capitalize a string ?