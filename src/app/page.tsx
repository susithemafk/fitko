import { HydrateClient } from "~/trpc/server"
import { LatestPost } from "./_components/post"
import { auth } from "~/server/auth"
import Hero from "./homepage-components/Hero"

export default async function Home() {
    const session = await auth()

    return (
        <HydrateClient>
            <header>header</header>
            <main className="">
                <section className="hero-section">
                    <Hero />
                </section>
            </main>
            <footer>footer</footer>
        </HydrateClient>
    )
}
