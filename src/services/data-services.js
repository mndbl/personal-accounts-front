import axios from "axios"
import { matchSorter } from "match-sorter";
import authHeader from "./auth-header"

const getData = async (uriSend, query, keys, currAccToken) => {
    const dataResult = await axios(uriSend, authHeader(currAccToken))
    let data = dataResult.data.data
    if (query) {
        data = matchSorter(data, query, keys)
    }
    return data
}

const getDataId = async (uriSend, currAccToken) => {
    const data = await axios.get(uriSend, authHeader(currAccToken))
    return data.data.data
}

const addData = async (uriSend, data, currAccToken) => {
    const newData = await axios.post(uriSend, data, authHeader(currAccToken))
    return newData
}

const updateData = async (uriSend, data, currAccToken) => {
    const updateData = await axios.put(uriSend, data, authHeader(currAccToken))
    return updateData
}

const destroyData = async (uriSend, currAccToken) => {
    const deleteData = await axios.delete(uriSend, authHeader(currAccToken))
    return deleteData
}

export const dataService = {
    getData,
    getDataId,
    addData,
    updateData,
    destroyData
}