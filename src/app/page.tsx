import Image from 'next/image'
import * as React from "react"
import Link from "next/link"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { NavBar } from '@/componentFunctions/navBar'
import { HeroSection } from '@/componentFunctions/heroSection'
import { Main } from 'next/document'
import { Cards } from '@/componentFunctions/cards'
import { TableData } from '@/componentFunctions/tableOfData'
import { Parallax } from 'react-scroll-parallax'


export default function Home() {
  return (
    <div className='bg-black'>
      <NavBar/>
      <HeroSection/>
      <Cards/>
      
    </div>
    
  )
}
