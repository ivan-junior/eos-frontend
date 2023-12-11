export default function Select({ children, ...props }: React.ComponentProps<'select'>) {
	return (
		<select
			className='bg-gray-50 border text-gray-900 text-md rounded-lg focus:ring-bs-primary focus:border-bs-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bs-primary border-bs-primary dark:focus:border-bs-primary'
			{...props}
		>
			{children}
		</select>
	)
}
