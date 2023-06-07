import { nf } from "../../config/main.config";
import { OptionsActionsTable } from "./options-actions-table"

export function DataCellOptions({ cell, i }) {
    
    const hiddenClass = cell.render('Header') === 'id' ? 'hidden' : ''

    const valores = Object.keys(cell.row.values).length
    return (
        <>
            <td {...cell.getCellProps()}
                className={`px-4 py-2 text-sm capitalize whitespace-nowrap ${hiddenClass}`}>
                {cell.render('Header') === 'amount' ? nf.format(cell.row.values.amount) : cell.render('Cell')}
            </td>
            {Number(i) === Number(valores) - 1 && <OptionsActionsTable id={cell.row.values.id} />}
        </>
    )
}