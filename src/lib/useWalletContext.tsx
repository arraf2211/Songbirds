import { AppConfig, UserSession, openContractCall, showConnect } from "@stacks/connect";
import { createContext, useEffect, useState } from "react";
import { Story } from "./interfaces";

import { StacksMocknet, StacksTestnet } from "@stacks/network";
import { stringUtf8CV, hexToCV, ListCV, ClarityValue, StringUtf8CV, cvToHex, ClarityType  } from "@stacks/transactions";
import axios, { HttpStatusCode } from "axios";

const contractAddress = "ST547VD9N1PRY9DHE9QBW7BFMAXK56AX36T48X3S"
const contractName = "crowdfunded-messages"
const sender = `${contractAddress}.${contractName}`

interface WalletContext {
  isLoading: boolean;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  getStory: (name: string) => Promise<Story | null>;
  stories: Story[]
}

export const WalletContext = createContext<WalletContext>({
  isLoading: false,
  isConnected: false,
  connectWallet: () => {},
  disconnectWallet: () => {},
  getStory: async () => null,
  stories: []
})

export const appDetails = {
  name: "OurApp",
  icon: "https://freesvg.org/img/1541103084.png",
};

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig })

export const stacksAxios = axios.create({
  baseURL: `/stacks/contracts/call-read/${contractAddress}/${contractName}/`,
  validateStatus: () => true
})

export function useWalletContext(): WalletContext {
  const [isLoading, setLoading] = useState(false)
  const [isConnected, setConnected] = useState(false)
  const [stories, setStories] = useState<Story[]>([])

  async function connectWallet() {
    setLoading(true)
    showConnect({
      appDetails,
      userSession,
      onFinish: (payload) => {
        setConnected(true)
        setLoading(false)
      },
    });
  }

  async function disconnectWallet() {
    userSession.signUserOut(window.location.href)
  }

  async function getStory(name: string): Promise<Story | null> {
    const res = await stacksAxios.post("/get-message", {
      sender, arguments: [cvToHex(stringUtf8CV(name))]
    })

    if (res.status !== HttpStatusCode.Ok) {
      return null
    }

    const storyRaw = (hexToCV(res.data.result) as any).value.data
    
    const story: Story = {
      title: name,
      hash: new TextDecoder().decode(storyRaw["hash"].buffer),
      likes: (storyRaw["likes"].list as never[]).length,
      description: "",
      currentFunds: storyRaw["current-funds"].value as bigint,
      requiredFunds: storyRaw["required-funds"].value as bigint,
      owner: storyRaw["owner"].address.hash160 as string,
      released: storyRaw["revealed"].type === ClarityType.BoolTrue,
    }

    return story
  }

  async function loadStories() {
    setStories([])
    const res = await stacksAxios.post("/get-message-titles", {
      sender, arguments: []
    })

    if (res.status !== HttpStatusCode.Ok) {
      console.error("Failed to fetch stories!")
      return
    }

    const storyNames: string[] = (hexToCV(res.data.result) as any).value.list.map((v: StringUtf8CV) => v.data)


    const allStories = await Promise.all(storyNames.map(async (name) => await getStory(name)).filter(v => v !== null))
    console.log(allStories)
    setStories(allStories.filter(v => v != null) as Story[])
  }

  useEffect(() => {
    loadStories()
    setConnected(
      userSession.isUserSignedIn()
    )
  }, [])

  return {
    stories,
    isLoading,
    isConnected,
    connectWallet,
    disconnectWallet,
    getStory
  }
}