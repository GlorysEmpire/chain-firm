'use client'

import Navbar from '../Navbar'
import Footer from '../Footer'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useWallet } from '../WalletContext'
import { useGlofiToken } from '../hooks/useGlofiToken'
export default function InvestorPage() {
    const { connected, walletAddress, connectWallet } = useWallet()
    const { tokenBalance, totalSupply, usdcDeposited, totalPoolValue, freeLiquidity, loading: tokenLoading, depositToPool } = useGlofiToken(walletAddress)
    const [amount, setAmount] = useState('')
    const [step, setStep] = useState(0)
    const [deposited, setDeposited] = useState(false)
    const [depositAmount, setDepositAmount] = useState('')
    const [depositing, setDepositing] = useState(false)
    const [depositTx, setDepositTx] = useState<string | null>(null)
    const [depositError, setDepositError] = useState<string | null>(null)

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
                        <span className="text-blue-300 font-semibold">
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

            {/* Deposit Section */}
            <div className="max-w-lg mx-auto px-6 pb-10">
                <div className="border border-gray-800 rounded-2xl p-8 mb-10">
                    <h2 className="text-2xl font-bold mb-6">Deposit USDC</h2>
                    <p className="text-gray-400 mb-6">
                        Deposit USDC into the Glofi liquidity pool. You will receive GLOFI tokens
                        representing your share of the pool. Your tokens grow in value as traders
                        generate profit.
                    </p>

                    {!connected ? (
                        <button
                            onClick={connectWallet}
                            className="w-full bg-white text-black py-4 rounded-full font-semibold hover:bg-gray-200 transition"
                        >
                            Connect Wallet to Deposit
                        </button>
                    ) : depositTx ? (
                        <div className="bg-gray-900 rounded-xl p-6 text-center">
                            <p className="text-green-400 font-bold text-lg mb-2">Deposit Successful</p>
                            <p className="text-gray-400 text-sm mb-4">Your GLOFI tokens have been minted.</p>

                            <a
                                href={`https://amoy.polygonscan.com/tx/${depositTx}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-300 text-sm hover:text-white"
                            >
                                View transaction
                            </a>
                            <button
                                onClick={() => { setDepositTx(null); setDepositAmount('') }}
                                className="block w-full mt-4 border border-gray-700 text-gray-400 py-3 rounded-full hover:border-white hover:text-white transition"
                            >
                                Make Another Deposit
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="flex gap-4 mb-4">
                                <input
                                    type="number"
                                    placeholder="Amount in USDC"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-300"
                                />
                                <button
                                    onClick={async () => {
                                        if (!depositAmount || Number(depositAmount) <= 0) return
                                        setDepositing(true)
                                        setDepositError(null)
                                        const hash = await depositToPool(depositAmount)
                                        if (hash) {
                                            setDepositTx(hash)
                                        } else {
                                            setDepositError('Deposit failed. Make sure you have enough USDC.')
                                        }
                                        setDepositing(false)
                                    }}
                                    disabled={depositing || !depositAmount}
                                    className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
                                >
                                    {depositing ? 'Processing...' : 'Deposit'}
                                </button>
                            </div>
                            {depositError && (
                                <p className="text-red-400 text-sm mt-2">{depositError}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-3">
                                You will be asked to approve USDC spending, then confirm the deposit. Two transactions total.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pool Stats */}
            <div className="px-6 pb-20 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-10">
                    Live Pool Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Total Pool Value</p>
                        <p className="text-4xl font-bold">
                            ${tokenLoading ? '...' : Number(totalPoolValue).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">USDC</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Free Liquidity</p>
                        <p className="text-4xl font-bold">
                            ${tokenLoading ? '...' : Number(freeLiquidity).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">Available for challenges</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">GLOFI Supply</p>
                        <p className="text-4xl font-bold">
                            {tokenLoading ? '...' : Number(totalSupply).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">Tokens in circulation</p>
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