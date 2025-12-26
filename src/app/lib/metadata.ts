import type { Metadata } from "next"
import type { RouterOutputs } from "~/trpc/react"

interface AppMetadata {
    app: Metadata
    homepage: Metadata
}

export const myMetadata: AppMetadata = {
    app: {
        title: {
            template: "%s | VS Gym",
            default: "VS Gym",
        },
        description: "Zacvič si",
        applicationName: "VS Gym",
        appleWebApp: {
            title: "VS Gym",
            capable: true,
            statusBarStyle: "default",
        },
        manifest: "/site.webmanifest",
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/apple-touch-icon.png",
            other: [
                {
                    rel: "icon",
                    type: "image/svg+xml",
                    url: "/favicon.svg",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "96x96",
                    url: "/favicon-96x96.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "192x192",
                    url: "/favicon-192x192.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "512x512",
                    url: "/favicon-512x512.png",
                },
            ],
        },
        openGraph: {
            title: "VS Gym - Zacvič si",
            description: "Objev nové místo pro cvičení",
            url: "https://www.vsgym.cz/",
            siteName: "VS Gym",
            images: [
                {
                    url: "https://www.vsgym.cz/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "VS Gym - Nabídky bydlení",
                },
            ],
            type: "website",
        },
    },
    homepage: {
        title: "VS Gym - Zacvič si",
        description: "Objev nové místo pro cvičení",
    },
}
