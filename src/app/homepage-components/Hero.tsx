import { AnimatedText } from "./AnimatedText"

const backgroundImagePath = "/hero/hero.jpg"

const Hero = () => {
    return (
        <div
            className="flex flex-col px-4 md:px-8 xl:px-0 xl:max-w-7xl mx-auto gap-12 overflow-x-hidden"
            style={{
                backgroundImage: `url(${backgroundImagePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="min-h-[70svh] w-full h-full flex-1 flex flex-col justify-end">
                <h1 className="mt-48">
                    <AnimatedText words={["tvé", "připravujeme"]} />
                    <br />
                    <span className="font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl block mt-2 lg:mt-0 leading-[0.8]">
                        soukromé fitko
                    </span>
                </h1>
                <p className="font-serif font-bold text-2xl lg:text-5xl">v Praze</p>
            </div>
            <div className="w-full h-full flex-1 flex flex-col">
                <p className="font-bold text-sm lg:text-2xl text-center">
                    100% soukromí, vlastní hudba, otevření přes apku
                    <br />
                    <span className="mt-2 block">otevíráme už brzy!</span>
                </p>
            </div>
        </div>
    )
}

export default Hero
