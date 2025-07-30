import {
  arbitrum,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  bsc,
  bscTestnet,
  mainnet,
  optimism,
  polygon,
  sepolia,
  kaia,
  ham,
  degen,
  cyber,
  cyberTestnet,
  optimismSepolia,
} from 'viem/chains';
import { BitAgentSDK } from './BitAgentSDK';
import {
  Abi,
  BOND_ABI,
  CONTRACT_ERROR_MESSAGES,
  SdkSupportedChainIds,
  ContractNames,
  ERC1155_ABI,
  ERC20_ABI,
  LOCKER_ABI,
  LowerCaseChainNames,
  MERKLE_ABI,
  ONEINCH_ABI,
  TOKENS,
  ZAP_ABI,
} from './exports';

export const abis: Record<ContractNames, Abi> = {
  BOND: BOND_ABI,
  ERC20: ERC20_ABI,
  ERC1155: ERC1155_ABI,
  LOCKER: LOCKER_ABI,
  MERKLE: MERKLE_ABI,
  ONEINCH: ONEINCH_ABI,
  ZAP: ZAP_ABI,
};

export const whitelistedTokens = TOKENS;
export const errorMessages = CONTRACT_ERROR_MESSAGES;
export const supportedChains = [
  'ethereum',
  'sepolia',
  'bnbchain',
  'polygon',
  'arbitrum',
  'optimism',
  'avalanche',
  'base',
  'basesepolia',
  'kaia',
  'degen',
  'ham',
  'cyber',
  'cybertestnet',
] as const;

export const supportedChainsMap: Record<LowerCaseChainNames, SdkSupportedChainIds> = {
  ethereum: mainnet.id,
  sepolia: sepolia.id,
  basesepolia: baseSepolia.id,
  bnbchain: bsc.id,
  bnbchaintestnet: bscTestnet.id,
  polygon: polygon.id,
  arbitrum: arbitrum.id,
  kaia: kaia.id,
  degen: degen.id,
  optimism: optimism.id,
  optimismsepolia: optimismSepolia.id,
  avalanche: avalanche.id,
  base: base.id,
  blast: blast.id,
  blastsepolia: blastSepolia.id,
  avalanchefuji: avalancheFuji.id,
  cyber: cyber.id,
  ham: ham.id,
  cybertestnet: cyberTestnet.id,
};

export * from './exports';
export * from './contracts';
export * from './utils/bond';
export * from './utils/addresses';
export * from './utils/graph';
export * from './utils/trade';
export * from './utils/strings';

export const bitagent = new BitAgentSDK();
