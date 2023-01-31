import localforage from "localforage"
import { useEffect, useState } from "react"
import { Form, redirect, useLoaderData } from "react-router-dom"
import { accounts_categories_URL } from "../../../../../config/main.config"
import { dataService } from "../../../../../services/data-services"
import { classTailwind } from "../../../../classnames/classnames"
import { InputText } from "../../../../inputs/input-text"
import { WrapButtonsForms } from "../../../../wraps/wrap-buttons-forms"
import { WrapForms } from "../../../../wraps/wrap-forms"



export async function action({ params, request }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const id = params.id
    const formData = await request.formData()
    const name = formData.get('name')
    const type = formData.get('type')

    const data = {
        name, type
    }

    if (id) {
      
        await dataService.updateData(accounts_categories_URL + '/' + id, data, accessToken)
        return redirect('/dashboard/account-categories')
    }

    await dataService.addData(accounts_categories_URL, data, accessToken)
    return redirect('/dashboard/account-categories')

}

export function AccounCategorieForm() {
    const [method, setMethod] = useState('post')
    const { accountCategorie } = useLoaderData()
    const { id, name, type } = accountCategorie

    useEffect(() => {
        if (id) {
            setMethod('put')
        }
    }, [])

    return (
        <WrapForms name='account categorie'>
            <Form method={method} className={classTailwind.formsClass}>
                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="flex flex-col space-y-6">
                            <InputText title={'account categorie name'} name='name' defaulVal={id ? name : ''} />
                            <div className="col-span-3 sm:col-span-2">
                                <label htmlFor='type' className={classTailwind.labelsClass}>
                                    type
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">

                                    <select name="type" id=""
                                        className={classTailwind.inputsClass}
                                        defaultValue={id ? type : ''}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="balance sheet">balance sheet</option>
                                        <option value="statement of incomes">statement of incomes</option>
                                    </select>
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