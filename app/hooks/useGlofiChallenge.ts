'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACTS } from '../contracts/config'

export function useGlofiChallenge() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [txHash, setTxHash] = useState<string | null>(null)

    const TIER_MAP: { [key: string]: number } = {
        tier1: 0,
        tier2: 1,
        tier3: 2,
    }

    async function registerChallenge(tierKey: string) {
        try {
            setLoading(true)
            setError(null)
            setTxHash(null)

            const provider = new ethers.BrowserProvider((window as any).ethereum)
            const signer = await provider.getSigner()

            const usdcContract = new ethers.Contract(
                '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',
                ['function approve(address spender, uint256 amount) returns (bool)'],
                signer
            )

            const challengeContract = new ethers.Contract(
                CONTRACTS.GlofiChallenge.address,
                CONTRACTS.GlofiChallenge.abi,
                signer
            )

            const tierFees: { [key: string]: string } = {
                tier1: '49000000',
                tier2: '149000000',
                tier3: '399000000',
            }

            const fee = tierFees[tierKey]
            const tierId = TIER_MAP[tierKey]

            // Step 1 — approve USDC spend
            const approveTx = await usdcContract.approve(
                CONTRACTS.GlofiChallenge.address,
                fee
            )
            await approveTx.wait()

            // Step 2 — register challenge
            const tx = await challengeContract.registerChallenge(tierId)
            await tx.wait()

            setTxHash(tx.hash)
            return tx.hash

        } catch (err: any) {
            setError(err.message || 'Transaction failed')
            return null
        } finally {
            setLoading(false)
        }
    }

    async function canOpenChallenge(tierKey: string): Promise<boolean> {
        try {
            const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology')
            const challengeContract = new ethers.Contract(
                CONTRACTS.GlofiChallenge.address,
                CONTRACTS.GlofiChallenge.abi,
                provider
            )
            const tierId = TIER_MAP[tierKey]
            return await challengeContract.canOpenChallenge(tierId)
        } catch {
            return false
        }
    }

    async function getTraderChallenges(walletAddress: string) {
        try {
            const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology')
            const challengeContract = new ethers.Contract(
                CONTRACTS.GlofiChallenge.address,
                CONTRACTS.GlofiChallenge.abi,
                provider
            )
            const challengeIds = await challengeContract.getTraderChallenges(walletAddress)
            const challengeDetails = await Promise.all(
                challengeIds.map((id: bigint) => challengeContract.getChallenge(id))
            )
            return challengeIds.map((id: bigint, index: number) => ({
                id: id.toString(),
                ...challengeDetails[index]
            }))
        } catch {
            return []
        }
    }

    async function hasActive(walletAddress: string): Promise<boolean> {
        try {
            const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology')
            const challengeContract = new ethers.Contract(
                CONTRACTS.GlofiChallenge.address,
                CONTRACTS.GlofiChallenge.abi,
                provider
            )
            return await challengeContract.hasActiveChallenge(walletAddress)
        } catch {
            return false
        }
    }

    return { registerChallenge, canOpenChallenge, getTraderChallenges, hasActive, loading, error, txHash }
}