import Footer from '../Footer'
import Navbar from '../Navbar'

export default function InvestorPage() {
    return (
        <main className="min-h-screen bg-black text-white">

            <Navbar />

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center px-6 pt-40 pb-20 text-center">
                <h1 className="text-5xl font-bold mb-6">
                    Invest in the Pool. Own the System.
                </h1>
                <p className="text-xl text-gray-200 max-w-2xl mb-10">
                    Deposit USDC into the liquidity pool and receive governance tokens —
                    a direct, verifiable stake in the platform's performance.
                    Your returns are enforced by mathematics, not promises.
                </p>
                <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                    Connect Wallet to Invest
                </button>
            </div>

            {/* Pool Stats Section */}
            <div className="px-6 pb-20 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-10">
                    Live Pool Statistics
                </h2>

                <div className="grid grid-cols-3 gap-6 mb-16">

                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Total Pool Size</p>
                        <p className="text-4xl font-bold">$2,450,000</p>
                        <p className="text-gray-400 text-sm mt-2">USDC</p>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Active Investors</p>
                        <p className="text-4xl font-bold">847</p>
                        <p className="text-gray-400 text-sm mt-2">Token Holders</p>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm mb-2">Total Payouts Made</p>
                        <p className="text-4xl font-bold">$0</p>
                        <p className="text-gray-400 text-sm mt-2">To Traders</p>
                    </div>

                </div>

                {/* How it works Section */}
                <h2 className="text-2xl font-bold text-center mb-10">
                    How It Works
                </h2>

                <div className="flex flex-col gap-6">

                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">01</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                            <p className="text-gray-400">
                                Connect MetaMask or any Web3 wallet. No account creation,
                                no KYC for crypto investors. Your wallet is your identity.
                            </p>
                        </div>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">02</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Deposit USDC</h3>
                            <p className="text-gray-400">
                                Deposit any amount of USDC into the liquidity pool smart contract.
                                Withdraw at any time — your funds are never locked.
                            </p>
                        </div>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">03</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Receive Governance Tokens</h3>
                            <p className="text-gray-400">
                                Instantly receive governance tokens proportional to your deposit.
                                These tokens represent your stake, your voting power,
                                and your share of all platform profits.
                            </p>
                        </div>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-8 flex gap-6 items-start">
                        <div className="text-4xl font-bold text-gray-600">04</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Earn Automatically</h3>
                            <p className="text-gray-400">
                                As traders generate profits, your share grows automatically.
                                No manual claims, no waiting periods.
                                The smart contract distributes returns in real time.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />

        </main>
    )
}