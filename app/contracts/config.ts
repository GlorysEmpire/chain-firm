import GlofiTokenABI from './GlofiToken.json'
import GlofiPoolABI from './GlofiPool.json'
import GlofiChallengeABI from './GlofiChallenge.json'
import GlofiPayoutABI from './GlofiPayout.json'
import ProxyGovernanceABI from './ProxyGovernance.json'
export const CONTRACTS = {
  GlofiToken: {
    address: '0x5B9dEE5d96BdF3F7E3aa4e4FD8A0ad29b4082a2C',
    abi: GlofiTokenABI,
  },
  GlofiPool: {
    address: '0x43736a144cF4B9dcC2b9a2426C9D69F8Dd529803',
    abi: GlofiPoolABI,
  },
  GlofiChallenge: {
    address: '0x5c87511BEF3CddD7e1cfdABfA7173F6DA7554784',
    abi: GlofiChallengeABI,
  },
  GlofiPayout: {
    address: '0x78A9401c255Af3Df3DA73fbE7Fd7bB423a2d5d6c',
    abi: GlofiPayoutABI,
  },
  ProxyGovernance: {
    address: '0x30E07C200F18736665B69454796a486377d49EB2',
    abi: ProxyGovernanceABI,
  },
}

export const NETWORK = {
  chainId: '0x13882',
  name: 'Polygon Amoy Testnet',
  rpcUrl: 'https://rpc-amoy.polygon.technology',
  explorer: 'https://amoy.polygonscan.com',
}