"use client"

import { useContext, useState } from "react";
import { Button } from "./ui/button";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { WalletContext } from "@/lib/useWalletContext";
import { PulseLoader } from "react-spinners"

export default function ConnectButton() {
  const { isConnected, isLoading, connectWallet, disconnectWallet } = useContext(WalletContext)

  return (
    <Button variant="outline" onClick={() => isConnected ? disconnectWallet() : connectWallet()}>
      { isLoading
       ? <PulseLoader color="#000" size={12}/>
       : (isConnected ? "Disconnect" : "Connect")
      }
    </Button>
  )
}