import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'EOS Teste',
	description: 'Desafio da EOS para vaga de Dev Fullstack'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR' suppressHydrationWarning>
			<body className={`${inter.className} dark:bg-gray-900 dark:text-gray-100`}>
				<ThemeProvider attribute='class' defaultTheme='dark' forcedTheme='dark' enableSystem={false}>
					<main className='min-h-[100dvh] grid grid-rows-[auto_1fr_auto] transition-all'>
						<Header />
						{children}
						<Footer />
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
