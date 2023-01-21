import { Form } from "react-router-dom"
import { classTailwind } from "../classnames/classnames"

export const LogoutButton = () => {
    return (
        <Form method="post" action="/logout">
            <button type="submit" className={classTailwind.mainNavLinks + ''}>Logout</button>
        </Form>

    )
}