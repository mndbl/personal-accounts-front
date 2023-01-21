import { ArrowSmallLeftIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { nf } from "../../../../../config/main.config"


const balanceColumns = [
    {
        Header: 'account',
        accessor: 'account'
    },
    {
        Header: 'initial_balance',
        accessor: 'initial_balance'
    },
    {
        Header: 'debits',
        accessor: 'debits'
    },
    {
        Header: 'credits',
        accessor: 'credits'
    },
    {
        Header: 'balance',
        accessor: 'balance'
    }
]

export function AccountsBalance({ accounts, registers, showColumn, setShow, }) {
    const [showDetails, setShowDetails] = useState('')

    const data = []


    accounts.forEach(account => {
        const initial_deb_balance = Number(account.initial_deb_balance)
        const initial_cre_balance = Number(account.initial_cre_balance)
        let sumDebits = 0
        let sumCredits = 0
        const debits = registers.filter(reg =>
            reg.account_id_deb === account.id
        )

        const credits = registers.filter(reg =>
            reg.account_id_cre === account.id
        )

        debits.forEach(deb =>
            sumDebits += deb.amount
        )
        credits.forEach(cre =>
            sumCredits += cre.amount
        )
        const debitsTotal = Number(sumDebits)
        const creditsTotal = Number(sumCredits)
        const balance = Number(initial_deb_balance - initial_cre_balance + debitsTotal - creditsTotal)
       
        data.push({
            account: account.name,
            initial_balance: account.initial_deb_balance ? nf.format(account.initial_deb_balance) : nf.format(account.initial_cre_balance),
            debits: nf.format(debitsTotal),
            credits: nf.format(creditsTotal),
            balance: nf.format(balance)
        })

    });


    return (
        <div className="py-4 h-full px-2 overflow-scroll space-y-2 bg-gray-300 pb-24">
            <div>
                <h2 className="font-semibold text-center sticky">Accounts Balance</h2>
                <button onClick={() => setShow(prevState => prevState === 'hidden' ? '' : 'hidden')}
                    className="absolute right-2 top-2 p-1 text-gray-600 border-gray-400 border-2 rounded z-10 bg-gray-300">
                    <XMarkIcon className="w-4 h-4" />
                </button>

            </div>
            {
                data.map((dat) => (
                    <div key={`details-${dat.account}`}
                        className="capitalize text-sm border-2 border-gray-500 rounded p-2 bg-gray-50 relative">
                        <button className="capitalize "
                            onClick={() => {
                                setShowDetails(prevState =>
                                    prevState === '' ?
                                        dat.account :
                                        prevState === dat.account ? '' : dat.account
                                )
                            }}>
                            <p className="font-semibold text-gray-600">
                                {`${dat.account} `}
                            </p>
                            <ChevronUpIcon className={(showDetails === dat.account ? '' : 'hidden ') + "absolute right-2 top-2 h-4 w-4"} />
                            <ChevronDownIcon className={(showDetails === dat.account ? 'hidden ' : '') + "absolute right-2 top-2 h-4 w-4"} />
                        </button>

                        <div className={showDetails === dat.account ? '' : 'hidden'}>
                            <p>
                                initial balance
                                <span className="float-right">{dat.initial_balance}</span>
                            </p>
                            <p>
                                debits
                                <span className="float-right">{dat.debits}</span>
                            </p>
                            <p>
                                credits
                                <span className="float-right">{dat.credits}</span>
                            </p>
                            <p >
                                total balance
                                <span className="float-right">{`${dat.balance}`}</span>
                            </p>
                        </div>


                    </div>
                ))
            }
        </div>
    )
}