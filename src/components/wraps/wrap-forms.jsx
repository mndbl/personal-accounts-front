export function WrapForms({ children, name }) {
    return (
        <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
                <div className="flex flex-col space-y-6">
                    {children}
                </div>
            </div>
        </div>
    )
}