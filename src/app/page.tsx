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

export default function Home() {
  return (
    <div className='space-y-10'>
      <NavBar/>
      <HeroSection/>
    </div>
    
  )
}
