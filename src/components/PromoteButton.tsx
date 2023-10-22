import { Story } from "@/lib/interfaces"
import ConnectButton from "./ConnectButton"
import { Button } from "./ui/button"
import { useContext } from "react"
import { WalletContext } from "@/lib/useWalletContext"
import { Tooltip } from "react-tooltip"

export default function PromoteButton({story}: {story: Story}) {
  const { isConnected, like } = useContext(WalletContext)
  return (
    <div className="text-black">
      {isConnected 
      ? <Button 
          variant="outline" 
          onClick={() => like(story)}
          data-tooltip-id="promote-button"
        >
          Promote
        </Button>
      : <ConnectButton/>}
      <Tooltip id="promote-button">
        Promote this story to provide it validity and reliability
      </Tooltip>
    </div>
  )
}