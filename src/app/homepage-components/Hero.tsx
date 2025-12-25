import { AnimatedText } from "./AnimatedText"

const Hero = () => {
    return (
        <div className="outline outline-green-500 flex flex-col px-4 md:px-8 xl:px-0 xl:max-w-7xl mx-auto gap-12">
            <div className="outline outline-red-500 min-h-[70svh] w-full h-full flex-1 flex flex-col justify-end">
                <h1 className="mt-48">
                    <AnimatedText words={["tvé", "připravujeme"]} />
                    <br />
                    <span className="font-extrabold text-8xl leading-[0.8]">soukromé fitko</span>
                </h1>
                <p className="font-serif font-bold text-5xl">v Praze</p>
            </div>
            <div className="outline outline-red-500 w-full h-full flex-1 flex flex-col">
                <p className="font-bold text-2xl text-center">
                    100% soukromí, vlastní hudba, otevření přes apku
                    <br />
                    otevíráme už brzy
                </p>
            </div>
        </div>
    )
}

export default Hero
