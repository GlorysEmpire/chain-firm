import Navbar from './Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <Navbar />

      <h1 className="text-7xl font-bold text-center mb-6">
        The Future of Prop Trading
      </h1>

      <p className="text-xl text-gray-200 text-center max-w-2xl mb-10">
        A fully on-chain proprietary trading firm. No trust required.
        Every rule, every payout, every allocation — executed automatically
        by smart contracts.
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Start Trading
        </button>
        <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
          Invest in the Pool
        </button>
      </div>

    </main>
  )
}