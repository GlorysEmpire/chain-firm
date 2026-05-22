import GlofiTokenABI from './GlofiToken.json'
import GlofiPoolABI from './GlofiPool.json'

export const CONTRACTS = {
  GlofiToken: {
    address: '0x5B9dEE5d96BdF3F7E3aa4e4FD8A0ad29b4082a2C',
    abi: GlofiTokenABI,
  },
  GlofiPool: {
    address: '0x43736a144cF4B9dcC2b9a2426C9D69F8Dd529803',
    abi: GlofiPoolABI,
  },
}

export const NETWORK = {
  chainId: '0x13882',
  name: 'Polygon Amoy Testnet',
  rpcUrl: 'https://rpc-amoy.polygon.technology',
  explorer: 'https://amoy.polygonscan.com',
}