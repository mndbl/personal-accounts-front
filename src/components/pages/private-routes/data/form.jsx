import localforage from "localforage";
import { useEffect } from "react";
import { useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { registers_URL } from "../../../../config/main.config";
import { dataService } from "../../../../services/data-services";
import { classTailwind } from "../../../classnames/classnames";
import { InputNumber } from "../../../inputs/input-number";
import { InputText } from "../../../inputs/input-text";
import { WrapButtonsForms } from "../../../wraps/wrap-buttons-forms";
import { WrapForms } from "../../../wraps/wrap-forms";

export async function action({ params, request }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const formData = await request.formData()

    const id = params.id
    const date = formData.get('date')
    const account_id_deb = formData.get('account_id_deb')
    const account_id_cre = formData.get('account_id_cre')
    const description = formData.get('description')
    const amount = formData.get('amount')
    console.log(userAuth);
    const data = {
        date,
        account_id_deb,
        account_id_cre,
        description,
        amount
    }

    id ?
        await dataService.updateData(registers_URL + '/' + id, data, accessToken)
        :
        await dataService.addData(registers_URL, data, accessToken)

    return redirect('/dashboard/registers')

}

export function RegisterForm() {
    const [method, setMethod] = useState('post')
    const { register, accounts } = useLoaderData()
    const { id, date, account_id_deb, account_id_cre, description, amount } = register

    useEffect(() => {
        if (id) setMethod('put')
    }, [])

    return (
        <WrapForms name={'registers'}>
            <Form method={method}>
                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="flex flex-col space-y-6">
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="date" className={classTailwind.labelsClass}>
                                    Account Categorie
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">

                                    <input name="date" id="" type='date'
                                        className={classTailwind.inputsClass}
                                        defaultValue={id ? date : ''}
                                        required
                                    />

                                </div>
                            </div>
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="account_id_deb" className={classTailwind.labelsClass}>
                                    account debit
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">

                                    <select name="account_id_deb" id=""
                                        className={classTailwind.inputsClass}
                                        defaultValue={id ? account_id_deb : ''}
                                        required
                                    >
                                        <option value="">Select</option>
                                        {accounts.map((account) => (
                                            <option key={'account-deb-' + account.name} value={account.id}>{account.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="account_id_cre" className={classTailwind.labelsClass}>
                                    account credit
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">

                                    <select name="account_id_cre" id=""
                                        className={classTailwind.inputsClass}
                                        defaultValue={id ? account_id_cre : ''}
                                        required
                                    >
                                        <option value="">Select</option>
                                        {accounts.map((account) => (
                                            <option key={'account-cre-' + account.name} value={account.id}>{account.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputText title={"description"} name='description' defaulVal={description} />
                                <InputNumber title={'amount'} name='amount' defaulVal={amount} />
                            </div>
                            <WrapButtonsForms title={id ? 'edit' : 'save'} />
                        </div>
                    </div>
                </div>
            </Form>
        </WrapForms>
    )

}