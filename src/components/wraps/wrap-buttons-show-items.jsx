import { BackButton } from "../buttons/back-button"
import { EditButton } from "../buttons/edit-button"

export const WrapButtonsShowItems = () => {
    return (
        <div className="space-x-2 ">
            <BackButton />
            <EditButton />
        </div>
    )
}