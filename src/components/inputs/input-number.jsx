import { classTailwind } from "../classnames/classnames";

export function InputNumber({ title, name, defaulVal = null, }) {
    return (
        <div className="col-span-3 sm:col-span-2">
            <label htmlFor={name} className={classTailwind.labelsClass}>
                {title}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">

                <input
                    defaultValue={defaulVal}
                    type="number"
                    step='0.01'
                    name={name}
                    id={name}
                    className={classTailwind.inputsClass}
                    required
                />
            </div>
        </div>
    )
}