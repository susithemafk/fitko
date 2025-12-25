"use client"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export const AnimatedText = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0)
    const containerRef = useRef<HTMLSpanElement>(null)

    useGSAP(
        () => {
            const spans = containerRef.current?.querySelectorAll(".word-span")
            if (!spans || spans.length < 2) return

            const outgoing = spans[0]!
            const incoming = spans[1]!

            const tl = gsap.timeline({
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % words.length)
                },
            })

            // Start the transition after 3 seconds
            tl.to(
                outgoing,
                {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                    ease: "power1.inOut",
                },
                "+=3"
            )

            // Start incoming animation 0.3s BEFORE outgoing finishes
            tl.fromTo(
                incoming,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power1.out",
                },
                "-=0.3"
            )
        },
        { scope: containerRef, dependencies: [index] }
    )

    const nextIndex = (index + 1) % words.length

    return (
        <span ref={containerRef} className="inline-grid align-bottom">
            {/* Current word (animating out) */}
            <span
                key={`out-${index}`}
                className="word-span col-start-1 row-start-1 inline-block font-serif font-bold italic text-5xl sm:text-5xl md:text-7xl lg:text-9xl">
                {words[index]}
            </span>
            {/* Next word (animating in) */}
            <span
                key={`in-${nextIndex}`}
                className="word-span col-start-1 row-start-1 inline-block font-serif font-bold italic text-5xl sm:text-5xl md:text-7xl lg:text-9xl opacity-0">
                {words[nextIndex]}
            </span>
        </span>
    )
}
