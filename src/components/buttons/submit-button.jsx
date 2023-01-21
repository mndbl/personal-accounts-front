export const SubmitButton = ({ title = 'save' }) => {
   return <button
      type="submit"
      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
   >
      {title}
   </button>
}