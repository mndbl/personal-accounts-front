import { Form, redirect } from "react-router-dom";
import { authService } from "../../../services/auth-services";
import { classTailwind } from "../../classnames/classnames";
import { InputEmail } from "../../inputs/input-email";
import { InputText } from "../../inputs/input-text";
import { WrapAuthPages } from "../../wraps/wrap-auth-pages";
import { WrapButtonsAuthForms } from "../../wraps/wrap-buttons-auth-forms";
import { WrapForms } from "../../wraps/wrap-forms";

export async function action({ request }) {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirm_password = formData.get('confirm_password')

    const data = {
        name, email, password, confirm_password
    }
    const newUser = await authService.register(data)

    if (newUser.success === false) {
        const firstError = Object.keys(newUser.data)
        const firstErrorMessage = newUser.data[firstError][0]
        const message = newUser.message + ' ' + firstErrorMessage
        throw new Error(message)
    }


    return redirect('/dashboard')
}

export function Register(params) {
    return (
        <WrapAuthPages title={'Register'} text={'Insert your information'}>
            <Form method="post">
                <WrapForms>
                    <InputText title='Username' name='name' />

                    <InputEmail title='Email' name='email' />
                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor='password' className={classTailwind.labelsClass}>
                            Password
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">

                            <input
                                type="password"
                                name='password'
                                id='password'
                                className={classTailwind.inputsClass}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor='confirm_password' className={classTailwind.labelsClass}>
                            Confirm Password
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">

                            <input
                                type="password"
                                name='confirm_password'
                                id='confirm_password'
                                className={classTailwind.inputsClass}
                                required
                            />
                        </div>
                    </div>
                    <WrapButtonsAuthForms />
                </WrapForms>
            </Form>
        </WrapAuthPages>
    )
}