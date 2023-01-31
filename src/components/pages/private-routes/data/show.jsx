import localforage from "localforage";
import { useLoaderData } from "react-router-dom";
import { accounts_URL, nf, registers_URL } from "../../../../config/main.config";
import { dataService } from "../../../../services/data-services";
import { WrapButtonsShowItems } from "../../../wraps/wrap-buttons-show-items";

export async function loader({ params, request }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const id = params.id
   
    const register = await dataService.getDataId(registers_URL + '/' + id, accessToken)
    const accounts = await dataService.getData(accounts_URL, '', {}, accessToken)

    return { register, accounts }
}


export function ShowRegister() {
    const { register } = useLoaderData()
    console.log(register);
    return (
        <div className="show-record">
            {
                register ?
                    <div className="overflow-hidden bg-white w-1/2 mx-auto mt-6 shadow sm:rounded-lg">
                        <div className="px-6 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{`Description: ${register.description}`}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{`Date: ${register.date}`}</p>
                        </div>
                        <div className="border-y border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">{`Debit to:`}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{register.account_deb.name}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">{`Credit to:`}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{register.account_cre.name}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">{`Amount:`}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nf.format(register.amount)}</dd>
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