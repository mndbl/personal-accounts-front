import { Form, Link } from "react-router-dom"
import { MagnifyingGlassCircleIcon, DocumentIcon, TrashIcon } from "@heroicons/react/24/solid"

export function OptionsActionsTable({ id }) {
    

    return (
        <>
            <td>
                <Link to={`${id}`}><MagnifyingGlassCircleIcon className="w-6 h-6 text-green-700" /></Link>
            </td>
            <td>
                <Link to={`${id}/edit`}><DocumentIcon className="w-6 h-6 text-blue-700" /></Link>
            </td>
            <td>
                <Form method="post" action={`${id}/destroy`}
                    onSubmit={(event) => {
                        if (
                            !window.confirm(
                                "Please confirm you want to delete this record."
                            )
                        ) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type="submit" to={`${id}/destroy`}><TrashIcon className="w-6 h-6 text-red-700" /></button>
                </Form>
            </td>
        </>

    )
}