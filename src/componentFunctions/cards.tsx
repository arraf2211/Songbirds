import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Parallax } from 'react-scroll-parallax';



export function Cards() {
    return (
    <div className="space-x-5 flex flex-row items-center justify-center h-[600px]">
        <Card className="w-[350px] h-[250px] ml-5 bg-white ">
            <CardHeader>
            <CardTitle> Trending Information </CardTitle>
            <CardDescription>Discover the insights that matter most and gain a fresh perspective on what's happening around the world. </CardDescription>
            </CardHeader>
            <CardContent>
            
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button className="">View</Button>
            </CardFooter>
        </Card>

        <Card className="w-[350px] h-[250px]  ml-5">
            <CardHeader className="h-[150px]">
            <CardTitle>Speak your Truth</CardTitle>
            <CardDescription>Create a new Post for others to view</CardDescription>
            </CardHeader>
            <CardContent>
            
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button>Post</Button>
            </CardFooter>
        </Card>

        <Card className="w-[350px] h-[250px]  ml-5">
            <CardHeader className="h-[150px]">
            <CardTitle>View Something</CardTitle>
            <CardDescription>Whether you're a data enthusiast, a curious mind, or a decision-maker, 
                our trending data section is your window to real-time knowledge. </CardDescription>
            </CardHeader>
            <CardContent>
            
            </CardContent>
            <CardFooter className="flex justify-center ">
            <Button>Deploy</Button>
            </CardFooter>
        </Card>

    </div>

    )
  }