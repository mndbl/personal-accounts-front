import { BackButton } from "../buttons/back-button"
import { EditButton } from "../buttons/edit-button"
import { ShowRecordsButton } from "../buttons/show-records"

export const WrapButtonsShowItems = () => {
    return (
        <div className="space-x-2 ">
            <ShowRecordsButton/>
            <EditButton />
            <BackButton />
        </div>
    )
}