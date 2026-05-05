import Navbar from './Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 pt-40 pb-20 text-center">
        <h1 className="text-7xl font-bold text-center mb-6">
          The Future of Prop Trading
        </h1>
        <p className="text-xl text-gray-200 text-center max-w-2xl mb-10">
          A fully on-chain proprietary trading firm. No trust required.
          Every rule, every payout, every allocation — executed automatically
          by smart contracts.
        </p>
        <div className="flex gap-4">
          <Link href="/trader">
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
              Start Trading
            </button>
          </Link>
          <Link href="/investor">
            <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
              Invest in the Pool
            </button>
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6 pb-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-3 gap-8">

          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-6">🏆</div>
            <h3 className="text-xl font-bold mb-3">Traders Compete</h3>
            <p className="text-gray-400">
              Pay a challenge fee, prove your trading skill.
              Smart contracts evaluate your performance automatically —
              no human bias, no manipulation.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-6">💰</div>
            <h3 className="text-xl font-bold mb-3">Investors Fund the Pool</h3>
            <p className="text-gray-400">
              Deposit USDC, receive governance tokens.
              Your stake grows as the pool grows.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-6">⚡</div>
            <h3 className="text-xl font-bold mb-3">Smart Contracts Execute</h3>
            <p className="text-gray-400">
              No company in the middle. No trust required.
              Every payout, every allocation, every rule —
              enforced automatically by code.
            </p>
          </div>

        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-800 px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold mb-2">$0</p>
            <p className="text-gray-400">Total Pool Size</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">0</p>
            <p className="text-gray-400">Active Traders</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">0%</p>
            <p className="text-gray-400">Average Monthly Return</p>
          </div>
        </div>
      </div>

    </main>
  )
}