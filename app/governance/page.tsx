import Navbar from '../Navbar'

export default function GovernancePage() {
    return (
        <main className="min-h-screen bg-black text-white">

            <Navbar />

            {/* Hero */}
            <div className="flex flex-col items-center justify-center px-6 pt-40 pb-20 text-center">
                <h1 className="text-5xl font-bold mb-6">
                    Governance
                </h1>
                <p className="text-xl text-gray-200 max-w-2xl mb-10">
                    Token holders decide the future of Glofi.
                    Every parameter, every change, every upgrade —
                    voted on by the community. No single person has unilateral control.
                </p>
            </div>

            {/* Active Proposals */}
            <div className="px-6 pb-20 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-10">Active Proposals</h2>

                <div className="flex flex-col gap-6">

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
                        <div className="flex gap-4">
                            <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition">
                                Vote For
                            </button>
                            <button className="border border-red-500 text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition">
                                Vote Against
                            </button>
                        </div>
                    </div>

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
                        <div className="flex gap-4">
                            <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition">
                                Vote For
                            </button>
                            <button className="border border-red-500 text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition">
                                Vote Against
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Your Voting Power */}
            <div className="border-t border-gray-800 px-6 py-16 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-10">Your Voting Power</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Tokens Held</p>
                        <p className="text-4xl font-bold">0</p>
                        <p className="text-gray-400 text-sm mt-2">CHAIN tokens</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Voting Power</p>
                        <p className="text-4xl font-bold">0%</p>
                        <p className="text-gray-400 text-sm mt-2">Of total supply</p>
                    </div>
                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Proposals Voted</p>
                        <p className="text-4xl font-bold">0</p>
                        <p className="text-gray-400 text-sm mt-2">This month</p>
                    </div>
                </div>
            </div>

        </main>
    )
}