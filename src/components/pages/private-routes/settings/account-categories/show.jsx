import localforage from "localforage";
import { redirect, useLoaderData } from "react-router-dom";
import { accounts_categories_URL } from "../../../../../config/main.config";
import { dataService } from "../../../../../services/data-services";
import { WrapButtonsShowItems } from "../../../../wraps/wrap-buttons-show-items";

export async function loader({ params }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    if (!accessToken) {
        return redirect('/login')
    }
    const id = params.id
    const accountCategorie = await dataService.getDataId(accounts_categories_URL + '/' + id, accessToken)
    return { accountCategorie }
}

export function ShowAccountCategorie() {
    const { accountCategorie } = useLoaderData()
    const accountsOfThisCategorie = accountCategorie.accounts
    
    return (
        <div className="show-record">
            {
                accountCategorie ?
                    <div className="overflow-hidden bg-white w-1/2 mx-auto mt-6 shadow sm:rounded-lg">
                        <div className="px-6 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{`Account Categorie Name: ${accountCategorie.name}`}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{`type: ${accountCategorie.type}`}</p>
                        </div>
                        <div className="border-y border-gray-200">
                            <div className="bg-gray-50 px-4 py-5 sm:px-6">
                                <p className="text-sm font-medium text-gray-500 block ">Accounts of this categorie</p>
                                <div className="mx-6 grid grid-cols-3 gap-x-6 gap-y-2 mt-2">
                                    {
                                        accountsOfThisCategorie.map((acc) => (
                                            <div className="border-2 ring-2 border-blue-400 bg-blue-100 ring-blue-300 rounded-full px-2 text-center">
                                                <span className="mt-1 text-sm text-blue-800 sm:mt-0">{acc.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="bg-white px-4 py-5 flex justify-end">
                            <WrapButtonsShowItems />
                        </div>
                    </div>
                    :
                    <div>
                        <p>
                            No record found
                        </p>
                    </div>
            }
        </div>
    )
}