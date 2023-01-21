import { Link } from "react-router-dom";
import { LogoutButton } from "../buttons";
import { classTailwind } from "../classnames/classnames";


export function MainNav({ username, accessToken }) {
    return (
        <div className="flex flex-col lg:flex-row">

            {username && <Link className={`${classTailwind.mainNavLinks}`} to={'profile'}>{username}</Link>}
            {
                !accessToken &&
                <>
                    <Link className={classTailwind.mainNavLinks} to={'login'}>Login</Link>

                    <Link className={classTailwind.mainNavLinks} to="register">Register</Link>
                </>}
            {
                accessToken &&
                <>

                    <Link className={classTailwind.mainNavLinks} to="dashboard">Dashboard</Link>

                    <LogoutButton />
                </>
            }
        </div>


    )
}