'use client'

import Navbar from '../Navbar'
import Footer from '../Footer'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useWallet } from '../WalletContext'
import { useGlofiToken } from '../hooks/useGlofiToken'
export default function InvestorPage() {
    const { connected, walletAddress, connectWallet } = useWallet()
    const { tokenBalance, totalSupply, usdcDeposited, loading: tokenLoading } = useGlofiToken(walletAddress)
    const [amount, setAmount] = useState('')
    const [step, setStep] = useState(0)
    const [deposited, setDeposited] = useState(false)

    // If wallet disconnects mid-flow, reset to start
    useEffect(() => {
        if (!connected && step > 0) {
            setStep(0)
            setDeposited(false)
            setAmount('')
        }
    }, [connected])

    function shortAddress(addr: string) {
        return addr.slice(0, 6) + '...' + addr.slice(-4)
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
                    Invest in the Pool. Own the System.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl text-gray-200 max-w-2xl mb-10"
                >
                    Deposit USDC into the liquidity pool and receive governance tokens —
                    a direct, verifiable stake in the platform's performance.
                    Your returns are enforced by mathematics, not promises.
                </motion.p>

                {!connected ? (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        onClick={connectWallet}
                        className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
                    >
                        Connect Wallet to Invest
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        <span className="text-green-400 font-semibold">
                            ✓ {shortAddress(walletAddress)} connected
                        </span>
                        <button
                            onClick={() => setStep(1)}
                            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
                        >
                            Deposit USDC
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Deposit Flow */}
            {connected && step === 1 && !deposited && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-lg mx-auto px-6 pb-20"
                >
                    <div className="border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-2">Deposit USDC</h2>
                        <p className="text-gray-400 mb-8">Enter the amount you want to deposit into the Glofi liquidity pool.</p>

                        <div className="bg-gray-900 rounded-xl p-4 mb-4">
                            <p className="text-gray-400 text-sm mb-1">Depositing from</p>
                            <p className="text-green-400 font-semibold">{shortAddress(walletAddress)}</p>
                        </div>

                        <div className="mb-6">
                            <label className="text-gray-400 text-sm mb-2 block">Amount (USDC)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 text-white text-xl font-bold focus:outline-none focus:border-white transition"
                            />
                        </div>

                        {amount && Number(amount) > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-gray-900 rounded-xl p-4 mb-6"
                            >
                                <div className="flex justify-between mb-2">
                                    <p className="text-gray-400 text-sm">You deposit</p>
                                    <p className="font-semibold">{amount} USDC</p>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p className="text-gray-400 text-sm">You receive</p>
                                    <p className="font-semibold text-green-400">~{amount} GLOFI tokens</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-400 text-sm">Exchange rate</p>
                                    <p className="font-semibold">1 USDC = 1 GLOFI</p>
                                </div>
                            </motion.div>
                        )}

                        <button
                            onClick={() => {
                                if (!amount || Number(amount) <= 0) {
                                    alert('Please enter a valid amount')
                                    return
                                }
                                setDeposited(true)
                                setStep(2)
                            }}
                            className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition mb-4"
                        >
                            Confirm Deposit
                        </button>

                        <button
                            onClick={() => setStep(0)}
                            className="w-full border border-gray-700 text-gray-400 py-4 rounded-full font-bold hover:border-white hover:text-white transition"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Success */}
            {deposited && step === 2 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg mx-auto px-6 pb-20"
                >
                    <div className="border border-green-500 rounded-2xl p-8 text-center">
                        <div className="text-8xl mb-6">🎉</div>
                        <h2 className="text-3xl font-bold mb-4">Deposit Successful!</h2>
                        <p className="text-gray-400 mb-8">You are now a Glofi liquidity provider and governance token holder.</p>

                        <div className="bg-gray-900 rounded-xl p-6 text-left mb-8">
                            <div className="flex justify-between mb-3">
                                <p className="text-gray-400">Amount Deposited</p>
                                <p className="font-semibold">{amount} USDC</p>
                            </div>
                            <div className="flex justify-between mb-3">
                                <p className="text-gray-400">GLOFI Tokens Received</p>
                                <p className="font-semibold text-green-400">~{amount} GLOFI</p>
                            </div>
                            <div className="flex justify-between mb-3">
                                <p className="text-gray-400">Status</p>
                                <p className="font-semibold text-green-400">Active ✓</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Wallet</p>
                                <p className="font-semibold text-green-400">{shortAddress(walletAddress)}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => { setStep(0); setDeposited(false); setAmount('') }}
                            className="w-full border border-gray-700 text-gray-400 py-4 rounded-full font-bold hover:border-white hover:text-white transition"
                        >
                            Make Another Deposit
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Pool Stats */}
            <div className="px-6 pb-20 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-10">
                    Live Pool Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Total Token Supply</p>
                        <p className="text-4xl font-bold">
                            {tokenLoading ? '...' : Number(totalSupply).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">GLOFI</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Your GLOFI Balance</p>
                        <p className="text-4xl font-bold">
                            {tokenLoading ? '...' : Number(tokenBalance).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">GLOFI Tokens</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Your USDC Deposited</p>
                        <p className="text-4xl font-bold">
                            ${tokenLoading ? '...' : Number(usdcDeposited).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">USDC</p>
                    </div>
                </div>

                {/* How it works */}
                <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>

                <div className="flex flex-col gap-6">
                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">01</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                            <p className="text-gray-400">Connect MetaMask or any Web3 wallet. No account creation, no KYC for crypto investors. Your wallet is your identity.</p>
                        </div>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">02</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Deposit USDC</h3>
                            <p className="text-gray-400">Deposit any amount of USDC into the liquidity pool smart contract. Withdraw at any time — your funds are never locked.</p>
                        </div>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">03</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Receive Governance Tokens</h3>
                            <p className="text-gray-400">Instantly receive GLOFI tokens proportional to your deposit. These tokens represent your stake, your voting power, and your share of all platform profits.</p>
                        </div>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">04</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Earn Automatically</h3>
                            <p className="text-gray-400">As traders generate profits, your share grows automatically. No manual claims, no waiting periods. The smart contract distributes returns in real time.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </main>
    )
}