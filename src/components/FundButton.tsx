"use client"

import { WalletContext } from "@/lib/useWalletContext"
import { useContext, useState } from "react"
import ConnectButton from "./ConnectButton"
import { Button } from "./ui/button"
import { Story } from "@/lib/interfaces"
import { Input } from "./ui/input"

export default function FundButton({story}: {story: Story}) {
  const { isConnected, fund } = useContext(WalletContext)
  const [amount, setAmount] = useState(0)
  
  return (
    isConnected 
    ? <div className="flex gap-2">
      <Button variant="outline" onClick={() => fund(story, amount)}>
          Fund
      </Button>
      <Input className="border-0 outline-none focus:outline-none focus:border-0" type="number" onChange={e => setAmount(parseInt(e.target.value))} placeholder="Amount"></Input>
    </div> 
    : <ConnectButton/>
  )
}