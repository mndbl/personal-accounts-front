import { Form, redirect } from "react-router-dom";
import { authService } from "../../../services/auth-services";
import { classTailwind } from "../../classnames/classnames";
import { InputEmail } from "../../inputs/input-email";
import { WrapAuthPages } from "../../wraps/wrap-auth-pages";
import { WrapButtonsAuthForms } from "../../wraps/wrap-buttons-auth-forms";
import { WrapForms } from "../../wraps/wrap-forms";

export async function action({ request }) {
    let errorMessage = ''
    const formData = await request.formData()
    const email = formData.get('email-username')
    const password = formData.get('password-user')

    const data = {
        email, password
    }

    const userAuth = await authService.login(data)
    if (userAuth.success === false) {
        errorMessage = userAuth.message
        throw new Error(errorMessage)
    }
    return redirect('/dashboard')
}

export function Login(params) {
    return (
        <WrapAuthPages title={'Login'} text={'Insert your access information'}>

            <Form method="post">
                <WrapForms>
                    <InputEmail title='Email' name='email-username' />

                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website" className={classTailwind.labelsClass}>
                            Password
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">

                            <input
                                type="password"
                                name="password-user"
                                id="password-user"
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