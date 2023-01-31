import localforage from "localforage"
import { useEffect, useState } from "react"
import { Form, redirect, useLoaderData } from "react-router-dom"
import { accounts_URL } from "../../../../../config/main.config"
import { dataService } from "../../../../../services/data-services"
import { classTailwind } from "../../../../classnames/classnames"
import { InputNumber } from "../../../../inputs/input-number"
import { InputText } from "../../../../inputs/input-text"
import { WrapButtonsForms } from "../../../../wraps/wrap-buttons-forms"
import { WrapForms } from "../../../../wraps/wrap-forms"



export async function action({ params, request }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const id = params.id
    const formData = await request.formData()
    const account_categorie_id = formData.get('account_categorie_id')
    const name = formData.get('name')
    const initial_deb_balance = formData.get('initial_deb_balance')
    const initial_cre_balance = formData.get('initial_cre_balance')
    const cutoff_date = formData.get('cutoff_date')

    const data = {
        account_categorie_id, name, initial_deb_balance, initial_cre_balance, cutoff_date
    }

    if (id) {

        await dataService.updateData(accounts_URL + '/' + id, data, accessToken)
        return redirect('/dashboard/accounts')
    }

    await dataService.addData(accounts_URL, data, accessToken)
    return redirect('/dashboard/accounts')

}

export function AccountForm() {
    const [method, setMethod] = useState('post')
    const { account, accountCategories } = useLoaderData()
    const { id, account_categorie_id, name, initial_deb_balance, initial_cre_balance, cutoff_date } = account

    useEffect(() => {
        if (id) setMethod('put')
    }, [])

    return (
        <WrapForms name={'account'}>
            <Form method={method} className={classTailwind.formsClass}>
                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="flex flex-col space-y-6">

                            <div className="w-full">
                                <label htmlFor="account_categorie_id" className={classTailwind.labelsClass}>
                                    Account Categorie
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">

                                    <select name="account_categorie_id" id=""
                                        className={`${classTailwind.inputsClass}`}
                                        defaultValue={id ? account_categorie_id : ''}
                                        required
                                    >
                                        <option value="">Select</option>
                                        {accountCategories.map((accCat) => (
                                            <option key={`${accCat.id}${accCat.name}`} value={accCat.id}>{accCat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <InputText title={'name'} name='name' defaulVal={id ? name : ''} />
                            <InputNumber title='initial debit balance' name='initial_deb_balance' defaulVal={id ? initial_deb_balance : 0} />
                            <InputNumber title='initial credit balance' name='initial_cre_balance' defaulVal={id ? initial_cre_balance : 0} />
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="cutoff_date" className={classTailwind.labelsClass}>
                                    cutoff date
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">

                                    <input name="cutoff_date" id=""
                                        type='date'
                                        className={classTailwind.inputsClass}
                                        defaultValue={id ? cutoff_date : ''}
                                        required
                                    />
                                </div>
                            </div>

                            <WrapButtonsForms title={id ? 'edit' : 'save'} />
                        </div>
                    </div>
                </div>

            </Form >
        </WrapForms>
    )
}