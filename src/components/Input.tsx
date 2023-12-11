export default function Input(props: React.ComponentProps<'input'>) {
	return (
		<input
			{...props}
			className='rounded-md h-10 py-2 px-3 placeholder:text-gray-400 border border-gray-300 leading-tight shadow-md focus:shadow-outline dark:bg-gray-800 dark:shadow-gray-700 my-1 read-only:bg-gray-200 disabled:bg-gray-200 dark:read-only:bg-gray-800 dark:disabled:bg-gray-800'
		/>
	)
}
