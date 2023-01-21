import { useEffect } from "react";
import { Form, useLoaderData,   useSubmit } from "react-router-dom";

export function SearchInput({request}) {
    const {q}= useLoaderData()
    const submit = useSubmit()

    useEffect(() => {
        if (q) {
            document.getElementById('q').value = q
        }
        else {
            document.getElementById('q').value = ''
        }
    }, [q])
    return (
        <Form className="relative max-w-xs" id="search-form" role="search">
            <label htmlFor="q" className="sr-only">
                Search
            </label>
            <input
                className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                id="q"
                aria-label="Search registers"
                placeholder='Search...'
                type="search"
                name="q"
                defaultValue={q}
                onChange={(e) => {
                    submit(e.currentTarget.form)
                }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>
        </Form>
    )
}