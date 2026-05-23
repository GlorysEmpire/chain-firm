'use client'

import Navbar from '../Navbar'
import Footer from '../Footer'
import { motion } from 'framer-motion'
import { useWallet } from '../WalletContext'
import { useState, useEffect } from 'react'

export default function GovernancePage() {
    const { connected, walletAddress, connectWallet } = useWallet()
    const [votes, setVotes] = useState<{ [key: string]: 'for' | 'against' | null }>({
        proposal1: null,
        proposal2: null,
    })

    // Clear votes when wallet disconnects
    useEffect(() => {
        if (!connected) {
            setVotes({ proposal1: null, proposal2: null })
        }
    }, [connected])

    function shortAddress(addr: string) {
        return addr.slice(0, 6) + '...' + addr.slice(-4)
    }

    function handleVote(proposal: string, vote: 'for' | 'against') {
        if (!connected) {
            alert('Please connect your wallet to vote.')
            return
        }
        setVotes(prev => ({ ...prev, [proposal]: vote }))
    }

    return (
        <main className="min-h-screen bg-black text-white">

            <Navbar />

            {/* Hero */}
            <div className="flex flex-col items-center justify-center px-6 pt-40 pb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl font-bold mb-6"
                >
                    Governance
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl text-gray-200 max-w-2xl mb-6"
                >
                    Token holders decide the future of Glofi. Every parameter, every change,
                    every upgrade — voted on by the community. No single person has unilateral control.
                </motion.p>

                {!connected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="text-gray-400 text-sm">Connect your wallet to participate in governance</p>
                        <button
                            onClick={connectWallet}
                            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
                        >
                            Connect Wallet to Vote
                        </button>
                    </motion.div>
                )}

                {connected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-900 rounded-xl px-6 py-3"
                    >
                        <p className="text-blue-300 font-semibold">✓ {shortAddress(walletAddress)} — eligible to vote</p>
                    </motion.div>
                )}
            </div>

            {/* Active Proposals */}
            <div className="px-6 pb-20 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-10">Active Proposals</h2>

                <div className="flex flex-col gap-6">

                    {/* Proposal 1 */}
                    <div className="border border-gray-800 rounded-2xl p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className="text-xs font-bold bg-green-500 text-white px-3 py-1 rounded-full">
                                    ACTIVE
                                </span>
                                <h3 className="text-xl font-bold mt-3">
                                    Proposal #1 — Set Trader Profit Split to 80%
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm">Ends in 3 days</p>
                        </div>
                        <p className="text-gray-400 mb-6">
                            This proposal sets the default profit split for funded traders to 80%.
                            The remaining 20% is split between the liquidity pool (15%)
                            and platform treasury (5%).
                        </p>
                        <div className="mb-4">
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
                                    className={`flex-1 py-3 rounded-full font-semibold transition ${connected
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    Vote For
                                </button>
                                <button
                                    onClick={() => handleVote('proposal1', 'against')}
                                    className={`flex-1 py-3 rounded-full font-semibold transition border ${connected
                                        ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                        : 'border-gray-700 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    Vote Against
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Proposal 2 */}
                    <div className="border border-gray-800 rounded-2xl p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className="text-xs font-bold bg-green-500 text-white px-3 py-1 rounded-full">
                                    ACTIVE
                                </span>
                                <h3 className="text-xl font-bold mt-3">
                                    Proposal #2 — Add Staking Challenge Tier
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm">Ends in 5 days</p>
                        </div>
                        <p className="text-gray-400 mb-6">
                            This proposal introduces a staking-based challenge entry where traders
                            lock governance tokens instead of paying a flat fee.
                            On pass, stake is returned. On fail, stake is slashed to the pool.
                        </p>
                        <div className="mb-4">
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
                                    className={`flex-1 py-3 rounded-full font-semibold transition ${connected
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    Vote For
                                </button>
                                <button
                                    onClick={() => handleVote('proposal2', 'against')}
                                    className={`flex-1 py-3 rounded-full font-semibold transition border ${connected
                                        ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                        : 'border-gray-700 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    Vote Against
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Voting Power */}
            <div className="border-t border-gray-800 px-6 py-16 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-10">Your Voting Power</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Tokens Held</p>
                        <p className="text-4xl font-bold">0</p>
                        <p className="text-gray-400 text-sm mt-2">GLOFI tokens</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Voting Power</p>
                        <p className="text-4xl font-bold">0%</p>
                        <p className="text-gray-400 text-sm mt-2">Of total supply</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Proposals Voted</p>
                        <p className="text-4xl font-bold">
                            {Object.values(votes).filter(v => v !== null).length}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">This session</p>
                    </div>
                </div>
            </div>

            <Footer />

        </main>
    )
}