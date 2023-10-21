import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { motion, useInView, useAnimation } from 'framer-motion';

export function HeroSection() {
  return (
    <div className="text-center flex  items-center justify-center h-screen">
        
            <img src="/karimdrip.jpg" className=" h-fit  ml-32 -mr-10  rounded-r-full z-30 object-cover "></img>
            <div className="items-center justify-center z-40 space-y-16">
                <h1 className="items-center justify-center font-bold text-9xl -ml-10 z-40">
                    Giving a Voice to the Voiceless
                    
                </h1>
                <h2 className="text-2xl text-center tracking-wide mr-3 px-32">
                    By leveraging blockchain's immutable ledger, we empower individuals and 
                    communities to address issues like corruption, poverty, and inequality. 
                </h2>
            </div>
            
            
    </div>
  )
}
