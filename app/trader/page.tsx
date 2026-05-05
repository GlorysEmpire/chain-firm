import Navbar from '../Navbar'

export default function TraderPage() {
    return (
        <main className="min-h-screen bg-black text-white">

            <Navbar />

            <div className="flex flex-col items-center justify-center px-6 pt-40 pb-20">

                <h1 className="text-5xl font-bold text-center mb-6">
                    Prove Your Skill. Get Funded.
                </h1>

                <p className="text-xl text-gray-200 text-center max-w-2xl mb-16">
                    Pass a challenge, get allocated real capital from the pool.
                    No trust required — your performance is evaluated automatically
                    by smart contracts.
                </p>

                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">

                    <div className="border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-white transition">
                        <h2 className="text-2xl font-bold mb-2">Starter</h2>
                        <p className="text-gray-400 mb-4">$5,000 funded account</p>
                        <p className="text-4xl font-bold mb-6">$49</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition w-full">
                            Begin Challenge
                        </button>
                    </div>

                    <div className="border border-white rounded-2xl p-8 flex flex-col items-center text-center relative">
                        <div className="absolute -top-3 bg-white text-black text-xs font-bold px-4 py-1 rounded-full">
                            POPULAR
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Pro</h2>
                        <p className="text-gray-400 mb-4">$25,000 funded account</p>
                        <p className="text-4xl font-bold mb-6">$149</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition w-full">
                            Begin Challenge
                        </button>
                    </div>

                    <div className="border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-white transition">
                        <h2 className="text-2xl font-bold mb-2">Elite</h2>
                        <p className="text-gray-400 mb-4">$100,000 funded account</p>
                        <p className="text-4xl font-bold mb-6">$399</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition w-full">
                            Begin Challenge
                        </button>
                    </div>

                </div>

            </div>

        </main>
    )
}