export function AssignmentUpload() {
  return (
    <form className="max-w-sm">
      <h3>Upload your assignment</h3>
      <label htmlFor="file-input" className="sr-only">
        Choose file
      </label>
      <input
        type="file"
        name="file-input"
        id="file-input"
        className="block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:file:bg-neutral-700 dark:file:text-neutral-400"
      />
    </form>
  );
}
