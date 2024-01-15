import localforage from "localforage"
import { useMemo } from "react"
import { redirect, useLoaderData } from "react-router-dom"
import { accounts_categories_URL, accounts_URL, nf } from "../../../../../config/main.config"
import { dataService } from "../../../../../services/data-services"
import { Table } from "../../../../table/table"

export async function loader({ request }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    if (!accessToken) {
        return redirect('/login')
    }
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    const accounts = await dataService.getData(accounts_URL, q, { keys: ['name'] }, accessToken)
    const accountCategories = await dataService.getData(accounts_categories_URL, '', {}, accessToken)

    if (accounts) {
        accounts.forEach(account => {
            const accountCategorieOfAccount = accountCategories.find((accCat) =>
                account.account_categorie_id === accCat.id
            )
            account.account_categorie_id = accountCategorieOfAccount.name

            account.initial_deb_balance = nf.format(account.initial_deb_balance)
            account.initial_cre_balance = nf.format(account.initial_cre_balance)

        });
    }

    return { accounts,q }
}

// format currency number?

const accountsColumns = [
    {
        Header: 'id',
        accessor: 'id'
    },
    {
        Header: 'account categorie',
        accessor: 'account_categorie_id'
    },
    {
        Header: 'name',
        accessor: 'name'
    },
    {
        Header: 'initial deb balance',
        accessor: 'initial_deb_balance'
    },
    {
        Header: 'initial cre balance',
        accessor: 'initial_cre_balance'
    },
    {
        Header: 'actual balance',
        accessor: 'actual_balance'
    },
    {
        Header: 'cutoff date',
        accessor: 'cutoff_date'
    },
]

export function IndexAccounts() {
    const { accounts } = useLoaderData()
    const data = useMemo(() => accounts)
    const columns = useMemo(() => accountsColumns)


    return (
        <>
            {accounts ?
                <>
                    <Table columns={columns} data={data} caption='accounts' />
                </>
                :
                <div>
                    no records yet
                </div>
            }
        </>
    )
}