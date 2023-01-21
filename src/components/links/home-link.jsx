import { Link } from "react-router-dom";

export function HomeLink(params) {
    return <Link to="/" 
    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-gray-800 shadow-sm hover:bg-indigo-700 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >Home</Link>
}