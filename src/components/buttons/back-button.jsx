import { useNavigate } from "react-router-dom"

export const BackButton = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(-1)
    }
    return (
        <button onClick={handleNavigate} type='reset'
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Back
        </button>
    )
}