'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CONTRACTS, NETWORK } from '../contracts/config'

export function useGlofiToken(walletAddress?: string) {
    const [tokenBalance, setTokenBalance] = useState<string>('0')
    const [totalSupply, setTotalSupply] = useState<string>('0')
    const [usdcDeposited, setUsdcDeposited] = useState<string>('0')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                setError(null)

                // Connect to Polygon Amoy using a public RPC
                const provider = new ethers.JsonRpcProvider(NETWORK.rpcUrl)

                // Create contract instance
                const contract = new ethers.Contract(
                    CONTRACTS.GlofiToken.address,
                    CONTRACTS.GlofiToken.abi,
                    provider
                )

                // Get total supply — always available
                const supply = await contract.getTotalSupply()
                setTotalSupply(ethers.formatEther(supply))

                // Get wallet-specific data if address provided
                if (walletAddress) {
                    const balance = await contract.getBalance(walletAddress)
                    setTokenBalance(ethers.formatEther(balance))

                    const deposited = await contract.getUsdcDeposited(walletAddress)
                    setUsdcDeposited(ethers.formatEther(deposited))
                }

            } catch (err) {
                console.error('Error fetching token data:', err)
                setError('Failed to fetch token data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [walletAddress])

    return { tokenBalance, totalSupply, usdcDeposited, loading, error }
}