import Logo from './Logo'

export default function Footer() {
	return (
		<footer>
			<div className='flex flex-col justify-center items-center gap-2 md:justify-around md:flex-row md:items-center w-full p-8 border-t border-gray-200 shadow shadow-gray-300 dark:shadow-none dark:border-none dark:bg-gray-800 text-xs md:text-sm text-center'>
				<Logo />
				<div>Made with ❤️ by Ivan Junior</div>
			</div>
		</footer>
	)
}
