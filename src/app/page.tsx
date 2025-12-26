import { HydrateClient } from "~/trpc/server"
import { LatestPost } from "./_components/post"
import { auth } from "~/server/auth"
import Hero from "./homepage-components/Hero"
import Videos from "./homepage-components/Videos"
import Form from "./homepage-components/Form"
import { myMetadata } from "./lib/metadata"
import type { Metadata } from "next"

export const metadata: Metadata = myMetadata.homepage

export default async function Home() {
    const session = await auth()

    return (
        <HydrateClient>
            <header></header>
            <main className="">
                <section id="hero" className="mb-8">
                    <Hero />
                </section>
                <section id="videos" className="mb-32 lg:mb-12">
                    <Videos />
                </section>
                <section id="form" className="mb-64 lg:mb-16">
                    <Form />
                </section>
            </main>
            <footer></footer>
        </HydrateClient>
    )
}
