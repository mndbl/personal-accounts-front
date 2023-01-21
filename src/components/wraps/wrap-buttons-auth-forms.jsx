import { SubmitButton } from "../buttons";
import { HomeLink } from "../links";

export function WrapButtonsAuthForms({ title }) {
    return (
        <div className="col-span-3 sm:col-span-2 space-x-2">
            <SubmitButton title={title} />
            <HomeLink />
        </div>
    )
}