import { dataService } from "../../../../../services/data-services";
import { accounts_categories_URL } from "../../../../../config/main.config";
import localforage from "localforage";
import { redirect, useLoaderData } from "react-router-dom";
import { Table } from "../../../../table/table";
import { useMemo } from "react";

const columnsAccCat = [
    {
        Header: 'id',
        accessor: 'id'
    },
    {
        Header: 'name',
        accessor: 'name'
    },
    {
        Header: 'type',
        accessor: 'type'
    },
]

export async function loader({ request, params }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    if (!accessToken) {
        return redirect('/login')
    }
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    const accountCategories = await dataService.getData(accounts_categories_URL, q, { keys: ['name'] }, accessToken)
    return { accountCategories, accessToken, q }
}

export function IndexAccountCategories() {
    const { accountCategories } = useLoaderData()
    const columns = useMemo(() => columnsAccCat)
    const data = useMemo(() => accountCategories)
    return (
        <>
            {accountCategories ?
                <>
                    <Table columns={columns} data={data} caption='account categories' />
                </>
                :
                <div>
                    no records yet
                </div>
            }
        </>
    )
}