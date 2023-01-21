import localforage from "localforage"
import { redirect, useLoaderData } from "react-router-dom"
import { accounts_categories_URL, accounts_URL, nf } from "../../../../../config/main.config"
import { dataService } from "../../../../../services/data-services"
import { WrapButtonsShowItems } from "../../../../wraps/wrap-buttons-show-items"

export async function loader({ params, request }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const id = params.id
    if (!accessToken) {
        return redirect('/login')
    }
    let account = await dataService.getDataId(accounts_URL + '/' + id, accessToken)
    let accountCategories = await dataService.getData(accounts_categories_URL, '', {}, accessToken)
    const accountCategorie = await dataService.getDataId(accounts_categories_URL + '/' + account.account_categorie_id, accessToken)

    return { account, accountCategorie, accountCategories }
}



export function ShowAccount() {
    const { account } = useLoaderData()
    let sumDebits = 0
    let sumCredits = 0
    const debits = account.registers_deb.filter((deb) =>
        deb.account_id_deb === account.id
    )

    debits.forEach(deb => {
        sumDebits += deb.amount
    });

    const credits = account.registers_deb.filter((cre) =>
        cre.account_id_cre === account.id
    )
    credits.forEach((cre) =>
        sumCredits += cre.amount
    )
    const actual_balance = nf.format(account.initial_deb_balance - account.initial_cre_balance + sumDebits - sumCredits)

    return (
        <div className="show-record">
            {
                account ?
                    <div className="overflow-hidden bg-white w-1/2 mx-auto mt-6 shadow sm:rounded-lg">
                        <div className="px-6 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{`Account Name: ${account.name}`}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{`Actual Balance: ${actual_balance}`}</p>
                        </div>
                        <div className="border-y border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Account Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{account.name}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Actual Balance</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{actual_balance}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Account Categorie</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{account.account_categorie.name}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Account Initial Balance</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {account.initial_deb_balance === 0 ?
                                            account.initial_cre_balance === 0 ? 0 : nf.format(-account.initial_cre_balance) : nf.format(account.initial_deb_balance)}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">cutoff date</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{account.cutoff_date}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="bg-white px-4 py-5 flex justify-end">
                            <WrapButtonsShowItems />
                        </div>
                    </div>
                    :
                    <div>
                        no record found
                    </div>
            }
        </div>
    )
}
