import * as React from "react";
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
import Link from "next/link"




export function Cards() {
    return (
    <div className="space-x-10 flex flex-row items-center justify-center h-[600px]">
        <Card className="w-[350px] h-[250px] ml-10 bg-white shadow-accent1 shadow-xl">
            <CardHeader>
            <CardTitle> Trending Information </CardTitle>
            <CardDescription>Discover the insights that matter most and gain a fresh perspective on what's happening around the world. </CardDescription>
            </CardHeader>
            <CardContent>
            
            </CardContent>
            <Link href="/feed" legacyBehavior passHref>
                <CardFooter className="flex justify-center">
                <Button className="">Feed</Button>
                </CardFooter>
            </Link>
            
        </Card>

        <Card className="w-[350px] h-[250px]  ml-10 shadow-accent1 shadow-xl">
            <CardHeader className="h-[150px]">
            <CardTitle>Speak your Truth</CardTitle>
            <CardDescription>Create a new Post for others to view</CardDescription>
            </CardHeader>
            <CardContent>
            
            </CardContent>
            <Link href="/submit" legacyBehavior passHref>
                <CardFooter className="flex justify-center">
                <Button className="">Post</Button>
                </CardFooter>
            </Link>
        </Card>

        <Card className="w-[350px] h-[250px]  ml-10 shadow-accent1 shadow-xl">
            <CardHeader className="h-[150px]">
            <CardTitle>View </CardTitle>
            <CardDescription>Whether you're a data enthusiast, a curious mind, or a decision-maker, 
                our trending data section is your window to real-time knowledge. </CardDescription>
            </CardHeader>
            <CardContent>
            
            </CardContent>
            <Link href="/feed" legacyBehavior passHref>
                <CardFooter className="flex justify-center">
                <Button className="">View</Button>
                </CardFooter>
            </Link>
        </Card>

      {/* <Card className="w-[350px] h-[310px] ml-5 bg-white">
        <CardHeader>
          <CardTitle>Build Your Reputation</CardTitle>
          <CardDescription className="pt-4">
          Build a strong reputation by consistently sharing accurate and valuable data. A higher reputation allows you to price your content higher, gain more rewards. Become a respected contributor!
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-center">
          <Button>Grow Reputation</Button>
        </CardFooter>
      </Card> */}
    </div>
  );
}
