import localforage from "localforage"
import { redirect } from "react-router-dom";
import { authService } from "../../../services/auth-services";

export async function action() {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    
    await authService.logout(accessToken)

    localforage.setItem('userAuth', {
        username: '',
        accessToken: ''
    })
    return redirect('/')
}

export function Logout() {
    return <div></div>
}