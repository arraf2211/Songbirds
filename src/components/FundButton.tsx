"use client"

import { WalletContext } from "@/lib/useWalletContext"
import { useContext } from "react"
import ConnectButton from "./ConnectButton"
import { Button } from "./ui/button"

export default function FundButton() {
  const { isConnected } = useContext(WalletContext)
  return (
    isConnected 
    ? <Button variant="outline">
        Fund
      </Button>
    : <ConnectButton/>
  )
}