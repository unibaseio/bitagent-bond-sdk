import jsdom from 'jsdom';
export * from 'viem';
export { BOND_ABI, BOND_ERROR_MESSAGES, CHAINS, CHAIN_MAP, CHAIN_NAME_ID_MAP, COINGECKO_NETWORK_IDS, CONTRACT_ERROR_MESSAGES, CurveEnum, DEFAULT_RANK_OPTIONS, ERC1155_ABI, ERC1155_ERROR_MESSAGES, ERC20_ABI, ERC20_ERROR_MESSAGES, LOCKER_ABI, LOCKER_ERROR_MESSAGES, MERKLE_ABI, MERKLE_ERROR_MESSAGES, ONEINCH_ABI, REFERRAL_ABI, REFERRAL_ERROR_MESSAGES, RPCS, TOKENS, WRAPPED_NATIVE_TOKENS, ZAP_ABI, ZAP_ERROR_MESSAGES, abis, airdropContract, applyDecimals, binaryReverseBurn, binaryReverseMint, bitagent, bondContract, calculateArea, calculateRoyalty, chainIdToString, chainIdToViemChain, chainRPCFallbacks, chainStringToId, commify, computeCreate2Address, countDecimals, countLeadingZeros, createRandomAddress, erc1155Contract, erc20Contract, errorMessages, formatGraphPoint, generateCreateArgs, generateSteps, generateTableData, getBitAgentContractAddress, getChain, getSubscriptCharacter, getSubscriptNumber, getValueAfterLeadingZeros, graphTypes, handleScientificNotation, lockupContract, oneInchContract, precisionRound, shortenNumber, supportedChains, supportedChainsMap, toFixed, toNumber, truncateString, uncommify, wei, whitelistedTokens, zapContract } from './index.mjs';
import 'viem/chains';
import 'viem/accounts';
import 'merkletreejs';
import 'crypto';
import 'lodash';
import 'ky';
import 'pinata-web3';

if (typeof window === "undefined") {
  const JSDOM = jsdom.JSDOM;
  const { window: window2 } = new JSDOM("", {
    url: "https://bitagent.io"
  });
  global.window = window2;
  global.navigator = window2.navigator;
  global.document = window2.document;
}
