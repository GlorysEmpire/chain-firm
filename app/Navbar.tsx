'use client'

import Link from 'next/link'
import { useWallet } from './WalletContext'
import { useState } from 'react'

export default function Navbar() {
    const { connected, walletAddress, connectWallet, disconnectWallet } = useWallet()
    const [showDisconnectMessage, setShowDisconnectMessage] = useState(false)

    function shortAddress(addr: string) {
        return addr.slice(0, 6) + '...' + addr.slice(-4)
    }

    function handleDisconnect() {
        disconnectWallet()
        setShowDisconnectMessage(true)
        setTimeout(() => setShowDisconnectMessage(false), 8000)
    }

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-black">

                <div className="text-white font-bold text-xl">
                    Glofi
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
                    <Link href="/governance" className="text-gray-400 hover:text-white transition">
                        Governance
                    </Link>
                    {connected && (
                        <Link href="/dashboard" className="text-green-400 hover:text-green-300 transition font-semibold">
                            Dashboard
                        </Link>
                    )}
                </div>

                {connected ? (
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-green-400 text-sm font-semibold hover:text-green-300 transition">
                            {shortAddress(walletAddress)}
                        </Link>
                        <button
                            onClick={handleDisconnect}
                            className="border border-gray-700 text-gray-400 px-5 py-2 rounded-full text-sm font-semibold hover:border-red-500 hover:text-red-400 transition"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={connectWallet}
                        className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
                    >
                        Connect Wallet
                    </button>
                )}

            </nav>

            {/* Disconnect Security Message */}
            {showDisconnectMessage && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 max-w-md w-full mx-4 shadow-xl">
                    <div className="flex gap-3 items-start">
                        <span className="text-yellow-400 text-xl">⚠️</span>
                        <div>
                            <p className="text-white font-semibold mb-1">Disconnected from Glofi</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                For complete security, open MetaMask → click the three dots →
                                Connected Sites → Remove Glofi. This ensures no site can access
                                your wallet without your permission.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowDisconnectMessage(false)}
                            className="text-gray-600 hover:text-white transition text-lg leading-none ml-2"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}