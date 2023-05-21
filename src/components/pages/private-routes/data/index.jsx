import localforage from "localforage"
import { useMemo } from "react"
import { redirect, useLoaderData } from "react-router-dom"
import { accounts_URL, nf, registers_URL } from "../../../../config/main.config"
import { dataService } from "../../../../services/data-services"
import { Table } from "../../../table/table"
import { useState } from "react"
import { NumericFormat } from "react-number-format"
import { useEffect } from "react"


const registersColumns = [
    {
        Header: 'id',
        accessor: 'id'
    },
    {
        Header: 'date',
        accessor: 'date'
    },
    {
        Header: 'account_id_deb',
        accessor: 'account_id_deb'
    },
    {
        Header: 'account_id_cre',
        accessor: 'account_id_cre'
    },
    {
        Header: 'description',
        accessor: 'description'
    },
    {
        Header: 'amount',
        accessor: 'amount'
    },
]


export async function loader({ request }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    if (!accessToken) {
        return redirect('/login')
    }
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    const registers = await dataService.getData(registers_URL, q, { keys: ['description'] }, accessToken)
    const accounts = await dataService.getData(accounts_URL, '', {}, accessToken)
    registers.forEach(register => {
        const debitAccount = accounts.find((acc) =>
            acc.id === register.account_id_deb

        )

        const creditAccount = accounts.find((acc) =>
            acc.id === register.account_id_cre
        )

        register.account_id_deb = debitAccount.name
        register.account_id_cre = creditAccount.name
        //register.amount = nf.format(register.amount)
    })
    return { registers, accounts, q }

}

export function IndexRegisters() {
    const { registers, accounts } = useLoaderData()
    const [filter, setFilter] = useState('')
    const [balances, setBalances] = useState({
        debitsAmount: 0,
        creditsAmount: 0,
    })
    const [balance, setBalance] = useState(0)
    const [initialBalances, setInitialBalances] = useState({
        initialDeb: 0,
        initialCre: 0
    })

    const columns = useMemo(() => registersColumns)

    const filteredRegisters = filter === '' ?
        registers :
        registers.filter((reg) => {
            return reg.account_id_deb === filter || reg.account_id_cre === filter
        })

    useEffect(() => {
        if (filter != '') {
            if (filteredRegisters[0].account_id_deb === filter) {
                setInitialBalances(() => ({
                    initialCre: filteredRegisters[0].account_deb.initial_cre_balance,
                    initialDeb: filteredRegisters[0].account_deb.initial_cre_balance
                }))
            }
            if (filteredRegisters[0].account_id_cre === filter) {
                setInitialBalances(() => ({
                    initialCre: filteredRegisters[0].account_cre.initial_cre_balance,
                    initialDeb: filteredRegisters[0].account_cre.initial_cre_balance
                }))
            }

        }
        setBalances({
            creditsAmount: 0,
            debitsAmount: 0
        })
        filteredRegisters.forEach((reg) => {

            return (reg.account_deb.name === filter ?
                setBalances((prevReg) => ({
                    ...prevReg,
                    debitsAmount: initialBalances.initialDeb + prevReg.debitsAmount + reg.amount,
                })) :
                reg.account_cre.name === filter ? setBalances((prevReg) => ({
                    ...prevReg,
                    creditsAmount: initialBalances.initialCre + prevReg.creditsAmount + reg.amount,
                })) : 0)
        })
        setBalance(balances.debitsAmount - balances.creditsAmount)
    }, [filter])

    
    console.log(balance, balances, initialBalances);
    const data = useMemo(() => filteredRegisters)


    return (
        <>
            {registers ?
                <>
                    <Table columns={columns}
                        data={data}
                        caption='registers'
                        accounts={accounts}
                        filter={filter}
                        setFilter={setFilter}
                        balances={balances}
                        balance={balance}
                    />
                </>
                :
                <div>
                    no records yet
                </div>
            }
        </>
    )
}