'use strict';

var jsdom = require('jsdom');
var viem = require('viem');
var index = require('./index.cjs');
require('viem/chains');
require('viem/accounts');
require('merkletreejs');
require('crypto');
require('lodash');
require('ky');
require('pinata-web3');

if (typeof window === "undefined") {
  const JSDOM = jsdom.JSDOM;
  const { window: window2 } = new JSDOM("", {
    url: "https://bitagent.io"
  });
  global.window = window2;
  global.navigator = window2.navigator;
  global.document = window2.document;
}

exports.BOND_ABI = index.BOND_ABI;
exports.BOND_ERROR_MESSAGES = index.BOND_ERROR_MESSAGES;
exports.CHAINS = index.CHAINS;
exports.CHAIN_MAP = index.CHAIN_MAP;
exports.CHAIN_NAME_ID_MAP = index.CHAIN_NAME_ID_MAP;
exports.COINGECKO_NETWORK_IDS = index.COINGECKO_NETWORK_IDS;
exports.CONTRACT_ERROR_MESSAGES = index.CONTRACT_ERROR_MESSAGES;
exports.CurveEnum = index.CurveEnum;
exports.DEFAULT_RANK_OPTIONS = index.DEFAULT_RANK_OPTIONS;
exports.ERC1155_ABI = index.ERC1155_ABI;
exports.ERC1155_ERROR_MESSAGES = index.ERC1155_ERROR_MESSAGES;
exports.ERC20_ABI = index.ERC20_ABI;
exports.ERC20_ERROR_MESSAGES = index.ERC20_ERROR_MESSAGES;
exports.LOCKER_ABI = index.LOCKER_ABI;
exports.LOCKER_ERROR_MESSAGES = index.LOCKER_ERROR_MESSAGES;
exports.MERKLE_ABI = index.MERKLE_ABI;
exports.MERKLE_ERROR_MESSAGES = index.MERKLE_ERROR_MESSAGES;
exports.ONEINCH_ABI = index.ONEINCH_ABI;
exports.REFERRAL_ABI = index.REFERRAL_ABI;
exports.REFERRAL_ERROR_MESSAGES = index.REFERRAL_ERROR_MESSAGES;
exports.RPCS = index.RPCS;
exports.TOKENS = index.TOKENS;
exports.WRAPPED_NATIVE_TOKENS = index.WRAPPED_NATIVE_TOKENS;
exports.ZAP_ABI = index.ZAP_ABI;
exports.ZAP_ERROR_MESSAGES = index.ZAP_ERROR_MESSAGES;
exports.abis = index.abis;
exports.airdropContract = index.airdropContract;
exports.applyDecimals = index.applyDecimals;
exports.binaryReverseBurn = index.binaryReverseBurn;
exports.binaryReverseMint = index.binaryReverseMint;
exports.bitagent = index.bitagent;
exports.bondContract = index.bondContract;
exports.calculateArea = index.calculateArea;
exports.calculateRoyalty = index.calculateRoyalty;
exports.chainIdToString = index.chainIdToString;
exports.chainIdToViemChain = index.chainIdToViemChain;
exports.chainRPCFallbacks = index.chainRPCFallbacks;
exports.chainStringToId = index.chainStringToId;
exports.commify = index.commify;
exports.computeCreate2Address = index.computeCreate2Address;
exports.countDecimals = index.countDecimals;
exports.countLeadingZeros = index.countLeadingZeros;
exports.createRandomAddress = index.createRandomAddress;
exports.erc1155Contract = index.erc1155Contract;
exports.erc20Contract = index.erc20Contract;
exports.errorMessages = index.errorMessages;
exports.formatGraphPoint = index.formatGraphPoint;
exports.generateCreateArgs = index.generateCreateArgs;
exports.generateSteps = index.generateSteps;
exports.generateTableData = index.generateTableData;
exports.getBitAgentContractAddress = index.getBitAgentContractAddress;
exports.getChain = index.getChain;
exports.getSubscriptCharacter = index.getSubscriptCharacter;
exports.getSubscriptNumber = index.getSubscriptNumber;
exports.getValueAfterLeadingZeros = index.getValueAfterLeadingZeros;
exports.graphTypes = index.graphTypes;
exports.handleScientificNotation = index.handleScientificNotation;
exports.lockupContract = index.lockupContract;
exports.oneInchContract = index.oneInchContract;
exports.precisionRound = index.precisionRound;
exports.shortenNumber = index.shortenNumber;
exports.supportedChains = index.supportedChains;
exports.supportedChainsMap = index.supportedChainsMap;
exports.toFixed = index.toFixed;
exports.toNumber = index.toNumber;
exports.truncateString = index.truncateString;
exports.uncommify = index.uncommify;
exports.wei = index.wei;
exports.whitelistedTokens = index.whitelistedTokens;
exports.zapContract = index.zapContract;
Object.keys(viem).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return viem[k]; }
  });
});
