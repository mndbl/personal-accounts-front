import localforage from "localforage";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { accounts_categories_URL } from "../../../../../config/main.config";
import { dataService } from "../../../../../services/data-services";

export async function action({ params }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const id = params.id
    console.log('action');
    await dataService.destroyData(accounts_categories_URL + '/' + id, accessToken)
    return redirect('/dashboard/account-categories')
}
