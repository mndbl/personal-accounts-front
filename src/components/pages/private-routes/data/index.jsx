import localforage from "localforage"
import { useMemo } from "react"
import { redirect, useLoaderData } from "react-router-dom"
import { accounts_URL, nf, registers_URL } from "../../../../config/main.config"
import { dataService } from "../../../../services/data-services"
import { Table } from "../../../table/table"

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


export async function loader({ params, request }) {
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
        register.amount = nf.format(register.amount)
    })
    return { registers, accounts, q }

}

export function IndexRegisters() {
    const { registers } = useLoaderData()
    const columns = useMemo(() => registersColumns)
    const data = useMemo(() => registers)

    return (
        <>
            {registers ?
                <>
                    <Table columns={columns} data={data} caption='registers' />
                </>
                :
                <div>
                    no records yet
                </div>
            }
        </>
    )
}