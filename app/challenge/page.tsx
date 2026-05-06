'use client'

import Navbar from '../Navbar'
import Footer from '../Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ChallengePage() {
    const [selected, setSelected] = useState('pro')

    const tiers = {
        starter: {
            name: 'Starter',
            funded: '$5,000',
            fee: '$49',
            drawdown: '10%',
            target: '8%',
            days: '30',
        },
        pro: {
            name: 'Pro',
            funded: '$25,000',
            fee: '$149',
            drawdown: '10%',
            target: '8%',
            days: '30',
        },
        elite: {
            name: 'Elite',
            funded: '$100,000',
            fee: '$399',
            drawdown: '10%',
            target: '8%',
            days: '30',
        },
    }

    const tier = tiers[selected as keyof typeof tiers]

    return (
        <main className="min-h-screen bg-black text-white">

            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-40 pb-20">

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl font-bold text-center mb-4"
                >
                    Start Your Challenge
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-gray-400 text-center mb-16"
                >
                    Select your tier, connect your wallet, and begin.
                </motion.p>

                {/* Tier Selector */}
                <div className="flex gap-4 justify-center mb-12">
                    {['starter', 'pro', 'elite'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setSelected(t)}
                            className={`px-6 py-2 rounded-full font-semibold transition capitalize ${selected === t
                                    ? 'bg-white text-black'
                                    : 'border border-gray-700 text-gray-400 hover:border-white hover:text-white'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Challenge Details */}
                <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-800 rounded-2xl p-10"
                >
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">{tier.name} Challenge</h2>
                            <p className="text-gray-400">Funded account upon passing</p>
                        </div>
                        <div className="text-right">
                            <p className="text-5xl font-bold">{tier.fee}</p>
                            <p className="text-gray-400">one time fee</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="bg-gray-900 rounded-xl p-6 text-center">
                            <p className="text-gray-400 text-sm mb-2">Funded Account</p>
                            <p className="text-2xl font-bold">{tier.funded}</p>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-6 text-center">
                            <p className="text-gray-400 text-sm mb-2">Max Drawdown</p>
                            <p className="text-2xl font-bold">{tier.drawdown}</p>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-6 text-center">
                            <p className="text-gray-400 text-sm mb-2">Profit Target</p>
                            <p className="text-2xl font-bold">{tier.target}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8">
                        <h3 className="font-semibold mb-4">Challenge Rules</h3>
                        <ul className="flex flex-col gap-3 text-gray-400 mb-8">
                            <li>✓ Minimum {tier.days} trading days</li>
                            <li>✓ Maximum daily drawdown {tier.drawdown}</li>
                            <li>✓ Reach {tier.target} profit target to pass</li>
                            <li>✓ Evaluation performed automatically by smart contract</li>
                            <li>✓ No time limit — trade at your own pace</li>
                        </ul>

                        <button className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition">
                            Pay {tier.fee} — Begin Challenge
                        </button>
                        <p className="text-gray-600 text-sm text-center mt-4">
                            Wallet connection required to proceed
                        </p>
                    </div>

                </motion.div>

            </div>

            <Footer />

        </main>
    )
}