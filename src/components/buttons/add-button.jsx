import { useNavigate } from "react-router-dom"

export const AddButton = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('add')
    }
    return (
        <button onClick={handleNavigate}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add</button>
    )
}