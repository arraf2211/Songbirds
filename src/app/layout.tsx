"use client"
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import ConnectButton from '@/components/ConnectButton'
import { WalletContext, useWalletContext } from '@/lib/useWalletContext'

const inter = Space_Grotesk({ weight: ["400", "500", "600", "700"], subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const context = useWalletContext()
  return (
    <WalletContext.Provider value={context}>
      <html lang="en" className='h-full w-full'>
        <body className={`${inter.className} h-full w-full`}>
          <div className="absolute top-0 right-0 p-4 z-[200]">
            <ConnectButton/>
          </div>
            <div className='h-full w-full bg-black text-white'>
              {children}
            </div>
        </body>
      </html>
    </WalletContext.Provider>
  )
}
