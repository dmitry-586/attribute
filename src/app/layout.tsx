import type { Metadata } from "next"
import { Inter, Onest } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const onest = Onest({
	variable: "--font-onest",
	subsets: ["latin"],
})

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Attribute",
	description: "Attribute",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${onest.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
