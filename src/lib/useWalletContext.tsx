import { AppConfig, ContractCallOptions, UserSession, openContractCall, showConnect } from "@stacks/connect";
import { createContext, useEffect, useState } from "react";
import { Story } from "./interfaces";

import { StacksMocknet, StacksTestnet } from "@stacks/network";
import { stringUtf8CV, intCV, uintCV, hexToCV, bufferCV, ListCV, ClarityValue, StringUtf8CV, cvToHex, ClarityType } from "@stacks/transactions";
import axios, { HttpStatusCode } from "axios";

const contractAddress = "ST547VD9N1PRY9DHE9QBW7BFMAXK56AX36T48X3S"
const contractName = "crowdfunded-messages"
const sender = `${contractAddress}.${contractName}`

interface WalletContext {
  isLoading: boolean;
  isConnected: boolean;
  txLoading: boolean;
  stories: Story[];
  connectWallet: () => void;
  disconnectWallet: () => void;
  getStory: (name: string) => Promise<Story | null>;
  postMessage: (title: string, requiredFunds: number, hash: Uint8Array) => void;
  fund: (story: Story, amount: number) => void;
  like: (story: Story) => void;
}

export const WalletContext = createContext<WalletContext>({
  isLoading: false,
  isConnected: false,
  txLoading: false,
  stories: [],
  connectWallet: () => { },
  disconnectWallet: () => { },
  getStory: async () => null,
  postMessage: () => { },
  fund: () => { },
  like: () => { },
})

export const appDetails = {
  name: "Songbird",
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
  const [txLoading, setTxLoading] = useState(false)
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

    console.log(storyRaw)

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

  async function fund(story: Story, amount: number) {
    setTxLoading(true)

    const options: ContractCallOptions = {
      contractAddress,
      contractName,
      functionName: "fund-message",
      functionArgs: [(stringUtf8CV(story.title)), uintCV(amount)],
      onFinish: (payload) => {
        console.log(`Tx = ${payload.txId}`)
        setTxLoading(false)
      }
    }

    await openContractCall(options)
  }

  async function postMessage(title: string, requiredFunds: number, hash: Uint8Array) {
    setTxLoading(true)

    const options: ContractCallOptions = {
      contractAddress,
      contractName,
      functionName: "post-message",
      functionArgs: [(stringUtf8CV(title)), (uintCV(requiredFunds)), (bufferCV(hash))],
      onFinish: (payload) => {
        console.log(`Tx = ${payload.txId}`)
        setTxLoading(false)
      }
    }

    await openContractCall(options)
  }

  async function like(story: Story) {
    setTxLoading(true)

    const options: ContractCallOptions = {
      contractAddress,
      contractName,
      functionName: "like-message",
      functionArgs: [(stringUtf8CV(story.title)),],
      onFinish: (payload) => {
        console.log(`Tx = ${payload.txId}`)
        setTxLoading(false)
      }
    }

    await openContractCall(options)
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
    txLoading,
    isConnected,
    connectWallet,
    disconnectWallet,
    getStory,
    postMessage,
    fund,
    like
  }
}