'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type WalletContextType = {
    walletAddress: string
    connected: boolean
    connectWallet: () => Promise<void>
    disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType>({
    walletAddress: '',
    connected: false,
    connectWallet: async () => { },
    disconnectWallet: () => { },
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const [walletAddress, setWalletAddress] = useState('')
    const connected = walletAddress !== ''

    useEffect(() => {
        async function checkWallet() {
            if (typeof (window as any).ethereum !== 'undefined') {
                const accounts = await (window as any).ethereum.request({
                    method: 'eth_accounts'
                })
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0])
                }
            }
        }
        checkWallet()
    }, [])

    async function connectWallet() {
        if (typeof (window as any).ethereum !== 'undefined') {
            try {
                const accounts = await (window as any).ethereum.request({
                    method: 'eth_requestAccounts'
                })
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0])
                }
            } catch (error) {
                alert('Wallet connection rejected. Please try again.')
            }
        } else {
            alert('Please install MetaMask to continue. Visit metamask.io')
        }
    }

    function disconnectWallet() {
        setWalletAddress('')
    }

    return (
        <WalletContext.Provider value={{ walletAddress, connected, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    return useContext(WalletContext)
}