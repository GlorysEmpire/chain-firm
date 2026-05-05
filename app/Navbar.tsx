'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
    const [connected, setConnected] = useState(false)
    const [address, setAddress] = useState('')

    async function connectWallet() {
        if (typeof (window as any).ethereum !== 'undefined') {
            try {
                const accounts = await (window as any).ethereum.request({
                    method: 'eth_requestAccounts'
                })
                setAddress(accounts[0])
                setConnected(true)
            } catch (error) {
                console.log('User rejected connection')
            }
        } else {
            alert('Please install MetaMask to connect your wallet. Visit metamask.io')
        }
    }

    function shortAddress(addr: string) {
        return addr.slice(0, 6) + '...' + addr.slice(-4)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-black">

            <div className="text-white font-bold text-xl">
                ChainFirm
            </div>

            <div className="flex gap-8">
                <Link href="/" className="text-gray-400 hover:text-white transition">
                    Home
                </Link>
                <Link href="/trader" className="text-gray-400 hover:text-white transition">
                    Traders
                </Link>
                <Link href="/investor" className="text-gray-400 hover:text-white transition">
                    Investors
                </Link>
            </div>

            <button
                onClick={connectWallet}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${connected
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white text-black hover:bg-gray-200'
                    }`}
            >
                {connected ? shortAddress(address) : 'Connect Wallet'}
            </button>

        </nav>
    )
}