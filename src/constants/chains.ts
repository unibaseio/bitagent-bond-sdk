import { isAddress } from 'viem';
import {
  avalancheFuji,
  arbitrum,
  avalanche,
  base,
  blast,
  blastSepolia,
  bsc,
  bscTestnet,
  kaia,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  sepolia,
  baseSepolia,
  cyber,
  ham,
  cyberTestnet,
  degen,
} from 'viem/chains';
import { ChainNotSupportedError } from '../errors/sdk.errors';
import {  getBitAgentContractAddress, SdkSupportedChainIds } from './contracts';
import * as chains from 'viem/chains';

export type ChainType = {
  readonly id: SdkSupportedChainIds;
  readonly name:
    | 'Ethereum'
    | 'Base'
    | 'Blast'
    | 'Cyber'
    | 'Degen'
    | 'Optimism'
    | 'OptimismSepolia'
    | 'Arbitrum'
    | 'Avalanche'
    | 'Polygon'
    | 'BNBChain'
    | 'BNBChainTestnet'
    | 'Sepolia'
    | 'Kaia'
    | 'Ham'
    | 'BaseSepolia'
    | 'AvalancheFuji'
    | 'BlastSepolia'
    | 'CyberTestnet';
  readonly icon: string;
  readonly color: string;
  readonly openseaSlug?: string;
  readonly isTestnet?: boolean;
  readonly enabled?: boolean;
  readonly chain: chains.Chain;
};

export const CHAINS: Array<ChainType> = [
  {
    id: mainnet.id,
    name: 'Ethereum',
    icon: 'https://bitagent.io/assets/networks/ethereum@2x.png',
    color: '#627EEA',
    openseaSlug: 'ethereum',
    enabled: isAddress(getBitAgentContractAddress('BOND', mainnet.id)),
    chain: mainnet,
  },
  {
    id: base.id,
    name: 'Base',
    icon: 'https://bitagent.io/assets/networks/base@2x.png',
    color: '#0052FF',
    openseaSlug: 'base',
    enabled: isAddress(getBitAgentContractAddress('BOND', base.id)),
    chain: base,
  },
  {
    id: blast.id,
    name: 'Blast',
    icon: 'https://bitagent.io/assets/networks/blast@2x.png',
    color: '#FCFC03',
    openseaSlug: 'blast',
    enabled: isAddress(getBitAgentContractAddress('BOND', blast.id)),
    chain: blast,
  },
  {
    id: optimism.id,
    name: 'Optimism',
    icon: 'https://bitagent.io/assets/networks/optimism@2x.png',
    color: '#FF0420',
    openseaSlug: 'optimism',
    enabled: isAddress(getBitAgentContractAddress('BOND', optimism.id)),
    chain: optimism,
  },
  {
    id: optimismSepolia.id,
    name: 'OptimismSepolia',
    icon: 'https://bitagent.io/assets/networks/optimism@2x.png',
    color: '#FF0420',
    openseaSlug: 'optimism',
    enabled: isAddress(getBitAgentContractAddress('BOND', optimismSepolia.id)),
    chain: optimism,
  },
  {
    id: degen.id,
    name: 'Degen',
    icon: 'https://bitagent.io/assets/networks/degen@2x.png',
    color: '#A36EFD',
    openseaSlug: 'degen',
    enabled: isAddress(getBitAgentContractAddress('BOND', degen.id)),
    chain: degen,
  },
  {
    id: arbitrum.id,
    name: 'Arbitrum',
    icon: 'https://bitagent.io/assets/networks/arbitrum@2x.png',
    color: '#12AAFF',
    openseaSlug: 'arbitrum',
    enabled: isAddress(getBitAgentContractAddress('BOND', arbitrum.id)),
    chain: arbitrum,
  },
  {
    id: avalanche.id,
    name: 'Avalanche',
    icon: 'https://bitagent.io/assets/networks/avalanche@2x.png',
    color: '#E94143',
    openseaSlug: 'avalanche',
    enabled: isAddress(getBitAgentContractAddress('BOND', avalanche.id)),
    chain: avalanche,
  },
  {
    id: polygon.id,
    name: 'Polygon',
    icon: 'https://bitagent.io/assets/networks/polygon@2x.png',
    color: '#8247E5',
    openseaSlug: 'matic',
    enabled: isAddress(getBitAgentContractAddress('BOND', polygon.id)),
    chain: polygon,
  },
  {
    id: bsc.id,
    name: 'BNBChain',
    icon: 'https://bitagent.io/assets/networks/bnb@2x.png',
    color: '#F0B90B',
    openseaSlug: 'bsc',
    enabled: isAddress(getBitAgentContractAddress('BOND', bsc.id)),
    chain: bsc,
  },
  {
    id: bscTestnet.id,
    name: 'BNBChainTestnet',
    icon: 'https://bitagent.io/assets/networks/bnb@2x.png',
    color: '#F0B90B',
    openseaSlug: 'bscTestnet',
    enabled: isAddress(getBitAgentContractAddress('BOND', bscTestnet.id)),
    chain: bsc,
  },
  {
    id: sepolia.id,
    name: 'Sepolia',
    icon: 'https://bitagent.io/assets/networks/ethereum@2x.png',
    color: '#627EEA',
    openseaSlug: 'sepolia',
    enabled: isAddress(getBitAgentContractAddress('BOND', sepolia.id)),
    isTestnet: true,
    chain: sepolia,
  },
  {
    id: baseSepolia.id,
    name: 'BaseSepolia',
    icon: 'https://bitagent.io/assets/networks/base@2x.png',
    color: '#0052FF',
    openseaSlug: 'base-sepolia',
    enabled: isAddress(getBitAgentContractAddress('BOND', baseSepolia.id)),
    isTestnet: true,
    chain: sepolia,
  },
  {
    id: blastSepolia.id,
    name: 'BlastSepolia',
    icon: 'https://bitagent.io/assets/networks/blast@2x.png',
    color: '#FCFC03',
    openseaSlug: 'blast-sepolia',
    enabled: isAddress(getBitAgentContractAddress('BOND', blastSepolia.id)),
    isTestnet: true,
    chain: blastSepolia,
  },

  {
    id: cyber.id,
    name: 'Cyber',
    icon: 'https://bitagent.io/assets/networks/cyber@2x.png',
    color: '#32A0CD',
    openseaSlug: 'cyber',
    enabled: isAddress(getBitAgentContractAddress('BOND', cyber.id)),
    chain: cyber,
  },

  {
    id: ham.id,
    name: 'Ham',
    icon: 'https://bitagent.io/assets/networks/ham@2x.png',
    color: '#EB4747',
    openseaSlug: 'ham',
    enabled: isAddress(getBitAgentContractAddress('BOND', ham.id)),
    chain: ham,
  },

  {
    id: avalancheFuji.id,
    name: 'AvalancheFuji',
    icon: 'https://bitagent.io/assets/networks/avalanche@2x.png',
    color: '#E94143',
    openseaSlug: 'avalanche-fuji',
    enabled: isAddress(getBitAgentContractAddress('BOND', avalancheFuji.id)),
    isTestnet: true,
    chain: avalancheFuji,
  },

  {
    id: cyberTestnet.id,
    name: 'CyberTestnet',
    icon: 'https://bitagent.io/assets/networks/cyber@2x.png',
    color: '#32A0CD',
    openseaSlug: 'cyber-testnet',
    enabled: isAddress(getBitAgentContractAddress('BOND', cyberTestnet.id)),
    isTestnet: true,
    chain: cyberTestnet,
  },

  {
    id: kaia.id,
    name: 'Kaia',
    icon: 'https://bitagent.io/assets/networks/kaia@2x.png',
    color: '#BFF009',
    openseaSlug: 'klaytn',
    enabled: isAddress(getBitAgentContractAddress('BOND', kaia.id)),
    chain: kaia,
  },
];

