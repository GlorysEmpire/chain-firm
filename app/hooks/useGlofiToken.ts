'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CONTRACTS, NETWORK } from '../contracts/config'

export function useGlofiToken(walletAddress?: string) {
  const [tokenBalance, setTokenBalance] = useState<string>('0')
  const [totalSupply, setTotalSupply] = useState<string>('0')
  const [usdcDeposited, setUsdcDeposited] = useState<string>('0')
  const [totalPoolValue, setTotalPoolValue] = useState<string>('0')
  const [reservedLiquidity, setReservedLiquidity] = useState<string>('0')
  const [freeLiquidity, setFreeLiquidity] = useState<string>('0')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const provider = new ethers.JsonRpcProvider(NETWORK.rpcUrl)

        const tokenContract = new ethers.Contract(
          CONTRACTS.GlofiToken.address,
          CONTRACTS.GlofiToken.abi,
          provider
        )

        const poolContract = new ethers.Contract(
          CONTRACTS.GlofiPool.address,
          CONTRACTS.GlofiPool.abi,
          provider
        )

        const supply = await tokenContract.getTotalSupply()
        setTotalSupply(ethers.formatEther(supply))

        const poolStats = await poolContract.getPoolStats()
        setTotalPoolValue(ethers.formatUnits(poolStats[0], 6))
        setReservedLiquidity(ethers.formatUnits(poolStats[1], 6))
        setFreeLiquidity(ethers.formatUnits(poolStats[2], 6))

        if (walletAddress) {
          const balance = await tokenContract.getBalance(walletAddress)
          setTokenBalance(ethers.formatEther(balance))

          const deposited = await tokenContract.getUsdcDeposited(walletAddress)
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

  return { tokenBalance, totalSupply, usdcDeposited, totalPoolValue, reservedLiquidity, freeLiquidity, loading, error }
}