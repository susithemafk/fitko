"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "~/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const debug = false

const Videos = () => {
    return (
        <div className="px-4">
            <div
                className={cn(
                    "flex flex-wrap flex-row gap-2 lg:gap-6 items-center max-w-5xl mx-auto mb-8 lg:mb-0",
                    debug && "outline outline-blue-500"
                )}>
                <div className="max-w-xs">
                    <Video src="/videos/1.mp4" />
                </div>
                <p className="font-semibold text-2xl">můžeš vyzkoušet ty divný cviky, cos viděl na tiktoku</p>
            </div>
            <div
                className={cn(
                    "flex flex-wrap flex-row lg:flex-row-reverse gap-2 lg:gap-6 items-center max-w-5xl mx-auto lg:-mt-40 mb-8 lg:mb-0",
                    debug && "outline outline-blue-500"
                )}>
                <div className="max-w-xs">
                    <Video src="/videos/yap.mp4" />
                </div>
                <p className="font-semibold text-2xl lg:ml-80">yappin n workin hard</p>
            </div>
            <div
                className={cn(
                    "flex flex-wrap flex-row gap-2 lg:gap-10 items-center max-w-5xl mx-auto lg:-mt-42 mb-8 lg:mb-0",
                    debug && "outline outline-blue-500"
                )}>
                <div className="max-w-xs lg:ml-20">
                    <Video src="/videos/2.mp4" />
                </div>
                <p className="font-semibold text-2xl">vždy jseš zde sám/sama nebo s kámošema</p>
            </div>
            <div
                className={cn(
                    "flex flex-wrap flex-row lg:flex-row-reverse gap-2 lg:gap-6 items-center max-w-5xl mx-auto lg:-mt-50 mb-8 lg:mb-0",
                    debug && "outline outline-blue-500"
                )}>
                <div className="max-w-xs">
                    <Video src="/videos/3.webm" />
                </div>
                <p className="font-semibold text-2xl lg:ml-60 lg:mt-20">nikdy nečekáš na stroj</p>
            </div>
            <div className={cn("flex flex-col items-start max-w-5xl mx-auto ", debug && "outline outline-blue-500")}>
                <p className="font-semibold text-2xl mt-10">levnější než klasický fitko</p>
                <p className="">to je trochu clickbait, ale když přijdete ve třech, má to každej za sto!</p>
                <p className="">a ve vyhrazených časech je cena i nižší</p>
            </div>
        </div>
    )
}

const Video = (props: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useGSAP(
        () => {
            if (!videoRef.current) return

            ScrollTrigger.create({
                trigger: videoRef.current,
                start: "top bottom",
                onEnter: () => {
                    void videoRef.current?.play()
                },
                onEnterBack: () => {
                    void videoRef.current?.play()
                },
                onLeave: () => {
                    videoRef.current?.pause()
                },
                onLeaveBack: () => {
                    videoRef.current?.pause()
                },
            })
        },
        { scope: videoRef }
    )

    return (
        <div className="max-h-[460px] lg:max-h-[480px] overflow-y-hidden flex items-end justify-center -mx-4">
            <video
                ref={videoRef}
                src={props.src}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                className="w-full h-auto"
            />
        </div>
    )
}

export default Videos
