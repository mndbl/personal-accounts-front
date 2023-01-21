import { SubmitButton } from "../buttons";
import { BackButton } from "../buttons/back-button";

export function WrapButtonsForms({ title }) {
    return (
        <div className="space-x-2 mt-4 float-right">
            <SubmitButton title={title} />
            <BackButton />
        </div>
    )
}