import Image from "next/image"


import { AspectRatio } from "@/components/ui/aspect-ratio"

export function HeroSection() {
  return (
    <div className="text-center flex  items-center justify-center">
        <img src="/karimdrip.jpg" className="ml-20 mt-20 rounded-r-full z-30"></img>
        <h1 className="items-center justify-center font-bold text-7xl z-40">
            Giving a Voice to the Voice Less
            <h2 className="text-5xl ">
            Spill the tea 
            </h2>
        </h1>
        
        
    </div>
  )
}
