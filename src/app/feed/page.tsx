"use client"
import StoryCard from "@/components/feed/StoryCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Story } from "@/lib/interfaces"
import { WalletContext } from "@/lib/useWalletContext"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export default function StoryFeedPage() {
  const { stories } = useContext(WalletContext)

  const router = useRouter()

  return (
    <div className="h-full">
      <div className="flex w-full h-full p-4 justify-center px-14">
        
        <div className="w-1/3 h-full py-5 px-2 flex flex-col gap-8">
          <p className="text-3xl">Songbirds</p>
          <p className="text-xl italic text-zinc-300">Uphold honesty and integrity by spreading truth in the fight against misinformation</p>

          <Card className="bg-[#0e0e0e] border border-zinc-800 bg-opacity-50 backdrop-blur-lg text-zinc-700">
            <CardContent className="p-4 flex flex-col gap-4 items-center">
              <p className="text-zinc-600">
                Contribute to our cause by anonomously posting the truth, share your voice using our platform
              </p>
              <Button variant="ghost" onClick={() => router.push("/submit")}>Publish</Button>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <p className="text-right text-zinc-50">Trending Stories</p>
            <div className="flex flex-col gap-4 overflow-scroll no-scrollbar">
              {
                stories.sort((a, b) => a.likes - b.likes).map(
                  (story, i) => (
                    <div 
                      key={i} 
                      onClick={() => router.push(`/story/${story.hash}`)}
                      className="flex gap-2 cursor-pointer w-full justify-between items-center bg-[#0e0e0e] border border-zinc-800 bg-opacity-50 backdrop-blur-lg text-zinc-700 rounded-lg px-2 py-1 transition-all duration-200 hover:scale-95 hover:brightness-150"
                    >
                      <div className="flex flex-col">  
                        <p className="text-sm text-zinc-600">
                          {story.title}
                        </p>
                        <p className="text-xs">
                          {story.owner}
                        </p>
                      </div>
                      <div>
                        {story.likes}
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>

        </div>

        <div className="w-2/3 h-full px-24 py-8 flex flex-col gap-4">
          <p className="text-xl font-bold text-zinc-50">Story Feed</p>
          <div className="grow flex flex-col items-center gap-8 overflow-scroll no-scrollbar">
           { stories.map((story, i) => (
              <>
                <StoryCard key={i} story={story}/>
                {(i !== stories.length - 1) && <Image src="/icons/chain-link.svg" alt="link" width={20} height={20}/>}
              </>
            )) } 
          </div>
          
        </div>

      </div>
    </div>
  )
}