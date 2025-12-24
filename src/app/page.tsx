import { HydrateClient } from "~/trpc/server"
import { LatestPost } from "./_components/post"

export default async function Home() {
    return (
        <HydrateClient>
            <header>header</header>
            <main className="">
                Main
                <LatestPost />
            </main>
            <footer>footer</footer>
        </HydrateClient>
    )
}
