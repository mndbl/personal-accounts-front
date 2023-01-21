import localforage from "localforage";
import { redirect } from "react-router-dom";
import { registers_URL } from "../../../../config/main.config";
import { dataService } from "../../../../services/data-services";

export async function action({ params }) {
    const userAuth = await localforage.getItem('userAuth')
    const { accessToken } = userAuth
    const id = params.id

    await dataService.destroyData(registers_URL + '/' + id, accessToken)
    return redirect('/dashboard/registers')
}