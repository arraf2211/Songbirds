import Image from "next/image"


import { AspectRatio } from "@/components/ui/aspect-ratio"

export function HeroSection() {
  return (
    <div className="flex-row-reverse items-center justify-center text-center">
        <h1 className="items-center justify-center font-bold text-7xl mt-20">
            Giving a Voice to the Voice Less
        </h1>
        <h2 className="text-5xl">
            Spill the tea 
        </h2>
        <img src="/karimdrip.jpg" className="ml-20 -mt-20"></img>
    </div>
  )
}
