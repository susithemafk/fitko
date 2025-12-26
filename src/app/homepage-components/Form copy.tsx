"use client"

import { useForm } from "react-hook-form"
import { Form as UIForm, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"
import { formSchema, type FormSchemaPrivateOrPublic, type FormSchemaValues } from "~/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import type z from "zod"
import { Button } from "~/components/ui/button"
import Image from "next/image"
import { Slider } from "~/components/ui/slider"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ChevronLeft } from "lucide-react"
import { Input } from "~/components/ui/input"
import { api } from "~/trpc/react"

gsap.registerPlugin(ScrollToPlugin)

const machines = [
    { id: "legpress", label: "leg press", image: "/form-images/legpress.jpg" },
    { id: "stairs", label: "schody", image: "/form-images/legpress.jpg" },
    { id: "benchpress", label: "bench press", image: "/form-images/legpress.jpg" },
] as const

const Form = () => {
    const defaultValues: FormSchemaValues = {
        privateOrPublic: [],
        legpress: 30,
        stairs: 30,
        benchpress: 30,
        email: "",
    }

    const form = useForm<FormSchemaValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    useEffect(() => {
        form.reset(defaultValues)
    }, [form.reset])

    const submitSurvey = api.survey.submit.useMutation({
        onSuccess: () => {
            console.log("Survey submitted successfully")
            setIsFinished(false)
            form.reset(defaultValues)
            setCurrentMachineIndex(0)
            // You could add a redirect or a success state here
        },
        onError: (error) => {
            console.error("Error submitting survey:", error)
            if (error.data?.code === "CONFLICT") {
                form.setError("email", {
                    type: "manual",
                    message: error.message,
                })
            }
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form data:", data)
        submitSurvey.mutate(data)
    }

    const [privateOrPublicFieldHasChanged, setPrivateOrPublicFieldHasChanged] = useState<boolean>(false)
    const [currentMachineIndex, setCurrentMachineIndex] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    const onSliderDragEnd = (value: number[]) => {
        console.log("Slider drag ended with value:", value)
        if (currentMachineIndex < machines.length - 1) {
            setCurrentMachineIndex((prev) => prev + 1)
        } else {
            setIsFinished(true)
        }
    }

    useEffect(() => {
        if (isFinished) setTimeout(() => scrollBy({ top: 400, behavior: "smooth" }), 250)
    }, [isFinished])

    const goBack = () => {
        if (isFinished) {
            setIsFinished(false)
        } else if (currentMachineIndex > 0) {
            setCurrentMachineIndex((prev) => prev - 1)
        }
    }

    const currentMachine = machines[currentMachineIndex]!

    const machineContainerRef = useRef<HTMLDivElement>(null)
    const sliderContainerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    useGSAP(() => {
        if (machineContainerRef.current) {
            gsap.fromTo(
                machineContainerRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
            )
        }

        if (sliderContainerRef.current) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
            timelineRef.current = tl

            tl.to(sliderContainerRef.current, {
                scale: 1.05,
                rotation: -6,
                duration: 0.25,
                ease: "power2.out",
            }).to(sliderContainerRef.current, {
                scale: 1,
                rotation: -8,
                duration: 0.25,
                ease: "power2.in",
            })
        }
    }, [currentMachineIndex])

    return (
        <UIForm {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-row gap-6 items-center max-w-5xl mx-auto justify-center outline outline-yellow-500">
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold mb-4">cvičíš radši v soukromí nebo ve fitku?</p>

                    <div className="flex gap-6 mb-12 -ml-32">
                        <FormField
                            control={form.control}
                            name="privateOrPublic"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Varianta pokoje</FormLabel> */}
                                    <FormControl>
                                        <ToggleGroup
                                            type="multiple"
                                            variant="outline"
                                            className=""
                                            size="xl"
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                if (!privateOrPublicFieldHasChanged && value.length > 0) {
                                                    setPrivateOrPublicFieldHasChanged(true)
                                                    const scrollTarget = window.scrollY + 400
                                                    gsap.to(window, {
                                                        scrollTo: scrollTarget,
                                                        duration: 1.5,
                                                        ease: "power2.inOut",
                                                    })
                                                }
                                            }}>
                                            <ToggleGroupItem
                                                value={"private" satisfies FormSchemaPrivateOrPublic}
                                                aria-label="private"
                                                className="data-[state=on]:bg-primary data-[state=on]:text-white">
                                                private
                                            </ToggleGroupItem>
                                            <ToggleGroupItem
                                                value={"public" satisfies FormSchemaPrivateOrPublic}
                                                aria-label="public"
                                                className="data-[state=on]:bg-primary data-[state=on]:text-white">
                                                public
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M58.8717 1.71016C58.4351 0.400305 57.0193 -0.307595 55.7094 0.129024C54.3996 0.565644 53.6917 1.98144 54.1283 3.2913L56.5 2.50073L58.8717 1.71016ZM0.905465 53.5753C-0.157946 54.4559 -0.306113 56.0319 0.574524 57.0953L14.9253 74.4246C15.806 75.488 17.3819 75.6361 18.4453 74.7555C19.5088 73.8749 19.6569 72.2989 18.7763 71.2355L6.02001 55.8317L21.4238 43.0754C22.4872 42.1948 22.6354 40.6188 21.7548 39.5554C20.8741 38.492 19.2982 38.3438 18.2348 39.2244L0.905465 53.5753ZM56.5 2.50073L54.1283 3.2913C59.3388 18.9229 60.0768 32.4401 53.375 41.3757C46.7124 50.2592 31.8185 55.7461 2.73401 53.0117L2.5 55.5007L2.26599 57.9898C31.6815 60.7553 49.0376 55.4923 57.375 44.3757C65.6732 33.3114 64.1612 17.5786 58.8717 1.71016L56.5 2.50073Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <div className="mb-16">
                        <p className="text-2xl font-semibold">
                            přemýšlíme nad vybavením posilovny,
                            <br />
                            pojď nám s tím pomoct!
                        </p>
                        <p className="text-end">sleva na pár vstupů za to?</p>
                    </div>

                    <div ref={machineContainerRef} className="mb-30">
                        <div className="flex items-center justify-center relative mb-4">
                            {(currentMachineIndex > 0 || isFinished) && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-0"
                                    onClick={goBack}>
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                            )}
                            <p className="text-2xl font-semibold text-center">jak moc bys využil/a?</p>
                        </div>

                        <div className="max-w-xl relative">
                            <Image
                                src={currentMachine.image}
                                alt={currentMachine.id}
                                width={512}
                                height={512}
                                className="rounded-lg mb-4 w-full"
                            />

                            <div
                                ref={sliderContainerRef}
                                onMouseEnter={() => timelineRef.current?.pause()}
                                onMouseLeave={() => timelineRef.current?.play()}
                                onPointerDown={() => timelineRef.current?.pause()}
                                className="w-46 lg:w-64 px-4 py-5 bg-white rounded-full absolute bottom-8 right-8 -rotate-8">
                                <FormField
                                    control={form.control}
                                    name={currentMachine.id}
                                    render={({ field: { value, onChange } }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    step={1}
                                                    value={[value ?? 0]}
                                                    onValueChange={(vals) => onChange(vals[0])}
                                                    onValueCommit={onSliderDragEnd}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <p className="text-2xl font-semibold mb-4 text-center">{currentMachine.label}</p>
                    </div>

                    {isFinished && (
                        <div className="flex flex-col items-center gap-4 mt-8">
                            <p className="text-2xl font-semibold">
                                moc díky za vyplnění, <br />
                                kam ti můžeme poslat slevu?
                            </p>

                            <div className="flex w-full max-w-sm items-start gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input type="email" placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    variant="link"
                                    size="icon"
                                    disabled={submitSurvey.isPending}
                                    className="cursor-pointer hover:scale-110">
                                    <Image
                                        src="/icons/emojis/letter.png"
                                        alt="hearts"
                                        width={128}
                                        height={128}
                                        className={submitSurvey.isPending ? "opacity-50" : ""}
                                    />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </UIForm>
    )
}

export default Form
