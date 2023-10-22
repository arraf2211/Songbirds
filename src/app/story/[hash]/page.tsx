"use client"
import { Story } from "@/lib/interfaces"
import { Slider } from "@/components/ui/slider2"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect } from "react"
import Link from "next/link"
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { StacksMocknet, StacksTestnet } from "@stacks/network";
import { stringUtf8CV } from "@stacks/transactions";
import FundButton from "@/components/FundButton"
import { WalletContext } from "@/lib/useWalletContext"


export default function StoryDetailsPage({ params }: { params: { hash: string } }) {
  const { stories } = useContext(WalletContext)

  const story: Story = stories.find(v => v.hash === params.hash)!

  const slidePercentage = (Number(BigInt(100) * story.currentFunds / story.requiredFunds))

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-1/2 py-16 flex flex-col gap-5 overflow-scroll no-scrollbar">
        <p className="text-white text-3xl text-center mb-10">
          {story.title}
        </p>
        <div className="flex items-center gap-2">
          hash: 
          <div className="bg-slate-900 rounded-full px-2 py-1 text-sm">
            {story.hash} 
          </div>
        </div>
        <div className="flex items-center gap-2">
          author: 
          <div className="bg-slate-900 rounded-full px-2 py-1 text-sm">
            {story.owner} 
          </div>
        </div>
        <p className="italic text-zinc-300">
          {story.description}
        </p>
        <div className="p-4 rounded-lg bg-accent1 border border-accent1 bg-opacity-20 backdrop-blur-lg">
          <p className="text-accent1 text-sm">
            The reliability of this story is calculated to be <b>{story.likes}</b>, a score determined by the author's reputation and the
            cumulative judgement of our community. { !story.released && "After this story is released to the public, the reliability will score will be recalculated following real world reflection" }
          </p>
        </div>
        <div className="text-zinc-400 relative rounded-xl p-4">
          {
            !story.released && 
              <div className="absolute rounded-xl flex flex-col gap-2 items-center justify-center border-zinc-400 border w-full h-full left-0 top-0 bg-zinc-400 bg-opacity-25 backdrop-blur-sm">
                <Image src="/icons/lock.svg" height={30} width={30} alt="lock"/>
                <p className="text-zinc-200 text-sm font-light">Fund this story so it can be released publicly</p>
                <div className="text-black">
                  <FundButton/>
                </div>
              </div>
          }
          { !story.released &&
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit nibh non accumsan eleifend. Donec commodo accumsan nisi quis scelerisque. Sed sed luctus quam. Nulla magna nunc, pharetra quis massa quis, tincidunt eleifend turpis. Nunc posuere ut erat vel commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In ut urna laoreet libero placerat efficitur. Vestibulum sit amet dolor ante. Nulla hendrerit suscipit arcu at sagittis.
              <br/>
              <br/>
              Donec luctus volutpat nibh. Suspendisse sit amet nulla finibus, lobortis tellus id, hendrerit ante. Aliquam ac sem libero. Quisque fermentum turpis eget tincidunt viverra. Duis et urna in augue placerat finibus. Praesent finibus ullamcorper ante, dignissim rutrum neque tincidunt sit amet. Vivamus vestibulum ultrices eros ut elementum. Suspendisse eu risus tempor neque congue convallis in sed urna. Vivamus non pellentesque orci. Nam rutrum et sapien eu luctus. Aliquam sit amet malesuada ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Donec luctus volutpat nibh. Suspendisse sit amet nulla finibus, lobortis tellus id, hendrerit ante. Aliquam ac sem libero. Quisque fermentum turpis eget tincidunt viverra. Duis et urna in augue placerat finibus. Praesent finibus ullamcorper ante, dignissim rutrum neque tincidunt sit amet. Vivamus vestibulum ultrices eros ut elementum. Suspendisse eu risus tempor neque congue convallis in sed urna. Vivamus non pellentesque orci. Nam rutrum et sapien eu luctus. Aliquam sit amet malesuada ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              <br/>
              <br/>
              
              Donec luctus volutpat nibh. Suspendisse sit amet nulla finibus, lobortis tellus id, hendrerit ante. Aliquam ac sem libero. Quisque fermentum turpis eget tincidunt viverra. Duis et urna in augue placerat finibus. Praesent finibus ullamcorper ante, dignissim rutrum neque tincidunt sit amet. Vivamus vestibulum ultrices eros ut elementum. Suspendisse eu risus tempor neque congue convallis in sed urna. Vivamus non pellentesque orci. Nam rutrum et sapien eu luctus. Aliquam sit amet malesuada ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </div>
          }
        </div>
        <div className="flex w-full gap-4">
          <p className="text-xs w-[10rem] text-center">Funding Progress {story.currentFunds.toString()} / {story.requiredFunds.toString()}</p>
          <Slider
            defaultValue={[slidePercentage]}
            max={100}
            step={1}
            className={"pointer-events-none w-full"}
          />
        </div>
        <Link href="/feed" className="text-center">Return to feed</Link>
      </div>
    </div>
  )
}