export function chainIdToViemChain(chainId: SdkSupportedChainIds) {
  return CHAINS.find((chain) => chain.id === chainId)?.chain;
}

export type LowerCaseChainNames = (typeof CHAINS)[number]['name'] extends infer X
  ? X extends string
    ? Lowercase<X>
    : never
  : never;

export function chainIdToString(chainId: number) {
  const found = CHAINS.find((chain) => chain.id === chainId);
  if (!found) throw new ChainNotSupportedError(chainId);
  return found?.name?.toLowerCase() as LowerCaseChainNames;
}

export function chainStringToId(name: LowerCaseChainNames) {
  const found = CHAINS.find((chain) => chain?.name?.toLowerCase?.() === name?.toLowerCase?.());

  if (!found) throw new ChainNotSupportedError(name);

  return found.id;
}

export function getChain(chainId: SdkSupportedChainIds): chains.Chain {
  let chain = Object.values(chains).find((c) => c.id === chainId) ?? CHAINS.find((c) => c.id === chainId)?.chain;

  if (!chain) {
    throw new ChainNotSupportedError(chainId);
  }

  return chain;
}

type ChainMapType = Record<SdkSupportedChainIds, ChainType>;

export const CHAIN_MAP = CHAINS.reduce((prev, curr) => {
  prev[curr.id] = curr;
  return prev;
}, {} as ChainMapType);

export const CHAIN_NAME_ID_MAP: Record<string, SdkSupportedChainIds> = {
  sepolia: sepolia.id,
} as const;
