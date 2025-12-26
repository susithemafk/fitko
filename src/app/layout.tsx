import "~/styles/globals.css"

import { type Metadata } from "next"
import { Syne, Playfair_Display } from "next/font/google"

import { TRPCReactProvider } from "~/trpc/react"
import { Toaster } from "~/components/ui/sonner"
import { myMetadata } from "./lib/metadata"

export const metadata: Metadata = myMetadata.app

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
})

const playfair = Playfair_Display({
    style: ["normal", "italic"],
    variable: "--font-playfair",
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`dark ${syne.variable} ${playfair.variable}`}>
            <body>
                <TRPCReactProvider>{children}</TRPCReactProvider>
                <Toaster />
            </body>
        </html>
    )
}
