'use client'

import Navbar from '../Navbar'
import Footer from '../Footer'
import { motion } from 'framer-motion'
import { useWallet } from '../WalletContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
    const { connected, walletAddress } = useWallet()
    const router = useRouter()
    const [votes, setVotes] = useState<{ [key: string]: 'for' | 'against' | null }>({
        proposal1: null,
        proposal2: null,
    })

    function shortAddress(addr: string) {
        return addr.slice(0, 6) + '...' + addr.slice(-4)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!connected) {
                router.push('/')
            }
        }, 1000)
        return () => clearTimeout(timer)
    }, [connected])

    useEffect(() => {
        if (!connected) {
            setVotes({ proposal1: null, proposal2: null })
        }
    }, [connected])

    function handleVote(proposal: string, vote: 'for' | 'against') {
        setVotes(prev => ({ ...prev, [proposal]: vote }))
    }

    if (!connected) return null

    return (
        <main className="min-h-screen bg-black text-white">

            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-40 pb-20">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="text-gray-400 mb-2">Welcome back</p>
                    <h1 className="text-4xl font-bold text-green-400">
                        {shortAddress(walletAddress)}
                    </h1>
                </motion.div>

                {/* Overview Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="grid grid-cols-4 gap-6 mb-16"
                >
                    <div className="border border-gray-800 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Active Challenges</p>
                        <p className="text-4xl font-bold mb-1">0</p>
                        <p className="text-gray-400 text-sm">No active challenges</p>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm mb-2">GLOFI Tokens</p>
                        <p className="text-4xl font-bold mb-1">0</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-400 text-sm">Token value</p>
                            <p className="text-white text-sm font-semibold">$1.00</p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-400 text-sm">Holdings value</p>
                            <p className="text-white text-sm font-semibold">$0.00</p>
                        </div>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm mb-2">USDC Deposited</p>
                        <p className="text-4xl font-bold mb-1">$0</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-400 text-sm">Your share</p>
                            <p className="text-white text-sm font-semibold">0%</p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-400 text-sm">Pool size</p>
                            <p className="text-white text-sm font-semibold">$0 USDC</p>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Total Earnings</p>
                        <p className="text-4xl font-bold mb-1">$0</p>
                        <p className="text-gray-400 text-sm">Lifetime returns</p>
                    </div>
                </motion.div>

                {/* Active Challenges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mb-16"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Your Challenges</h2>
                        <Link href="/trader">
                            <button className="border border-gray-700 text-gray-400 px-5 py-2 rounded-full text-sm font-semibold hover:border-white hover:text-white transition">
                                + New Challenge
                            </button>
                        </Link>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-10 text-center">
                        <p className="text-5xl mb-4">🏆</p>
                        <p className="text-gray-400 mb-6">No active challenges yet.</p>
                        <Link href="/trader">
                            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                                Start a Challenge
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Investment */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Your Investment</h2>
                        <Link href="/investor">
                            <button className="border border-gray-700 text-gray-400 px-5 py-2 rounded-full text-sm font-semibold hover:border-white hover:text-white transition">
                                + Deposit USDC
                            </button>
                        </Link>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-10 text-center">
                        <p className="text-5xl mb-4">💰</p>
                        <p className="text-gray-400 mb-6">No investments yet. Deposit USDC to start earning.</p>
                        <Link href="/investor">
                            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                                Invest in the Pool
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Governance */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Active Proposals</h2>
                        <Link href="/governance">
                            <button className="border border-gray-700 text-gray-400 px-5 py-2 rounded-full text-sm font-semibold hover:border-white hover:text-white transition">
                                View All
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-6">

                        <div className="border border-gray-800 rounded-2xl p-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-xs font-bold bg-green-500 text-white px-3 py-1 rounded-full">
                                        ACTIVE
                                    </span>
                                    <h3 className="text-lg font-bold mt-3">
                                        Proposal #1 — Set Trader Profit Split to 80%
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm">Ends in 3 days</p>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                Sets the default profit split for funded traders to 80%.
                                Remaining 20% split between liquidity pool (15%) and platform treasury (5%).
                            </p>
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-green-400">For — 67%</span>
                                    <span className="text-red-400">Against — 33%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                                </div>
                            </div>

                            {votes.proposal1 ? (
                                <div className="bg-gray-900 rounded-xl p-4 text-center">
                                    <p className="text-green-400 font-semibold">
                                        ✓ You voted {votes.proposal1 === 'for' ? 'For' : 'Against'} this proposal
                                    </p>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleVote('proposal1', 'for')}
                                        className="flex-1 bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition"
                                    >
                                        Vote For
                                    </button>
                                    <button
                                        onClick={() => handleVote('proposal1', 'against')}
                                        className="flex-1 border border-red-500 text-red-500 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition"
                                    >
                                        Vote Against
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="border border-gray-800 rounded-2xl p-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-xs font-bold bg-green-500 text-white px-3 py-1 rounded-full">
                                        ACTIVE
                                    </span>
                                    <h3 className="text-lg font-bold mt-3">
                                        Proposal #2 — Add Staking Challenge Tier
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm">Ends in 5 days</p>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                Introduces staking-based challenge entry where traders lock governance
                                tokens instead of paying a flat fee. On pass, stake returned. On fail, slashed to pool.
                            </p>
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-green-400">For — 89%</span>
                                    <span className="text-red-400">Against — 11%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                                </div>
                            </div>

                            {votes.proposal2 ? (
                                <div className="bg-gray-900 rounded-xl p-4 text-center">
                                    <p className="text-green-400 font-semibold">
                                        ✓ You voted {votes.proposal2 === 'for' ? 'For' : 'Against'} this proposal
                                    </p>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleVote('proposal2', 'for')}
                                        className="flex-1 bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition"
                                    >
                                        Vote For
                                    </button>
                                    <button
                                        onClick={() => handleVote('proposal2', 'against')}
                                        className="flex-1 border border-red-500 text-red-500 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition"
                                    >
                                        Vote Against
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </motion.div>

            </div>

            <Footer />

        </main>
    )
}