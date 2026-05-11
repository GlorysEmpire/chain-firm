import GlofiTokenABI from './GlofiToken.json'

// Your deployed contract addresses
export const CONTRACTS = {
    GlofiToken: {
        address: '0x5B9dEE5d96BdF3F7E3aa4e4FD8A0ad29b4082a2C',
        abi: GlofiTokenABI,
    },
}

// Polygon Amoy testnet
export const NETWORK = {
    chainId: '0x13882',
    name: 'Polygon Amoy Testnet',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    explorer: 'https://amoy.polygonscan.com',
}