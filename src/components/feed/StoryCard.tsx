"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Story } from "@/lib/interfaces"
import Image from "next/image"
import { Slider } from "../ui/slider2"


import { Tooltip as ReactTooltip } from "react-tooltip"
import { useRouter } from "next/navigation"

export default function StoryCard({ story }: { story: Story }) {
  const router = useRouter()
  const slidePercentage = (Number(BigInt(100) * story.currentFunds / story.requiredFunds))
  return (
    <Card className="bg-[#0e0e0e] w-full border border-zinc-800 bg-opacity-50 backdrop-blur-lg text-zinc-700">
      <CardHeader>
        <CardTitle className="text-zinc-50">{story.title}</CardTitle>
        <CardDescription className="text-zinc-500 text-sm">
          <div className="text-xs text-zinc-600 flex gap-2 items-center">
            <p className="text-zinc-300">hash</p>
            <div className="bg-slate-900 rounded-full px-2 py-1">
              {story.hash} 
            </div>
            <p className="text-zinc-300">author</p>
            <div className="bg-slate-900 rounded-full px-2 py-1">
              {story.owner}
            </div>
          </div>
          <br/>
          {story.description}<span className="cursor-pointer text-white ml-1">Read More</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          story.released
          ? <div
            className="flex gap-2 p-4 items-center justify-center rounded-md bg-accent2 text-accent2 font-light text-sm border border-accent2 bg-opacity-10 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            onClick={() => router.push(`/story/${story.hash}`)}
            >
              This story has been released publically
            </div>
          : <div 
              className="flex gap-2 p-4 items-center justify-center rounded-md bg-zinc-200 bg-opacity-10 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              onClick={() => router.push(`/story/${story.hash}`)}
            >
                <Image src="/icons/lock.svg" width={20} height={20} alt="lock" className=""/>
                <p className={`text-white font-light text-sm`}>
                  Fund this story to reveal it publicly
                </p>
            </div>
        }
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 w-full">
          <Slider
            defaultValue={[slidePercentage]}
            max={100}
            step={1}
            className={"pointer-events-none grow"}
          />
          <p className="text-xs text-slate-50 w-[10rem] text-center">
            Funded <br/> {story.currentFunds.toString()} / {story.requiredFunds.toString()}
          </p>
          <div data-tooltip-id="reliability-score" className="bg-zinc-400 border border-zinc-400 bg-opacity-25 text-zinc-200 text-xs rounded p-2 text-center cursor-pointer">
            Reliability {story.likes}
          </div>
        </div>
      </CardFooter>
      <ReactTooltip id="reliability-score" className="text-sm bg-opacity-25 backdrop-blur-sm bg-black" style={{ opacity: 0.5 }} place="bottom">
        <p className="text-xs">
          This score is calculated by the reliability of the <br/> author and people who funded this story
        </p>
      </ReactTooltip>
    </Card>
  )
}