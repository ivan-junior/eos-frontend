export default function Textarea(props: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			className='p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-bs-primary focus:border-bs-primary dark:bg-gray-800  dark:placeholder-gray-400 dark:text-white dark:focus:ring-bs-primary dark:focus:border-bs-primary read-only:bg-gray-200 disabled:bg-gray-200 dark:read-only:bg-gray-800 dark:disabled:bg-gray-800 read-only:text-inherit disabled:text-inherit'
			{...props}
		></textarea>
	)
}
