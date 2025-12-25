import { HydrateClient } from "~/trpc/server"
import { LatestPost } from "./_components/post"
import { auth } from "~/server/auth"
import Hero from "./homepage-components/Hero"
import Videos from "./homepage-components/Videos"

export default async function Home() {
    const session = await auth()

    return (
        <HydrateClient>
            <header>header</header>
            <main className="">
                <section id="hero" className="mb-8">
                    <Hero />
                </section>
                <section id="videos">
                    <Videos />
                </section>
            </main>
            <footer>footer</footer>
        </HydrateClient>
    )
}
