import Image from 'next/image'

export default function Logo() {
	return <Image src='/eos-logo.png' width={130} height={48} alt='Logo' priority />
}
