interface ButtonProps extends React.ComponentProps<'button'> {
	isLoading?: boolean
}

export default function Button({ isLoading, ...props }: ButtonProps) {
	return (
		<button
			className='hover:bg-opacity-90 text-white py-2 px-4 rounded-md my-4 font-semibold flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.025] transition-transform bg-eos-primary'
			type={props.type}
			onClick={props.onClick}
		>
			{props.children}
			{isLoading && <span className='animate-spin w-5 h-5 rounded-full border-4 opacity-80 border-t-black'></span>}
		</button>
	)
}
