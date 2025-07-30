'use strict';

var chains = require('viem/chains');
var viem = require('viem');
var accounts = require('viem/accounts');
var MerkleTree = require('merkletreejs');
var crypto = require('crypto');
var lodash = require('lodash');
var ky = require('ky');
var pinataWeb3 = require('pinata-web3');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var chains__namespace = /*#__PURE__*/_interopNamespaceDefault(chains);

function truncateString(str, length = 100) {
  if (str.length > length) {
    return str.slice(0, length - 3) + "...";
  }
  return str;
}
function getSubscriptCharacter(number) {
  let str = number.toString();
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      newStr += String.fromCharCode(code + 8272);
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}

function commify(x) {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function uncommify(str) {
  return str.toString().replace(/,/g, "");
}
function handleScientificNotation(num) {
  const str = num?.toString();
  if (str?.includes("e")) {
    const [coefficient, exponent] = str.split("e");
    const decimalCount = countDecimals(Number(coefficient));
    const exponentValue = parseInt(exponent, 10);
    if (exponentValue >= 0) {
      const result = Number(num).toLocaleString();
      return result;
    } else {
      const result = Number(num).toFixed(Math.abs(exponentValue) + decimalCount);
      return result;
    }
  }
  return str;
}
function countLeadingZeros(num) {
  const stringValue = handleScientificNotation(num?.toString());
  if (!stringValue || !stringValue?.includes(".")) return 0;
  const [, decimalPart] = stringValue.split(".");
  const leadingZeros = decimalPart ? decimalPart.match(/^0*/)?.[0]?.length : 0;
  return leadingZeros ?? 0;
}
function getValueAfterLeadingZeros(num) {
  const numStr = handleScientificNotation(num?.toString());
  if (!numStr) return;
  const matches = /\.0*([1-9]\d*)$/.exec(numStr);
  if (matches && matches[1]) {
    return parseInt(matches[1], 10);
  }
  return num;
}
function countDecimals(value) {
  const numStr = handleScientificNotation(value?.toString());
  const length = numStr?.split(".")?.[1]?.length;
  return length ?? 0;
}
function toFixed(value, t) {
  return Number(Number(value).toFixed(t));
}
function wei$1(num, decimals = 18) {
  const stringified = handleScientificNotation(num.toString());
  return viem.parseUnits(stringified, decimals);
}
function toNumber(num, decimals) {
  return Number(viem.formatUnits(num, decimals));
}
function shortenNumber(num, prefix = "") {
  num = Number(num.toString().replaceAll(",", ""));
  if (num >= 1e12) {
    return `${prefix}${toFixed(num / 1e12, 2)}T`;
  } else if (num >= 1e9) {
    return `${prefix}${toFixed(num / 1e9, 2)}B`;
  } else if (num >= 1e6) {
    return `${prefix}${toFixed(num / 1e6, 2)}M`;
  } else if (num >= 1e3) {
    return `${prefix}${toFixed(num / 1e3, 2)}K`;
  } else if (num === 0) {
    return `${prefix}0`;
  } else if (num <= 1e-6) {
    return `< ${prefix}0.000001`;
  }
  return prefix + num.toLocaleString("en-US", {
    maximumFractionDigits: 6
  });
}
function applyDecimals(num) {
  const toNum = Number(num);
  let decimalPlaces;
  if (toNum >= 1e5) {
    decimalPlaces = 0;
  } else if (toNum >= 1e3) {
    decimalPlaces = 2;
  } else if (toNum >= 10) {
    decimalPlaces = 3;
  } else if (toNum >= 1) {
    decimalPlaces = 4;
  } else if (toNum >= 0.1) {
    decimalPlaces = 5;
  } else if (toNum >= 0.01) {
    decimalPlaces = 6;
  }
  if (decimalPlaces === void 0) {
    return handleScientificNotation(toNum.toString());
  }
  return handleScientificNotation(
    toNum.toLocaleString("en-US", {
      maximumFractionDigits: decimalPlaces
    })
  );
}
function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
function getSubscriptNumber(params) {
  const { number, maxDecimals = 18, allowedLeadingZeros = 3 } = params;
  const leadingZeros = countLeadingZeros(Number(number));
  const valueAfterZeros = getValueAfterLeadingZeros(Number(number));
  if (number?.toString().includes("e+") || Number(number) >= 1 || leadingZeros <= allowedLeadingZeros) {
    return shortenNumber(number, "");
  }
  let numberToDisplay;
  numberToDisplay = Number(number).toFixed(maxDecimals);
  numberToDisplay = applyDecimals(handleScientificNotation(number));
  numberToDisplay = commify(numberToDisplay);
  return ["0.0", getSubscriptCharacter(leadingZeros), valueAfterZeros].join("");
}

var name = "@bitagent/sdk";
var files = [
	"./dist/**/*",
	"./src/**/*"
];
var type = "module";
var license = "BSD-3-Clause";
var version = "1.2.6";
var main = "./dist/index.cjs";
var module$1 = "./dist/index.mjs";
var types = "./dist/index.d.ts";
var browser = {
	"./dist/index.mjs": "./dist/index.mjs",
	"./dist/index.cjs": "./dist/index.cjs"
};
var exports$1 = {
	".": {
		"import": "./dist/index.mjs",
		require: "./dist/index.cjs",
		"default": "./dist/index.mjs",
		types: "./dist/index.d.ts"
	},
	"./node": {
		"import": "./dist/node.mjs",
		require: "./dist/node.cjs",
		"default": "./dist/node.cjs",
		types: "./dist/index.d.ts"
	}
};
var scripts = {
	"docs:deploy": "",
	build: "npm run purge && npx pkgroll",
	prepublishOnly: "git push && npm run build",
	purge: "npx rimraf ./dist",
	test: "npx bun test",
	"test:watch": "npx bun test --watch",
	hardhat: "NODE_ENV=hardhat npx bun test hardhat"
};
var devDependencies = {
	"@nomicfoundation/hardhat-toolbox": "^4.0.0",
	"@nomicfoundation/hardhat-viem": "^2.0.0",
	"@openzeppelin/contracts": "^5.0.2",
	"@rollup/plugin-alias": "^5.1.0",
	"@rollup/plugin-dynamic-import-vars": "^2.1.2",
	"@rollup/plugin-terser": "^0.4.4",
	"@rollup/plugin-typescript": "^11.1.6",
	"@types/bun": "^1.0.8",
	"@typescript-eslint/eslint-plugin": "^7.1.0",
	"@typescript-eslint/parser": "^7.1.0",
	bun: "^1.0.25",
	eslint: "^8.57.0",
	"eslint-config-prettier": "^9.1.0",
	hardhat: "^2.20.1",
	pkgroll: "^2.0.1",
	prettier: "^3.2.5",
	rimraf: "^5.0.5",
	"ts-node": "^10.9.2",
	typescript: "^5.0.4"
};
var dependencies = {
	"@rollup/plugin-node-resolve": "^15.2.3",
	"@types/jsdom": "^21.1.6",
	"@types/lodash": "^4.14.202",
	abitype: "^1.0.0",
	"aws-sdk": "^2.1578.0",
	dotenv: "^16.4.5",
	jsdom: "^24.0.0",
	"ky-universal": "^0.12.0",
	lodash: "^4.17.21",
	merkletreejs: "^0.3.11",
	"pinata-web3": "^0.5.2",
	viem: "^2.32.0"
};
var pkg = {
	name: name,
	files: files,
	type: type,
	license: license,
	version: version,
	main: main,
	module: module$1,
	types: types,
	browser: browser,
	exports: exports$1,
	scripts: scripts,
	devDependencies: devDependencies,
	dependencies: dependencies
};

function wei(num, decimals = 18) {
  const stringified = handleScientificNotation(num.toString());
  return viem.parseUnits(stringified, decimals);
}
function getVersion() {
  return pkg.version;
}

class BaseError extends Error {
  details;
  docsPath;
  metaMessages;
  shortMessage;
  name = "Error";
  version = getVersion();
  constructor(shortMessage, args = {}) {
    super();
    const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
    const docsPath = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
    this.message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      // ...(docsPath ? [`Docs: ${DOCUMENTATION_URL}/${docsPath}${args.docsSlug ? `#${args.docsSlug}` : ''}`] : []),
      ...details ? [`Details: ${details}`] : [],
      `Version: ${this.version}`
    ].join("\n");
    if (args.cause) this.cause = args.cause;
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
function walk(err, fn) {
  if (fn?.(err)) return err;
  if (err && typeof err === "object" && "cause" in err) return walk(err.cause, fn);
  return fn ? null : err;
}

class TokenAlreadyExistsError extends BaseError {
  constructor() {
    super("Token already exists", {
      docsPath: "docs/sdk/network/token"
    });
  }
}
class ChainNotSupportedError extends BaseError {
  constructor(chain) {
    super(`Chain ${chain} is not supported`);
  }
}
class SymbolNotDefinedError extends BaseError {
  constructor() {
    super("You must pass in a symbol, not an address to call the `create` function", {
      docsPath: "docs/sdk/network/token/create"
    });
  }
}
class InvalidImageProvidedError extends BaseError {
  constructor() {
    super(
      "You must provide a valid url for the media. It should be either a http/https url, or a CIDv0 or CIDv1 ipfs hash that starts with `ipfs://...`",
      {
        docsPath: "docs/sdk/network/nft/create"
      }
    );
  }
}
class PinataKeyNeededErrror extends BaseError {
  constructor() {
    super("You must provide a  PinataApiKey to upload Files to the IPFS", {
      docsPath: "docs/sdk/network/nft/create"
    });
  }
}
class NoEthereumProviderError extends BaseError {
  constructor() {
    super("window.ethereum not found", {
      docsPath: "docs/sdk/network/transactions"
    });
  }
}
class WalletNotConnectedError extends BaseError {
  constructor() {
    super("Wallet not connected", {
      docsPath: "docs/sdk/network/transactions"
    });
  }
}
class InvalidClientError extends BaseError {
  constructor() {
    super("Client with no chain was passed", {
      docsPath: "docs/sdk/network/transactions/withPublicClient"
    });
  }
}
class CreationError extends BaseError {
  constructor(message, extra) {
    super(message, {
      docsPath: "/docs/sdk/network/token/create",
      ...extra
    });
  }
}
class AirdropContainsInvalidWalletError extends BaseError {
  constructor() {
    super("Airdrop contains invalid wallet", {
      docsPath: "docs/sdk/network/token/createAirdrop"
    });
  }
}

const BOND_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenImplementation",
        type: "address"
      },
      {
        internalType: "address",
        name: "multiTokenImplementation",
        type: "address"
      },
      {
        internalType: "address",
        name: "protocolBeneficiary_",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "creationFee_",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxSteps",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "uniswapV3Factory_",
        type: "address"
      },
      {
        internalType: "address",
        name: "positionManager_",
        type: "address"
      },
      {
        internalType: "address",
        name: "rewardManager_",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "AddressEmptyCode",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "AddressInsufficientBalance",
    type: "error"
  },
  {
    inputs: [],
    name: "ERC1167FailedCreateClone",
    type: "error"
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_BOND__InvalidPaginationParameters",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__CreationFeeTransactionFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__ExceedMaxSupply",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__ExceedTotalSupply",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "MCV2_Bond__InvalidConstructorParams",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__InvalidCreationFee",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__InvalidCreatorAddress",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__InvalidCurrentSupply",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "MCV2_Bond__InvalidGraduateReserveAmount",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "MCV2_Bond__InvalidReserveToken",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "MCV2_Bond__InvalidStepParams",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__InvalidTokenAmount",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "MCV2_Bond__InvalidTokenCreationParams",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__PermissionDenied",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__SlippageLimitExceeded",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__SqrtPriceX96CalculationInvalidInput",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__SqrtPriceX96CalculationOverflow",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__TokenNotFound",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Bond__TokenSymbolAlreadyExists",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Royalty__InvalidParams",
    type: "error"
  },
  {
    inputs: [],
    name: "MCV2_Royalty__NothingToClaim",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "bits",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address"
      }
    ],
    name: "BondCreatorUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountBurned",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "reserveToken",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundAmount",
        type: "uint256"
      }
    ],
    name: "Burn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "CreationFeeUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountMinted",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "reserveToken",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reserveAmount",
        type: "uint256"
      }
    ],
    name: "Mint",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string"
      },
      {
        indexed: true,
        internalType: "address",
        name: "reserveToken",
        type: "address"
      }
    ],
    name: "MultiTokenCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "protocolBeneficiary",
        type: "address"
      }
    ],
    name: "ProtocolBeneficiaryUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "reserveToken",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "RoyaltyClaimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ratio",
        type: "uint256"
      }
    ],
    name: "RoyaltyRangeUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string"
      },
      {
        indexed: true,
        internalType: "address",
        name: "reserveToken",
        type: "address"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "agenthash",
        type: "bytes32"
      }
    ],
    name: "TokenCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "reserveToken",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reserveTokenAmount",
        type: "uint256"
      }
    ],
    name: "TokenGraduated",
    type: "event"
  },
  {
    inputs: [],
    name: "BURN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokensToBurn",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "minRefund",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "reserveToken",
        type: "address"
      }
    ],
    name: "burnRoyalties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenBalance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "reserveTokenBalance",
        type: "uint256"
      }
    ],
    name: "calculateSqrtPriceX96",
    outputs: [
      {
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "reserveToken",
        type: "address"
      }
    ],
    name: "claimRoyalties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "string",
            name: "uri",
            type: "string"
          }
        ],
        internalType: "struct MCV2_Bond.MultiTokenParams",
        name: "tp",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "mintRoyalty",
            type: "uint16"
          },
          {
            internalType: "uint16",
            name: "burnRoyalty",
            type: "uint16"
          },
          {
            internalType: "address",
            name: "reserveToken",
            type: "address"
          },
          {
            internalType: "uint128",
            name: "maxSupply",
            type: "uint128"
          },
          {
            internalType: "uint128[]",
            name: "stepRanges",
            type: "uint128[]"
          },
          {
            internalType: "uint128[]",
            name: "stepPrices",
            type: "uint128[]"
          }
        ],
        internalType: "struct MCV2_Bond.BondParams",
        name: "bp",
        type: "tuple"
      }
    ],
    name: "createMultiToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "bytes32",
            name: "agentHash",
            type: "bytes32"
          }
        ],
        internalType: "struct MCV2_Bond.TokenParams",
        name: "tp",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "mintRoyalty",
            type: "uint16"
          },
          {
            internalType: "uint16",
            name: "burnRoyalty",
            type: "uint16"
          },
          {
            internalType: "address",
            name: "reserveToken",
            type: "address"
          },
          {
            internalType: "uint128",
            name: "maxSupply",
            type: "uint128"
          },
          {
            internalType: "uint128[]",
            name: "stepRanges",
            type: "uint128[]"
          },
          {
            internalType: "uint128[]",
            name: "stepPrices",
            type: "uint128[]"
          }
        ],
        internalType: "struct MCV2_Bond.BondParams",
        name: "bp",
        type: "tuple"
      }
    ],
    name: "createToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "creationFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "getDetail",
    outputs: [
      {
        components: [
          {
            internalType: "uint16",
            name: "mintRoyalty",
            type: "uint16"
          },
          {
            internalType: "uint16",
            name: "burnRoyalty",
            type: "uint16"
          },
          {
            components: [
              {
                internalType: "address",
                name: "creator",
                type: "address"
              },
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint8",
                name: "decimals",
                type: "uint8"
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string"
              },
              {
                internalType: "string",
                name: "name",
                type: "string"
              },
              {
                internalType: "uint40",
                name: "createdAt",
                type: "uint40"
              },
              {
                internalType: "uint128",
                name: "currentSupply",
                type: "uint128"
              },
              {
                internalType: "uint128",
                name: "maxSupply",
                type: "uint128"
              },
              {
                internalType: "uint128",
                name: "priceForNextMint",
                type: "uint128"
              },
              {
                internalType: "address",
                name: "reserveToken",
                type: "address"
              },
              {
                internalType: "uint8",
                name: "reserveDecimals",
                type: "uint8"
              },
              {
                internalType: "string",
                name: "reserveSymbol",
                type: "string"
              },
              {
                internalType: "string",
                name: "reserveName",
                type: "string"
              },
              {
                internalType: "uint256",
                name: "reserveBalance",
                type: "uint256"
              }
            ],
            internalType: "struct MCV2_Bond.BondInfo",
            name: "info",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "uint128",
                name: "rangeTo",
                type: "uint128"
              },
              {
                internalType: "uint128",
                name: "price",
                type: "uint128"
              }
            ],
            internalType: "struct MCV2_Bond.BondStep[]",
            name: "steps",
            type: "tuple[]"
          }
        ],
        internalType: "struct MCV2_Bond.BondDetail",
        name: "detail",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "stop",
        type: "uint256"
      }
    ],
    name: "getList",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address"
          },
          {
            internalType: "address",
            name: "token",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "decimals",
            type: "uint8"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "uint40",
            name: "createdAt",
            type: "uint40"
          },
          {
            internalType: "uint128",
            name: "currentSupply",
            type: "uint128"
          },
          {
            internalType: "uint128",
            name: "maxSupply",
            type: "uint128"
          },
          {
            internalType: "uint128",
            name: "priceForNextMint",
            type: "uint128"
          },
          {
            internalType: "address",
            name: "reserveToken",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "reserveDecimals",
            type: "uint8"
          },
          {
            internalType: "string",
            name: "reserveSymbol",
            type: "string"
          },
          {
            internalType: "string",
            name: "reserveName",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "reserveBalance",
            type: "uint256"
          }
        ],
        internalType: "struct MCV2_Bond.BondInfo[]",
        name: "info",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokensToBurn",
        type: "uint256"
      }
    ],
    name: "getRefundForTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "refundAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "royalty",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokensToMint",
        type: "uint256"
      }
    ],
    name: "getReserveForToken",
    outputs: [
      {
        internalType: "uint256",
        name: "reserveAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "royalty",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address"
      },
      {
        internalType: "address",
        name: "reserveToken",
        type: "address"
      }
    ],
    name: "getRoyaltyInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "getSteps",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "rangeTo",
            type: "uint128"
          },
          {
            internalType: "uint128",
            name: "price",
            type: "uint128"
          }
        ],
        internalType: "struct MCV2_Bond.BondStep[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "stop",
        type: "uint256"
      }
    ],
    name: "getTokensByCreator",
    outputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "reserveToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "stop",
        type: "uint256"
      }
    ],
    name: "getTokensByReserveToken",
    outputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxRoyaltyRange",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokensToMint",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxReserveAmount",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "positionManager",
    outputs: [
      {
        internalType: "contract INonfungiblePositionManager",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "priceForNextMint",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "protocolBeneficiary",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "tokenBond",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address"
      },
      {
        internalType: "uint16",
        name: "mintRoyalty",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "burnRoyalty",
        type: "uint16"
      },
      {
        internalType: "uint40",
        name: "createdAt",
        type: "uint40"
      },
      {
        internalType: "address",
        name: "reserveToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "reserveBalance",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "tokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "tokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "uniswapV3Factory",
    outputs: [
      {
        internalType: "contract IUniswapV3Factory",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "creator",
        type: "address"
      }
    ],
    name: "updateBondCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "updateCreationFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "maxSupply",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "graduateMcap",
            type: "uint256"
          },
          {
            internalType: "int24",
            name: "poolTickSpacing",
            type: "int24"
          },
          {
            internalType: "uint24",
            name: "poolFee",
            type: "uint24"
          }
        ],
        internalType: "struct MCV2_Bond.GraduationSettings",
        name: "newSettings_",
        type: "tuple"
      }
    ],
    name: "updateGraduationSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "ratio",
        type: "uint256"
      }
    ],
    name: "updateMaxRoyaltyRange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "protocolBeneficiary_",
        type: "address"
      }
    ],
    name: "updateProtocolBeneficiary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newManager",
        type: "address"
      }
    ],
    name: "updateRewardManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userTokenRoyaltyBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userTokenRoyaltyClaimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];

const ERC1155_ABI = [
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "ERC1155InsufficientBalance",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC1155InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      { internalType: "uint256", name: "idsLength", type: "uint256" },
      { internalType: "uint256", name: "valuesLength", type: "uint256" }
    ],
    name: "ERC1155InvalidArrayLength",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "ERC1155InvalidOperator",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC1155InvalidReceiver",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC1155InvalidSender",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "address", name: "owner", type: "address" }
    ],
    name: "ERC1155MissingApprovalForAll",
    type: "error"
  },
  { inputs: [], name: "MCV2_MultiToken__AlreadyInitialized", type: "error" },
  {
    inputs: [],
    name: "MCV2_MultiToken__BurnAmountExceedsTotalSupply",
    type: "error"
  },
  { inputs: [], name: "MCV2_MultiToken__NotApproved", type: "error" },
  { inputs: [], name: "MCV2_MultiToken__PermissionDenied", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]"
      }
    ],
    name: "TransferBatch",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "TransferSingle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "value", type: "string" },
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" }
    ],
    name: "URI",
    type: "event"
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" }
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "accounts", type: "address[]" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" }
    ],
    name: "balanceOfBatch",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bond",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "burnByBond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
      { internalType: "string", name: "uri_", type: "string" }
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "address", name: "operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "mintByBond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "values", type: "uint256[]" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "uri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  }
];

const ERC20_ABI = [
  {
    type: "function",
    name: "agentHash",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" }
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "bond",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "burnByBond",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "init",
    inputs: [
      { name: "name_", type: "string", internalType: "string" },
      { name: "symbol_", type: "string", internalType: "string" },
      { name: "agentHash_", type: "bytes32", internalType: "bytes32" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "mintByBond",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "spender", type: "address", indexed: true, internalType: "address" },
      { name: "value", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "value", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  },
  {
    type: "error",
    name: "ERC20InsufficientAllowance",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "allowance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" }
    ]
  },
  {
    type: "error",
    name: "ERC20InsufficientBalance",
    inputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" }
    ]
  },
  {
    type: "error",
    name: "ERC20InvalidApprover",
    inputs: [{ name: "approver", type: "address", internalType: "address" }]
  },
  {
    type: "error",
    name: "ERC20InvalidReceiver",
    inputs: [{ name: "receiver", type: "address", internalType: "address" }]
  },
  { type: "error", name: "ERC20InvalidSender", inputs: [{ name: "sender", type: "address", internalType: "address" }] },
  {
    type: "error",
    name: "ERC20InvalidSpender",
    inputs: [{ name: "spender", type: "address", internalType: "address" }]
  },
  { type: "error", name: "MCV2_Token__AlreadyInitialized", inputs: [] },
  { type: "error", name: "MCV2_Token__PermissionDenied", inputs: [] }
];

const LOCKER_ABI = [
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error"
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "LockUp__AlreadyClaimed", type: "error" },
  { inputs: [], name: "LockUp__InvalidPaginationParameters", type: "error" },
  {
    inputs: [{ internalType: "string", name: "param", type: "string" }],
    name: "LockUp__InvalidParams",
    type: "error"
  },
  { inputs: [], name: "LockUp__NotYetUnlocked", type: "error" },
  { inputs: [], name: "LockUp__PermissionDenied", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "lockUpId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      { indexed: false, internalType: "bool", name: "isERC20", type: "bool" },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint40",
        name: "unlockTime",
        type: "uint40"
      }
    ],
    name: "LockedUp",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "lockUpId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      { indexed: false, internalType: "bool", name: "isERC20", type: "bool" },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Unlocked",
    type: "event"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bool", name: "isERC20", type: "bool" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint40", name: "unlockTime", type: "uint40" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "string", name: "title", type: "string" }
    ],
    name: "createLockUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "stop", type: "uint256" }
    ],
    name: "getLockUpIdsByReceiver",
    outputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "stop", type: "uint256" }
    ],
    name: "getLockUpIdsByToken",
    outputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lockUpCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "lockUps",
    outputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bool", name: "isERC20", type: "bool" },
      { internalType: "uint40", name: "unlockTime", type: "uint40" },
      { internalType: "bool", name: "unlocked", type: "bool" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "string", name: "title", type: "string" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "lockUpId", type: "uint256" }],
    name: "unlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const MERKLE_ABI = [
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error"
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "MerkleDistributor__AlreadyClaimed", type: "error" },
  { inputs: [], name: "MerkleDistributor__AlreadyRefunded", type: "error" },
  { inputs: [], name: "MerkleDistributor__Finished", type: "error" },
  { inputs: [], name: "MerkleDistributor__InvalidCaller", type: "error" },
  {
    inputs: [],
    name: "MerkleDistributor__InvalidPaginationParameters",
    type: "error"
  },
  {
    inputs: [{ internalType: "string", name: "param", type: "string" }],
    name: "MerkleDistributor__InvalidParams",
    type: "error"
  },
  { inputs: [], name: "MerkleDistributor__InvalidProof", type: "error" },
  {
    inputs: [],
    name: "MerkleDistributor__NoClaimableTokensLeft",
    type: "error"
  },
  { inputs: [], name: "MerkleDistributor__NotStarted", type: "error" },
  { inputs: [], name: "MerkleDistributor__NothingToRefund", type: "error" },
  { inputs: [], name: "MerkleDistributor__PermissionDenied", type: "error" },
  { inputs: [], name: "MerkleDistributor__Refunded", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "distributionId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Claimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "distributionId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      { indexed: false, internalType: "bool", name: "isERC20", type: "bool" },
      {
        indexed: false,
        internalType: "uint40",
        name: "startTime",
        type: "uint40"
      }
    ],
    name: "Created",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "distributionId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Refunded",
    type: "event"
  },
  {
    inputs: [
      { internalType: "uint256", name: "distributionId", type: "uint256" },
      { internalType: "bytes32[]", name: "merkleProof", type: "bytes32[]" }
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bool", name: "isERC20", type: "bool" },
      { internalType: "uint176", name: "amountPerClaim", type: "uint176" },
      { internalType: "uint40", name: "walletCount", type: "uint40" },
      { internalType: "uint40", name: "startTime", type: "uint40" },
      { internalType: "uint40", name: "endTime", type: "uint40" },
      { internalType: "bytes32", name: "merkleRoot", type: "bytes32" },
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "ipfsCID", type: "string" }
    ],
    name: "createDistribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "distributionCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "distributions",
    outputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bool", name: "isERC20", type: "bool" },
      { internalType: "uint40", name: "walletCount", type: "uint40" },
      { internalType: "uint40", name: "claimedCount", type: "uint40" },
      { internalType: "uint176", name: "amountPerClaim", type: "uint176" },
      { internalType: "uint40", name: "startTime", type: "uint40" },
      { internalType: "uint40", name: "endTime", type: "uint40" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint40", name: "refundedAt", type: "uint40" },
      { internalType: "bytes32", name: "merkleRoot", type: "bytes32" },
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "ipfsCID", type: "string" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "distributionId", type: "uint256" }],
    name: "getAmountClaimed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "distributionId", type: "uint256" }],
    name: "getAmountLeft",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "stop", type: "uint256" }
    ],
    name: "getDistributionIdsByOwner",
    outputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "stop", type: "uint256" }
    ],
    name: "getDistributionIdsByToken",
    outputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "distributionId", type: "uint256" },
      { internalType: "address", name: "wallet", type: "address" }
    ],
    name: "isClaimed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "distributionId", type: "uint256" }],
    name: "isWhitelistOnly",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "distributionId", type: "uint256" },
      { internalType: "address", name: "wallet", type: "address" },
      { internalType: "bytes32[]", name: "merkleProof", type: "bytes32[]" }
    ],
    name: "isWhitelisted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "distributionId", type: "uint256" }],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const ONEINCH_ABI = [
  {
    inputs: [
      {
        internalType: "contract MultiWrapper",
        name: "_multiWrapper",
        type: "address"
      },
      {
        internalType: "contract IOracle[]",
        name: "existingOracles",
        type: "address[]"
      },
      {
        internalType: "enum OffchainOracle.OracleType[]",
        name: "oracleTypes",
        type: "uint8[]"
      },
      {
        internalType: "contract IERC20[]",
        name: "existingConnectors",
        type: "address[]"
      },
      { internalType: "contract IERC20", name: "wBase", type: "address" },
      { internalType: "address", name: "owner", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { inputs: [], name: "ArraysLengthMismatch", type: "error" },
  { inputs: [], name: "ConnectorAlreadyAdded", type: "error" },
  { inputs: [], name: "InvalidOracleTokenKind", type: "error" },
  { inputs: [], name: "OracleAlreadyAdded", type: "error" },
  { inputs: [], name: "SameTokens", type: "error" },
  { inputs: [], name: "TooBigThreshold", type: "error" },
  { inputs: [], name: "UnknownConnector", type: "error" },
  { inputs: [], name: "UnknownOracle", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "connector",
        type: "address"
      }
    ],
    name: "ConnectorAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "connector",
        type: "address"
      }
    ],
    name: "ConnectorRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract MultiWrapper",
        name: "multiWrapper",
        type: "address"
      }
    ],
    name: "MultiWrapperUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IOracle",
        name: "oracle",
        type: "address"
      },
      {
        indexed: false,
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleType",
        type: "uint8"
      }
    ],
    name: "OracleAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IOracle",
        name: "oracle",
        type: "address"
      },
      {
        indexed: false,
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleType",
        type: "uint8"
      }
    ],
    name: "OracleRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [{ internalType: "contract IERC20", name: "connector", type: "address" }],
    name: "addConnector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IOracle", name: "oracle", type: "address" },
      {
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleKind",
        type: "uint8"
      }
    ],
    name: "addOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "connectors",
    outputs: [
      {
        internalType: "contract IERC20[]",
        name: "allConnectors",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "contract IERC20", name: "dstToken", type: "address" },
      { internalType: "bool", name: "useWrappers", type: "bool" }
    ],
    name: "getRate",
    outputs: [{ internalType: "uint256", name: "weightedRate", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "bool", name: "useSrcWrappers", type: "bool" }
    ],
    name: "getRateToEth",
    outputs: [{ internalType: "uint256", name: "weightedRate", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "bool", name: "useSrcWrappers", type: "bool" },
      {
        internalType: "contract IERC20[]",
        name: "customConnectors",
        type: "address[]"
      },
      { internalType: "uint256", name: "thresholdFilter", type: "uint256" }
    ],
    name: "getRateToEthWithCustomConnectors",
    outputs: [{ internalType: "uint256", name: "weightedRate", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "bool", name: "useSrcWrappers", type: "bool" },
      { internalType: "uint256", name: "thresholdFilter", type: "uint256" }
    ],
    name: "getRateToEthWithThreshold",
    outputs: [{ internalType: "uint256", name: "weightedRate", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "contract IERC20", name: "dstToken", type: "address" },
      { internalType: "bool", name: "useWrappers", type: "bool" },
      {
        internalType: "contract IERC20[]",
        name: "customConnectors",
        type: "address[]"
      },
      { internalType: "uint256", name: "thresholdFilter", type: "uint256" }
    ],
    name: "getRateWithCustomConnectors",
    outputs: [{ internalType: "uint256", name: "weightedRate", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "srcToken", type: "address" },
      { internalType: "contract IERC20", name: "dstToken", type: "address" },
      { internalType: "bool", name: "useWrappers", type: "bool" },
      { internalType: "uint256", name: "thresholdFilter", type: "uint256" }
    ],
    name: "getRateWithThreshold",
    outputs: [{ internalType: "uint256", name: "weightedRate", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "multiWrapper",
    outputs: [{ internalType: "contract MultiWrapper", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "oracles",
    outputs: [
      {
        internalType: "contract IOracle[]",
        name: "allOracles",
        type: "address[]"
      },
      {
        internalType: "enum OffchainOracle.OracleType[]",
        name: "oracleTypes",
        type: "uint8[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "contract IERC20", name: "connector", type: "address" }],
    name: "removeConnector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IOracle", name: "oracle", type: "address" },
      {
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleKind",
        type: "uint8"
      }
    ],
    name: "removeOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract MultiWrapper",
        name: "_multiWrapper",
        type: "address"
      }
    ],
    name: "setMultiWrapper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const ZAP_ABI = [
  {
    inputs: [
      { internalType: "address", name: "bondAddress", type: "address" },
      { internalType: "address", name: "wethAddress", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error"
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "MCV2_ZapV1__EthTransferFailed", type: "error" },
  { inputs: [], name: "MCV2_ZapV1__InvalidReceiver", type: "error" },
  { inputs: [], name: "MCV2_ZapV1__ReserveIsNotWETH", type: "error" },
  { inputs: [], name: "MCV2_ZapV1__SlippageLimitExceeded", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "BOND",
    outputs: [{ internalType: "contract MCV2_Bond", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "contract IWETH", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "tokensToBurn", type: "uint256" },
      { internalType: "uint256", name: "minRefund", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" }
    ],
    name: "burnToEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "tokensToMint", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" }
    ],
    name: "mintWithEth",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "rescueETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];

const SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.optimism.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.optimismSepolia.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.arbitrum.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.avalanche.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.polygon.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.bsc.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.bscTestnet.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.base.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.baseSepolia.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.sepolia.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.blast.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.blastSepolia.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.avalancheFuji.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.degen.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.cyberTestnet.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.kaia.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.cyber.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.ham.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.optimism.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.optimismSepolia.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.arbitrum.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.avalanche.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.polygon.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.bsc.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.bscTestnet.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.base.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.baseSepolia.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.sepolia.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.blast.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.blastSepolia.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.avalancheFuji.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.degen.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.cyberTestnet.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.kaia.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.cyber.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.ham.id]: "0x187E536C5404dD472476B9e4C716878d359a506A"
  },
  BOND: {
    [chains.mainnet.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.optimism.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.optimismSepolia.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.arbitrum.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.avalanche.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.polygon.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.bsc.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.bscTestnet.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.base.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.baseSepolia.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.sepolia.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.blast.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.blastSepolia.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.avalancheFuji.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.degen.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.cyberTestnet.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.kaia.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.cyber.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B",
    [chains.ham.id]: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B"
  },
  ZAP: {
    [chains.mainnet.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.optimism.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.optimismSepolia.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.arbitrum.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.avalanche.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.polygon.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.bsc.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.bscTestnet.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.base.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.baseSepolia.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.sepolia.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.blast.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.blastSepolia.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.avalancheFuji.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.degen.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.cyberTestnet.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.kaia.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.cyber.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.ham.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537"
  },
  LOCKER: {
    [chains.mainnet.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.optimism.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.optimismSepolia.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.arbitrum.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.avalanche.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.polygon.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.bsc.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.bscTestnet.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.base.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.baseSepolia.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.sepolia.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.blast.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.blastSepolia.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.avalancheFuji.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.degen.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.cyberTestnet.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.kaia.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.cyber.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867",
    [chains.ham.id]: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867"
  },
  MERKLE: {
    [chains.mainnet.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.optimism.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.optimismSepolia.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.arbitrum.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.avalanche.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.polygon.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.bsc.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.bscTestnet.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.base.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.baseSepolia.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.sepolia.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.blast.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.blastSepolia.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.avalancheFuji.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.degen.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.cyberTestnet.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.kaia.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.cyber.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225",
    [chains.ham.id]: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const V2_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.optimism.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.optimismSepolia.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.arbitrum.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.avalanche.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.polygon.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.bsc.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.bscTestnet.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.base.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.baseSepolia.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.sepolia.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.blast.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.blastSepolia.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.avalancheFuji.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.degen.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.cyberTestnet.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.kaia.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.cyber.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a",
    [chains.ham.id]: "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.optimism.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.optimismSepolia.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.arbitrum.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.avalanche.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.polygon.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.bsc.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.bscTestnet.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.base.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.baseSepolia.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.sepolia.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.blast.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.blastSepolia.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.avalancheFuji.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.degen.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.cyberTestnet.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.kaia.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.cyber.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3",
    [chains.ham.id]: "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3"
  },
  BOND: {
    [chains.mainnet.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.optimism.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.optimismSepolia.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.arbitrum.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.avalanche.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.polygon.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.bsc.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.bscTestnet.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.base.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.baseSepolia.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.sepolia.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.blast.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.blastSepolia.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.avalancheFuji.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.degen.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.cyberTestnet.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.kaia.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.cyber.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868",
    [chains.ham.id]: "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868"
  },
  ZAP: {
    [chains.mainnet.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.optimism.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.optimismSepolia.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.arbitrum.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.avalanche.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.polygon.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.bsc.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.bscTestnet.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.base.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.baseSepolia.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.sepolia.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.blast.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.blastSepolia.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.avalancheFuji.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.degen.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.cyberTestnet.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.kaia.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.cyber.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06",
    [chains.ham.id]: "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.optimism.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.optimismSepolia.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.arbitrum.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.avalanche.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.polygon.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.bsc.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.bscTestnet.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.base.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.baseSepolia.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.sepolia.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.blast.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.blastSepolia.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.avalancheFuji.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.degen.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.cyberTestnet.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.kaia.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.cyber.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9",
    [chains.ham.id]: "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.optimism.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.optimismSepolia.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.arbitrum.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.avalanche.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.polygon.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.bsc.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.bscTestnet.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.base.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.baseSepolia.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.sepolia.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.blast.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.blastSepolia.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.avalancheFuji.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.degen.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.cyberTestnet.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.kaia.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.cyber.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604",
    [chains.ham.id]: "0x3e1C761024e1f93959F409641E8e0AbC63333604"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const V3_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.optimism.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.optimismSepolia.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.arbitrum.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.avalanche.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.polygon.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.bsc.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.bscTestnet.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.base.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.baseSepolia.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.sepolia.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.blast.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.blastSepolia.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.avalancheFuji.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.degen.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.cyberTestnet.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.kaia.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.cyber.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa",
    [chains.ham.id]: "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.optimism.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.optimismSepolia.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.arbitrum.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.avalanche.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.polygon.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.bsc.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.bscTestnet.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.base.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.baseSepolia.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.sepolia.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.blast.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.blastSepolia.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.avalancheFuji.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.degen.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.cyberTestnet.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.kaia.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.cyber.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60",
    [chains.ham.id]: "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60"
  },
  BOND: {
    [chains.mainnet.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.optimism.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.optimismSepolia.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.arbitrum.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.avalanche.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.polygon.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.bsc.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.bscTestnet.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.base.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.baseSepolia.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.sepolia.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.blast.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.blastSepolia.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.avalancheFuji.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.degen.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.cyberTestnet.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.kaia.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.cyber.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E",
    [chains.ham.id]: "0xdcd4D5CE277A5F48E478967e21105DF29453009E"
  },
  ZAP: {
    [chains.mainnet.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.optimism.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.optimismSepolia.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.arbitrum.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.avalanche.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.polygon.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.bsc.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.bscTestnet.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.base.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.baseSepolia.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.sepolia.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.blast.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.blastSepolia.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.avalancheFuji.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.degen.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.cyberTestnet.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.kaia.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.cyber.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586",
    [chains.ham.id]: "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.optimism.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.optimismSepolia.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.arbitrum.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.avalanche.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.polygon.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.bsc.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.bscTestnet.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.base.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.baseSepolia.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.sepolia.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.blast.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.blastSepolia.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.avalancheFuji.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.degen.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.cyberTestnet.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.kaia.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.cyber.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92",
    [chains.ham.id]: "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92"
  },
  MERKLE: {
    [chains.mainnet.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.optimism.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.optimismSepolia.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.arbitrum.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.avalanche.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.polygon.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.bsc.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.bscTestnet.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.base.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.baseSepolia.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.sepolia.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.blast.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.blastSepolia.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.avalancheFuji.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.degen.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.cyberTestnet.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.kaia.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.cyber.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85",
    [chains.ham.id]: "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const V31_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.optimism.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.optimismSepolia.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.arbitrum.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.avalanche.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.polygon.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.bsc.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.bscTestnet.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.base.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.baseSepolia.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.sepolia.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.blast.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.blastSepolia.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.avalancheFuji.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.degen.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.cyberTestnet.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.kaia.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.cyber.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af",
    [chains.ham.id]: "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.optimism.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.optimismSepolia.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.arbitrum.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.avalanche.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.polygon.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.bsc.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.bscTestnet.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.base.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.baseSepolia.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.sepolia.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.blast.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.blastSepolia.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.avalancheFuji.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.degen.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.cyberTestnet.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.kaia.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.cyber.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412",
    [chains.ham.id]: "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412"
  },
  BOND: {
    [chains.mainnet.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.optimism.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.optimismSepolia.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.arbitrum.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.avalanche.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.polygon.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.bsc.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.bscTestnet.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.base.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.baseSepolia.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.sepolia.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.blast.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.blastSepolia.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.avalancheFuji.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.degen.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.cyberTestnet.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.kaia.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.cyber.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d",
    [chains.ham.id]: "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d"
  },
  ZAP: {
    [chains.mainnet.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.optimism.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.optimismSepolia.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.arbitrum.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.avalanche.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.polygon.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.bsc.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.bscTestnet.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.base.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.baseSepolia.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.sepolia.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.blast.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.blastSepolia.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.avalancheFuji.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.degen.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.cyberTestnet.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.kaia.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.cyber.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5",
    [chains.ham.id]: "0xD073656c90A22FB4C87409957496D2d4359200d5"
  },
  LOCKER: {
    [chains.mainnet.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.optimism.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.optimismSepolia.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.arbitrum.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.avalanche.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.polygon.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.bsc.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.bscTestnet.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.base.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.baseSepolia.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.sepolia.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.blast.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.blastSepolia.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.avalancheFuji.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.degen.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.cyberTestnet.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.kaia.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.cyber.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5",
    [chains.ham.id]: "0xb1303bCc370057AE779FF6D4cCA86537574806f5"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.optimism.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.optimismSepolia.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.arbitrum.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.avalanche.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.polygon.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.bsc.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.bscTestnet.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.base.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.baseSepolia.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.sepolia.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.blast.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.blastSepolia.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.avalancheFuji.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.degen.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.cyberTestnet.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.kaia.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.cyber.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887",
    [chains.ham.id]: "0x6284b6f50BE9be1421239D0797FA7BeED45B2887"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v4_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.optimism.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.optimismSepolia.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.arbitrum.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.avalanche.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.polygon.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.bsc.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.bscTestnet.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.base.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.baseSepolia.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.sepolia.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.blast.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.blastSepolia.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.avalancheFuji.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.degen.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.cyberTestnet.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.kaia.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.cyber.id]: "0xC846B4791cf6BA661475f073c39ec51779048755",
    [chains.ham.id]: "0xC846B4791cf6BA661475f073c39ec51779048755"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.optimism.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.optimismSepolia.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.arbitrum.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.avalanche.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.polygon.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.bsc.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.bscTestnet.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.base.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.baseSepolia.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.sepolia.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.blast.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.blastSepolia.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.avalancheFuji.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.degen.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.cyberTestnet.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.kaia.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.cyber.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886",
    [chains.ham.id]: "0x5B905d22761dc9737ABEe1B642067676804Bf886"
  },
  BOND: {
    [chains.mainnet.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.optimism.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.optimismSepolia.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.arbitrum.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.avalanche.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.polygon.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.bsc.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.bscTestnet.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.base.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.baseSepolia.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.sepolia.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.blast.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.blastSepolia.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.avalancheFuji.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.degen.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.cyberTestnet.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.kaia.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.cyber.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c",
    [chains.ham.id]: "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c"
  },
  ZAP: {
    [chains.mainnet.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.optimism.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.optimismSepolia.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.arbitrum.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.avalanche.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.polygon.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.bsc.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.bscTestnet.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.base.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.baseSepolia.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.sepolia.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.blast.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.blastSepolia.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.avalancheFuji.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.degen.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.cyberTestnet.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.kaia.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.cyber.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04",
    [chains.ham.id]: "0x307567862AEA0291dbeecBC1019d9c54eDf15F04"
  },
  LOCKER: {
    [chains.mainnet.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.optimism.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.optimismSepolia.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.arbitrum.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.avalanche.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.polygon.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.bsc.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.bscTestnet.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.base.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.baseSepolia.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.sepolia.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.blast.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.blastSepolia.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.avalancheFuji.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.degen.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.cyberTestnet.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.kaia.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.cyber.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528",
    [chains.ham.id]: "0xb533C387107b1cecbB0bc3cC5444044C41B76528"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.optimism.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.optimismSepolia.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.arbitrum.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.avalanche.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.polygon.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.bsc.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.bscTestnet.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.base.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.baseSepolia.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.sepolia.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.blast.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.blastSepolia.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.avalancheFuji.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.degen.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.cyberTestnet.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.kaia.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.cyber.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6",
    [chains.ham.id]: "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v5_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.optimism.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.optimismSepolia.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.arbitrum.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.avalanche.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.polygon.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.bsc.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.bscTestnet.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.base.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.baseSepolia.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.sepolia.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.blast.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.blastSepolia.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.avalancheFuji.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.degen.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.cyberTestnet.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.kaia.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.cyber.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e",
    [chains.ham.id]: "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.optimism.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.optimismSepolia.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.arbitrum.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.avalanche.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.polygon.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.bsc.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.bscTestnet.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.base.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.baseSepolia.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.sepolia.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.blast.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.blastSepolia.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.avalancheFuji.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.degen.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.cyberTestnet.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.kaia.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.cyber.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06",
    [chains.ham.id]: "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06"
  },
  BOND: {
    [chains.mainnet.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.optimism.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.optimismSepolia.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.arbitrum.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.avalanche.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.polygon.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.bsc.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.bscTestnet.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.base.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.baseSepolia.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.sepolia.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.blast.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.blastSepolia.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.avalancheFuji.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.degen.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.cyberTestnet.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.kaia.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.cyber.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC",
    [chains.ham.id]: "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC"
  },
  ZAP: {
    [chains.mainnet.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.optimism.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.optimismSepolia.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.arbitrum.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.avalanche.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.polygon.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.bsc.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.bscTestnet.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.base.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.baseSepolia.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.sepolia.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.blast.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.blastSepolia.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.avalancheFuji.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.degen.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.cyberTestnet.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.kaia.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.cyber.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657",
    [chains.ham.id]: "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.optimism.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.optimismSepolia.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.arbitrum.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.avalanche.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.polygon.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.bsc.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.bscTestnet.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.base.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.baseSepolia.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.sepolia.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.blast.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.blastSepolia.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.avalancheFuji.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.degen.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.cyberTestnet.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.kaia.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.cyber.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1",
    [chains.ham.id]: "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.optimism.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.optimismSepolia.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.arbitrum.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.avalanche.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.polygon.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.bsc.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.bscTestnet.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.base.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.baseSepolia.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.sepolia.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.blast.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.blastSepolia.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.avalancheFuji.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.degen.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.cyberTestnet.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.kaia.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.cyber.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60",
    [chains.ham.id]: "0x2b69fe0e1944398094900BA6260148f526Db6f60"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v6_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.optimism.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.optimismSepolia.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.arbitrum.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.avalanche.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.polygon.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.bsc.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.bscTestnet.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.base.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.baseSepolia.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.sepolia.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.blast.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.blastSepolia.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.avalancheFuji.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.degen.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.cyberTestnet.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.kaia.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.cyber.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D",
    [chains.ham.id]: "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.optimism.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.optimismSepolia.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.arbitrum.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.avalanche.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.polygon.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.bsc.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.bscTestnet.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.base.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.baseSepolia.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.sepolia.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.blast.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.blastSepolia.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.avalancheFuji.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.degen.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.cyberTestnet.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.kaia.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.cyber.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9",
    [chains.ham.id]: "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9"
  },
  BOND: {
    [chains.mainnet.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.optimism.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.optimismSepolia.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.arbitrum.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.avalanche.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.polygon.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.bsc.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.bscTestnet.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.base.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.baseSepolia.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.sepolia.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.blast.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.blastSepolia.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.avalancheFuji.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.degen.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.cyberTestnet.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.kaia.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.cyber.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5",
    [chains.ham.id]: "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5"
  },
  ZAP: {
    [chains.mainnet.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.optimism.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.optimismSepolia.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.arbitrum.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.avalanche.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.polygon.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.bsc.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.bscTestnet.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.base.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.baseSepolia.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.sepolia.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.blast.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.blastSepolia.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.avalancheFuji.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.degen.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.cyberTestnet.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.kaia.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.cyber.id]: "0x778175D18084085a672522ec2B13a7765385cC55",
    [chains.ham.id]: "0x778175D18084085a672522ec2B13a7765385cC55"
  },
  LOCKER: {
    [chains.mainnet.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.optimism.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.optimismSepolia.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.arbitrum.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.avalanche.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.polygon.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.bsc.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.bscTestnet.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.base.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.baseSepolia.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.sepolia.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.blast.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.blastSepolia.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.avalancheFuji.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.degen.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.cyberTestnet.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.kaia.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.cyber.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359",
    [chains.ham.id]: "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.optimism.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.optimismSepolia.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.arbitrum.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.avalanche.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.polygon.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.bsc.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.bscTestnet.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.base.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.baseSepolia.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.sepolia.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.blast.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.blastSepolia.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.avalancheFuji.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.degen.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.cyberTestnet.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.kaia.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.cyber.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb",
    [chains.ham.id]: "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v61_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.optimism.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.optimismSepolia.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.arbitrum.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.avalanche.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.polygon.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.bsc.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.bscTestnet.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.base.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.baseSepolia.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.sepolia.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.blast.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.blastSepolia.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.avalancheFuji.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.degen.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.cyberTestnet.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.kaia.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.cyber.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708",
    [chains.ham.id]: "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.optimism.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.optimismSepolia.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.arbitrum.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.avalanche.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.polygon.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.bsc.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.bscTestnet.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.base.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.baseSepolia.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.sepolia.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.blast.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.blastSepolia.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.avalancheFuji.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.degen.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.cyberTestnet.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.kaia.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.cyber.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA",
    [chains.ham.id]: "0x1569d719f41cE892d365b6a21D12E5980670AADA"
  },
  BOND: {
    [chains.mainnet.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.optimism.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.optimismSepolia.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.arbitrum.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.avalanche.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.polygon.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.bsc.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.bscTestnet.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.base.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.baseSepolia.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.sepolia.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.blast.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.blastSepolia.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.avalancheFuji.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.degen.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.cyberTestnet.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.kaia.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.cyber.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2",
    [chains.ham.id]: "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2"
  },
  ZAP: {
    [chains.mainnet.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.optimism.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.optimismSepolia.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.arbitrum.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.avalanche.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.polygon.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.bsc.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.bscTestnet.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.base.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.baseSepolia.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.sepolia.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.blast.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.blastSepolia.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.avalancheFuji.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.degen.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.cyberTestnet.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.kaia.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.cyber.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E",
    [chains.ham.id]: "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.optimism.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.optimismSepolia.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.arbitrum.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.avalanche.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.polygon.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.bsc.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.bscTestnet.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.base.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.baseSepolia.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.sepolia.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.blast.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.blastSepolia.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.avalancheFuji.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.degen.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.cyberTestnet.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.kaia.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.cyber.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437",
    [chains.ham.id]: "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.optimism.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.optimismSepolia.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.arbitrum.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.avalanche.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.polygon.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.bsc.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.bscTestnet.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.base.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.baseSepolia.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.sepolia.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.blast.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.blastSepolia.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.avalancheFuji.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.degen.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.cyberTestnet.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.kaia.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.cyber.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440",
    [chains.ham.id]: "0x814ECE214aD9e55A6B38056AE4758248B02E1440"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v7_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.optimism.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.optimismSepolia.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.arbitrum.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.avalanche.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.polygon.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.bsc.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.bscTestnet.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.base.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.baseSepolia.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.sepolia.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.blast.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.blastSepolia.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.avalancheFuji.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.degen.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.cyberTestnet.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.kaia.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.cyber.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61",
    [chains.ham.id]: "0xF5aEc523c65310721b03A5af4C24a0b887110a61"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.optimism.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.optimismSepolia.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.arbitrum.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.avalanche.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.polygon.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.bsc.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.bscTestnet.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.base.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.baseSepolia.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.sepolia.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.blast.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.blastSepolia.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.avalancheFuji.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.degen.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.cyberTestnet.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.kaia.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.cyber.id]: "0x04511963D497135275De7ce6651C413C2907EA7e",
    [chains.ham.id]: "0x04511963D497135275De7ce6651C413C2907EA7e"
  },
  BOND: {
    [chains.mainnet.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.optimism.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.optimismSepolia.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.arbitrum.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.avalanche.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.polygon.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.bsc.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.bscTestnet.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.base.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.baseSepolia.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.sepolia.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.blast.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.blastSepolia.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.avalancheFuji.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.degen.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.cyberTestnet.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.kaia.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.cyber.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c",
    [chains.ham.id]: "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c"
  },
  ZAP: {
    [chains.mainnet.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.optimism.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.optimismSepolia.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.arbitrum.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.avalanche.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.polygon.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.bsc.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.bscTestnet.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.base.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.baseSepolia.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.sepolia.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.blast.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.blastSepolia.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.avalancheFuji.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.degen.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.cyberTestnet.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.kaia.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.cyber.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1",
    [chains.ham.id]: "0xF12D17830190e8D97007a12873eF8dC562f0d1E1"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.optimism.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.optimismSepolia.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.arbitrum.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.avalanche.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.polygon.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.bsc.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.bscTestnet.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.base.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.baseSepolia.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.sepolia.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.blast.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.blastSepolia.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.avalancheFuji.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.degen.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.cyberTestnet.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.kaia.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.cyber.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C",
    [chains.ham.id]: "0x8B5216933ac3026C9DaCc18D3456427448952a2C"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.optimism.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.optimismSepolia.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.arbitrum.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.avalanche.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.polygon.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.bsc.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.bscTestnet.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.base.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.baseSepolia.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.sepolia.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.blast.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.blastSepolia.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.avalancheFuji.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.degen.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.cyberTestnet.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.kaia.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.cyber.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87",
    [chains.ham.id]: "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v71_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.optimism.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.optimismSepolia.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.arbitrum.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.avalanche.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.polygon.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.bsc.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.bscTestnet.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.base.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.baseSepolia.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.sepolia.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.blast.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.blastSepolia.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.avalancheFuji.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.degen.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.cyberTestnet.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.kaia.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.cyber.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77",
    [chains.ham.id]: "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.optimism.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.optimismSepolia.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.arbitrum.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.avalanche.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.polygon.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.bsc.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.bscTestnet.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.base.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.baseSepolia.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.sepolia.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.blast.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.blastSepolia.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.avalancheFuji.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.degen.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.cyberTestnet.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.kaia.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.cyber.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A",
    [chains.ham.id]: "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A"
  },
  BOND: {
    [chains.mainnet.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.optimism.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.optimismSepolia.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.arbitrum.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.avalanche.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.polygon.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.bsc.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.bscTestnet.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.base.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.baseSepolia.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.sepolia.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.blast.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.blastSepolia.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.avalancheFuji.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.degen.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.cyberTestnet.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.kaia.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.cyber.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e",
    [chains.ham.id]: "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e"
  },
  ZAP: {
    [chains.mainnet.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.optimism.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.optimismSepolia.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.arbitrum.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.avalanche.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.polygon.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.bsc.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.bscTestnet.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.base.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.baseSepolia.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.sepolia.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.blast.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.blastSepolia.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.avalancheFuji.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.degen.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.cyberTestnet.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.kaia.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.cyber.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076",
    [chains.ham.id]: "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.optimism.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.optimismSepolia.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.arbitrum.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.avalanche.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.polygon.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.bsc.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.bscTestnet.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.base.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.baseSepolia.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.sepolia.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.blast.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.blastSepolia.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.avalancheFuji.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.degen.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.cyberTestnet.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.kaia.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.cyber.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af",
    [chains.ham.id]: "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.optimism.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.optimismSepolia.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.arbitrum.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.avalanche.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.polygon.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.bsc.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.bscTestnet.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.base.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.baseSepolia.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.sepolia.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.blast.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.blastSepolia.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.avalancheFuji.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.degen.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.cyberTestnet.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.kaia.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.cyber.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5",
    [chains.ham.id]: "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v72_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.optimism.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.optimismSepolia.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.arbitrum.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.avalanche.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.polygon.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.bsc.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.bscTestnet.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.base.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.baseSepolia.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.sepolia.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.blast.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.blastSepolia.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.avalancheFuji.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.degen.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.cyberTestnet.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.kaia.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.cyber.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9",
    [chains.ham.id]: "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.optimism.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.optimismSepolia.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.arbitrum.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.avalanche.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.polygon.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.bsc.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.bscTestnet.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.base.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.baseSepolia.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.sepolia.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.blast.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.blastSepolia.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.avalancheFuji.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.degen.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.cyberTestnet.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.kaia.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.cyber.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6",
    [chains.ham.id]: "0xaF2F9318fF703374a720d4847F96d47bA4f965e6"
  },
  BOND: {
    [chains.mainnet.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.optimism.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.optimismSepolia.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.arbitrum.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.avalanche.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.polygon.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.bsc.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.bscTestnet.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.base.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.baseSepolia.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.sepolia.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.blast.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.blastSepolia.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.avalancheFuji.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.degen.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.cyberTestnet.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.kaia.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.cyber.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744",
    [chains.ham.id]: "0xce38aa12cE9d026fb72970B752E7693FAAD96744"
  },
  ZAP: {
    [chains.mainnet.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.optimism.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.optimismSepolia.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.arbitrum.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.avalanche.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.polygon.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.bsc.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.bscTestnet.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.base.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.baseSepolia.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.sepolia.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.blast.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.blastSepolia.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.avalancheFuji.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.degen.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.cyberTestnet.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.kaia.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.cyber.id]: "0x7150BA4ac053B023275780baf01887079d98f873",
    [chains.ham.id]: "0x7150BA4ac053B023275780baf01887079d98f873"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.optimism.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.optimismSepolia.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.arbitrum.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.avalanche.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.polygon.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.bsc.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.bscTestnet.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.base.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.baseSepolia.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.sepolia.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.blast.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.blastSepolia.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.avalancheFuji.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.degen.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.cyberTestnet.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.kaia.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.cyber.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F",
    [chains.ham.id]: "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.optimism.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.optimismSepolia.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.arbitrum.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.avalanche.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.polygon.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.bsc.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.bscTestnet.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.base.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.baseSepolia.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.sepolia.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.blast.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.blastSepolia.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.avalancheFuji.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.degen.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.cyberTestnet.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.kaia.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.cyber.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7",
    [chains.ham.id]: "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v73_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.optimism.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.optimismSepolia.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.arbitrum.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.avalanche.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.polygon.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.bsc.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.bscTestnet.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.base.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.baseSepolia.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.sepolia.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.blast.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.blastSepolia.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.avalancheFuji.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.degen.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.cyberTestnet.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.kaia.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.cyber.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad",
    [chains.ham.id]: "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.optimism.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.optimismSepolia.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.arbitrum.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.avalanche.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.polygon.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.bsc.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.bscTestnet.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.base.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.baseSepolia.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.sepolia.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.blast.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.blastSepolia.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.avalancheFuji.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.degen.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.cyberTestnet.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.kaia.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.cyber.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419",
    [chains.ham.id]: "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419"
  },
  BOND: {
    [chains.mainnet.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.optimism.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.optimismSepolia.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.arbitrum.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.avalanche.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.polygon.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.bsc.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.bscTestnet.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.base.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.baseSepolia.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.sepolia.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.blast.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.blastSepolia.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.avalancheFuji.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.degen.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.cyberTestnet.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.kaia.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.cyber.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2",
    [chains.ham.id]: "0x529300923416c4332f77C74e14742F528a9Ec7d2"
  },
  ZAP: {
    [chains.mainnet.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.optimism.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.optimismSepolia.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.arbitrum.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.avalanche.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.polygon.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.bsc.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.bscTestnet.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.base.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.baseSepolia.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.sepolia.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.blast.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.blastSepolia.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.avalancheFuji.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.degen.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.cyberTestnet.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.kaia.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.cyber.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878",
    [chains.ham.id]: "0x10A42F077817F58746E2c7f96D58EB367C40f878"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.optimism.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.optimismSepolia.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.arbitrum.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.avalanche.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.polygon.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.bsc.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.bscTestnet.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.base.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.baseSepolia.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.sepolia.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.blast.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.blastSepolia.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.avalancheFuji.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.degen.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.cyberTestnet.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.kaia.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.cyber.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722",
    [chains.ham.id]: "0x81D93f6cFF60A13AC578410961d974Fb3A302722"
  },
  MERKLE: {
    [chains.mainnet.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.optimism.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.optimismSepolia.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.arbitrum.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.avalanche.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.polygon.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.bsc.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.bscTestnet.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.base.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.baseSepolia.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.sepolia.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.blast.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.blastSepolia.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.avalancheFuji.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.degen.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.cyberTestnet.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.kaia.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.cyber.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c",
    [chains.ham.id]: "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v8_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.optimism.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.optimismSepolia.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.arbitrum.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.avalanche.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.polygon.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.bsc.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.bscTestnet.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.base.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.baseSepolia.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.sepolia.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.blast.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.blastSepolia.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.avalancheFuji.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.degen.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.cyberTestnet.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.kaia.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.cyber.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD",
    [chains.ham.id]: "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.optimism.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.optimismSepolia.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.arbitrum.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.avalanche.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.polygon.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.bsc.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.bscTestnet.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.base.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.baseSepolia.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.sepolia.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.blast.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.blastSepolia.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.avalancheFuji.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.degen.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.cyberTestnet.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.kaia.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.cyber.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D",
    [chains.ham.id]: "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D"
  },
  BOND: {
    [chains.mainnet.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.optimism.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.optimismSepolia.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.arbitrum.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.avalanche.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.polygon.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.bsc.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.bscTestnet.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.base.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.baseSepolia.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.sepolia.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.blast.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.blastSepolia.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.avalancheFuji.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.degen.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.cyberTestnet.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.kaia.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.cyber.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd",
    [chains.ham.id]: "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd"
  },
  ZAP: {
    [chains.mainnet.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.optimism.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.optimismSepolia.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.arbitrum.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.avalanche.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.polygon.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.bsc.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.bscTestnet.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.base.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.baseSepolia.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.sepolia.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.blast.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.blastSepolia.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.avalancheFuji.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.degen.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.cyberTestnet.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.kaia.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.cyber.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199",
    [chains.ham.id]: "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199"
  },
  LOCKER: {
    [chains.mainnet.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.optimism.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.optimismSepolia.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.arbitrum.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.avalanche.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.polygon.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.bsc.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.bscTestnet.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.base.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.baseSepolia.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.sepolia.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.blast.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.blastSepolia.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.avalancheFuji.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.degen.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.cyberTestnet.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.kaia.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.cyber.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a",
    [chains.ham.id]: "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a"
  },
  MERKLE: {
    [chains.mainnet.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.optimism.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.optimismSepolia.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.arbitrum.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.avalanche.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.polygon.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.bsc.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.bscTestnet.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.base.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.baseSepolia.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.sepolia.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.blast.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.blastSepolia.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.avalancheFuji.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.degen.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.cyberTestnet.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.kaia.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.cyber.id]: "0xa486Ece68219095a3412de978F92176C27E59A40",
    [chains.ham.id]: "0xa486Ece68219095a3412de978F92176C27E59A40"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v81_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.optimism.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.optimismSepolia.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.arbitrum.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.avalanche.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.polygon.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.bsc.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.bscTestnet.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.base.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.baseSepolia.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.sepolia.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.blast.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.blastSepolia.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.avalancheFuji.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.degen.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.cyberTestnet.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.kaia.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.cyber.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc",
    [chains.ham.id]: "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.optimism.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.optimismSepolia.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.arbitrum.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.avalanche.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.polygon.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.bsc.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.bscTestnet.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.base.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.baseSepolia.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.sepolia.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.blast.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.blastSepolia.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.avalancheFuji.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.degen.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.cyberTestnet.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.kaia.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.cyber.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF",
    [chains.ham.id]: "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF"
  },
  BOND: {
    [chains.mainnet.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.optimism.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.optimismSepolia.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.arbitrum.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.avalanche.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.polygon.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.bsc.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.bscTestnet.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.base.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.baseSepolia.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.sepolia.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.blast.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.blastSepolia.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.avalancheFuji.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.degen.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.cyberTestnet.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.kaia.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.cyber.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa",
    [chains.ham.id]: "0xB92a3Ed43515339942f95e75b2f286Ea190619fa"
  },
  ZAP: {
    [chains.mainnet.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.optimism.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.optimismSepolia.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.arbitrum.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.avalanche.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.polygon.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.bsc.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.bscTestnet.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.base.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.baseSepolia.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.sepolia.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.blast.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.blastSepolia.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.avalancheFuji.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.degen.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.cyberTestnet.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.kaia.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.cyber.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85",
    [chains.ham.id]: "0x4aA3c482a41c6005c7669987d061f333E1d8bA85"
  },
  LOCKER: {
    [chains.mainnet.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.optimism.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.optimismSepolia.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.arbitrum.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.avalanche.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.polygon.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.bsc.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.bscTestnet.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.base.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.baseSepolia.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.sepolia.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.blast.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.blastSepolia.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.avalancheFuji.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.degen.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.cyberTestnet.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.kaia.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.cyber.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A",
    [chains.ham.id]: "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.optimism.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.optimismSepolia.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.arbitrum.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.avalanche.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.polygon.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.bsc.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.bscTestnet.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.base.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.baseSepolia.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.sepolia.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.blast.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.blastSepolia.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.avalancheFuji.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.degen.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.cyberTestnet.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.kaia.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.cyber.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E",
    [chains.ham.id]: "0x249575eEF633dae371Da9a7C76A96B114729665E"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v82_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.optimism.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.optimismSepolia.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.arbitrum.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.avalanche.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.polygon.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.bsc.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.bscTestnet.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.base.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.baseSepolia.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.sepolia.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.blast.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.blastSepolia.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.avalancheFuji.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.degen.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.cyberTestnet.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.kaia.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.cyber.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A",
    [chains.ham.id]: "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.optimism.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.optimismSepolia.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.arbitrum.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.avalanche.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.polygon.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.bsc.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.bscTestnet.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.base.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.baseSepolia.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.sepolia.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.blast.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.blastSepolia.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.avalancheFuji.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.degen.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.cyberTestnet.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.kaia.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.cyber.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1",
    [chains.ham.id]: "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1"
  },
  BOND: {
    [chains.mainnet.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.optimism.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.optimismSepolia.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.arbitrum.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.avalanche.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.polygon.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.bsc.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.bscTestnet.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.base.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.baseSepolia.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.sepolia.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.blast.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.blastSepolia.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.avalancheFuji.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.degen.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.cyberTestnet.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.kaia.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.cyber.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80",
    [chains.ham.id]: "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80"
  },
  ZAP: {
    [chains.mainnet.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.optimism.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.optimismSepolia.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.arbitrum.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.avalanche.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.polygon.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.bsc.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.bscTestnet.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.base.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.baseSepolia.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.sepolia.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.blast.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.blastSepolia.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.avalancheFuji.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.degen.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.cyberTestnet.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.kaia.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.cyber.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2",
    [chains.ham.id]: "0xc8748f8976a05F9143e9eEf965F32949c712DeE2"
  },
  LOCKER: {
    [chains.mainnet.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.optimism.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.optimismSepolia.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.arbitrum.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.avalanche.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.polygon.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.bsc.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.bscTestnet.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.base.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.baseSepolia.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.sepolia.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.blast.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.blastSepolia.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.avalancheFuji.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.degen.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.cyberTestnet.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.kaia.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.cyber.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8",
    [chains.ham.id]: "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8"
  },
  MERKLE: {
    [chains.mainnet.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.optimism.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.optimismSepolia.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.arbitrum.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.avalanche.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.polygon.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.bsc.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.bscTestnet.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.base.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.baseSepolia.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.sepolia.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.blast.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.blastSepolia.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.avalancheFuji.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.degen.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.cyberTestnet.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.kaia.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.cyber.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e",
    [chains.ham.id]: "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v83_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.optimism.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.optimismSepolia.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.arbitrum.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.avalanche.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.polygon.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.bsc.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.bscTestnet.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.base.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.baseSepolia.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.sepolia.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.blast.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.blastSepolia.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.avalancheFuji.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.degen.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.cyberTestnet.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.kaia.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.cyber.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455",
    [chains.ham.id]: "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.optimism.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.optimismSepolia.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.arbitrum.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.avalanche.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.polygon.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.bsc.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.bscTestnet.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.base.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.baseSepolia.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.sepolia.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.blast.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.blastSepolia.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.avalancheFuji.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.degen.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.cyberTestnet.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.kaia.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.cyber.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34",
    [chains.ham.id]: "0x6F01fA6c34f402942fC6B025660dE803128BDD34"
  },
  BOND: {
    [chains.mainnet.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.optimism.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.optimismSepolia.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.arbitrum.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.avalanche.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.polygon.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.bsc.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.bscTestnet.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.base.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.baseSepolia.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.sepolia.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.blast.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.blastSepolia.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.avalancheFuji.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.degen.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.cyberTestnet.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.kaia.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.cyber.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11",
    [chains.ham.id]: "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11"
  },
  ZAP: {
    [chains.mainnet.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.optimism.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.optimismSepolia.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.arbitrum.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.avalanche.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.polygon.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.bsc.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.bscTestnet.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.base.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.baseSepolia.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.sepolia.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.blast.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.blastSepolia.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.avalancheFuji.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.degen.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.cyberTestnet.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.kaia.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.cyber.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A",
    [chains.ham.id]: "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.optimism.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.optimismSepolia.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.arbitrum.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.avalanche.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.polygon.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.bsc.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.bscTestnet.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.base.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.baseSepolia.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.sepolia.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.blast.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.blastSepolia.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.avalancheFuji.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.degen.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.cyberTestnet.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.kaia.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.cyber.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08",
    [chains.ham.id]: "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08"
  },
  MERKLE: {
    [chains.mainnet.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.optimism.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.optimismSepolia.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.arbitrum.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.avalanche.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.polygon.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.bsc.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.bscTestnet.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.base.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.baseSepolia.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.sepolia.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.blast.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.blastSepolia.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.avalancheFuji.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.degen.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.cyberTestnet.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.kaia.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.cyber.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765",
    [chains.ham.id]: "0xae110452fB8a092D24356732bBac0aadcA99B765"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v9_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.optimism.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.optimismSepolia.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.arbitrum.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.avalanche.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.polygon.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.bsc.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.bscTestnet.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.base.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.baseSepolia.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.sepolia.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.blast.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.blastSepolia.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.avalancheFuji.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.degen.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.cyberTestnet.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.kaia.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.cyber.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac",
    [chains.ham.id]: "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.optimism.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.optimismSepolia.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.arbitrum.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.avalanche.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.polygon.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.bsc.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.bscTestnet.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.base.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.baseSepolia.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.sepolia.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.blast.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.blastSepolia.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.avalancheFuji.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.degen.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.cyberTestnet.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.kaia.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.cyber.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82",
    [chains.ham.id]: "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82"
  },
  BOND: {
    [chains.mainnet.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.optimism.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.optimismSepolia.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.arbitrum.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.avalanche.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.polygon.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.bsc.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.bscTestnet.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.base.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.baseSepolia.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.sepolia.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.blast.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.blastSepolia.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.avalancheFuji.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.degen.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.cyberTestnet.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.kaia.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.cyber.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816",
    [chains.ham.id]: "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816"
  },
  ZAP: {
    [chains.mainnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimism.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimismSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.arbitrum.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalanche.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.polygon.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bsc.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bscTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.base.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.baseSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.sepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blast.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blastSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalancheFuji.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.degen.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyberTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.kaia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyber.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.ham.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimism.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimismSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.arbitrum.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalanche.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.polygon.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bsc.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bscTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.base.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.baseSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.sepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blast.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blastSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalancheFuji.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.degen.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyberTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.kaia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyber.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.ham.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimism.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimismSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.arbitrum.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalanche.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.polygon.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bsc.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bscTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.base.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.baseSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.sepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blast.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blastSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalancheFuji.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.degen.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyberTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.kaia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyber.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.ham.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v91_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.optimism.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.optimismSepolia.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.arbitrum.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.avalanche.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.polygon.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.bsc.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.bscTestnet.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.base.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.baseSepolia.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.sepolia.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.blast.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.blastSepolia.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.avalancheFuji.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.degen.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.cyberTestnet.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.kaia.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.cyber.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802",
    [chains.ham.id]: "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.optimism.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.optimismSepolia.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.arbitrum.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.avalanche.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.polygon.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.bsc.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.bscTestnet.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.base.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.baseSepolia.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.sepolia.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.blast.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.blastSepolia.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.avalancheFuji.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.degen.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.cyberTestnet.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.kaia.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.cyber.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1",
    [chains.ham.id]: "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1"
  },
  BOND: {
    [chains.mainnet.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.optimism.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.optimismSepolia.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.arbitrum.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.avalanche.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.polygon.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.bsc.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.bscTestnet.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.base.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.baseSepolia.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.sepolia.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.blast.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.blastSepolia.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.avalancheFuji.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.degen.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.cyberTestnet.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.kaia.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.cyber.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239",
    [chains.ham.id]: "0x058622E2ffbC935301961878EF5F4ea66c7A1239"
  },
  ZAP: {
    [chains.mainnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimism.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimismSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.arbitrum.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalanche.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.polygon.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bsc.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bscTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.base.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.baseSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.sepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blast.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blastSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalancheFuji.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.degen.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyberTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.kaia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyber.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.ham.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimism.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimismSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.arbitrum.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalanche.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.polygon.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bsc.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bscTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.base.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.baseSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.sepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blast.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blastSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalancheFuji.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.degen.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyberTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.kaia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyber.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.ham.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimism.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimismSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.arbitrum.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalanche.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.polygon.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bsc.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bscTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.base.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.baseSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.sepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blast.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blastSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalancheFuji.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.degen.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyberTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.kaia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyber.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.ham.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v92_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.optimism.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.optimismSepolia.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.arbitrum.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.avalanche.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.polygon.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.bsc.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.bscTestnet.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.base.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.baseSepolia.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.sepolia.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.blast.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.blastSepolia.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.avalancheFuji.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.degen.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.cyberTestnet.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.kaia.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.cyber.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549",
    [chains.ham.id]: "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.optimism.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.optimismSepolia.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.arbitrum.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.avalanche.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.polygon.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.bsc.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.bscTestnet.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.base.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.baseSepolia.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.sepolia.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.blast.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.blastSepolia.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.avalancheFuji.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.degen.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.cyberTestnet.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.kaia.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.cyber.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1",
    [chains.ham.id]: "0x42cB512A9083838fcb54456B8D54c05b88cc85d1"
  },
  BOND: {
    [chains.mainnet.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.optimism.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.optimismSepolia.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.arbitrum.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.avalanche.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.polygon.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.bsc.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.bscTestnet.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.base.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.baseSepolia.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.sepolia.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.blast.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.blastSepolia.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.avalancheFuji.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.degen.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.cyberTestnet.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.kaia.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.cyber.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9",
    [chains.ham.id]: "0x785C3d807D8877da99575e5486D24476BCD1c9D9"
  },
  ZAP: {
    [chains.mainnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimism.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimismSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.arbitrum.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalanche.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.polygon.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bsc.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bscTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.base.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.baseSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.sepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blast.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blastSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalancheFuji.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.degen.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyberTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.kaia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyber.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.ham.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimism.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimismSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.arbitrum.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalanche.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.polygon.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bsc.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bscTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.base.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.baseSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.sepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blast.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blastSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalancheFuji.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.degen.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyberTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.kaia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyber.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.ham.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimism.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimismSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.arbitrum.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalanche.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.polygon.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bsc.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bscTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.base.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.baseSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.sepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blast.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blastSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalancheFuji.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.degen.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyberTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.kaia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyber.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.ham.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v100_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.optimism.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.optimismSepolia.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.arbitrum.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.avalanche.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.polygon.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.bsc.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.bscTestnet.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.base.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.baseSepolia.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.sepolia.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.blast.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.blastSepolia.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.avalancheFuji.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.degen.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.cyberTestnet.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.kaia.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.cyber.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E",
    [chains.ham.id]: "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.optimism.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.optimismSepolia.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.arbitrum.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.avalanche.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.polygon.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.bsc.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.bscTestnet.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.base.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.baseSepolia.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.sepolia.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.blast.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.blastSepolia.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.avalancheFuji.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.degen.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.cyberTestnet.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.kaia.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.cyber.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946",
    [chains.ham.id]: "0x16235FF80E42B2711C00a86FFFcF136629346946"
  },
  BOND: {
    [chains.mainnet.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.optimism.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.optimismSepolia.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.arbitrum.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.avalanche.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.polygon.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.bsc.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.bscTestnet.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.base.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.baseSepolia.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.sepolia.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.blast.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.blastSepolia.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.avalancheFuji.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.degen.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.cyberTestnet.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.kaia.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.cyber.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1",
    [chains.ham.id]: "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1"
  },
  ZAP: {
    [chains.mainnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimism.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimismSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.arbitrum.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalanche.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.polygon.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bsc.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bscTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.base.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.baseSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.sepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blast.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blastSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalancheFuji.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.degen.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyberTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.kaia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyber.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.ham.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimism.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimismSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.arbitrum.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalanche.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.polygon.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bsc.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bscTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.base.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.baseSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.sepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blast.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blastSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalancheFuji.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.degen.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyberTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.kaia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyber.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.ham.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimism.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimismSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.arbitrum.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalanche.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.polygon.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bsc.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bscTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.base.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.baseSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.sepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blast.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blastSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalancheFuji.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.degen.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyberTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.kaia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyber.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.ham.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v101_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.optimism.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.optimismSepolia.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.arbitrum.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.avalanche.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.polygon.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.bsc.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.bscTestnet.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.base.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.baseSepolia.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.sepolia.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.blast.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.blastSepolia.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.avalancheFuji.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.degen.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.cyberTestnet.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.kaia.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.cyber.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe",
    [chains.ham.id]: "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.optimism.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.optimismSepolia.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.arbitrum.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.avalanche.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.polygon.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.bsc.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.bscTestnet.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.base.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.baseSepolia.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.sepolia.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.blast.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.blastSepolia.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.avalancheFuji.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.degen.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.cyberTestnet.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.kaia.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.cyber.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619",
    [chains.ham.id]: "0xb279253408CeB4A1902b785e6d42d9ecAa098619"
  },
  BOND: {
    [chains.mainnet.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.optimism.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.optimismSepolia.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.arbitrum.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.avalanche.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.polygon.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.bsc.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.bscTestnet.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.base.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.baseSepolia.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.sepolia.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.blast.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.blastSepolia.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.avalancheFuji.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.degen.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.cyberTestnet.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.kaia.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.cyber.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf",
    [chains.ham.id]: "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf"
  },
  ZAP: {
    [chains.mainnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimism.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimismSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.arbitrum.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalanche.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.polygon.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bsc.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bscTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.base.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.baseSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.sepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blast.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blastSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalancheFuji.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.degen.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyberTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.kaia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyber.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.ham.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimism.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimismSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.arbitrum.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalanche.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.polygon.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bsc.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bscTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.base.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.baseSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.sepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blast.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blastSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalancheFuji.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.degen.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyberTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.kaia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyber.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.ham.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimism.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimismSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.arbitrum.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalanche.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.polygon.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bsc.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bscTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.base.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.baseSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.sepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blast.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blastSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalancheFuji.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.degen.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyberTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.kaia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyber.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.ham.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v102_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.optimism.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.optimismSepolia.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.arbitrum.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.avalanche.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.polygon.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.bsc.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.bscTestnet.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.base.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.baseSepolia.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.sepolia.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.blast.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.blastSepolia.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.avalancheFuji.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.degen.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.cyberTestnet.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.kaia.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.cyber.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa",
    [chains.ham.id]: "0x6c170041cc145605c6c744F58abd987826c6Cbfa"
  },
  ERC1155: {
    [chains.mainnet.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.optimism.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.optimismSepolia.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.arbitrum.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.avalanche.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.polygon.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.bsc.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.bscTestnet.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.base.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.baseSepolia.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.sepolia.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.blast.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.blastSepolia.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.avalancheFuji.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.degen.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.cyberTestnet.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.kaia.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.cyber.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14",
    [chains.ham.id]: "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14"
  },
  BOND: {
    [chains.mainnet.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.optimism.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.optimismSepolia.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.arbitrum.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.avalanche.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.polygon.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.bsc.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.bscTestnet.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.base.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.baseSepolia.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.sepolia.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.blast.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.blastSepolia.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.avalancheFuji.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.degen.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.cyberTestnet.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.kaia.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.cyber.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B",
    [chains.ham.id]: "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B"
  },
  ZAP: {
    [chains.mainnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimism.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.optimismSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.arbitrum.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalanche.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.polygon.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bsc.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.bscTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.base.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.baseSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.sepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blast.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.blastSepolia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.avalancheFuji.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.degen.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyberTestnet.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.kaia.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.cyber.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B",
    [chains.ham.id]: "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimism.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.optimismSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.arbitrum.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalanche.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.polygon.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bsc.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.bscTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.base.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.baseSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.sepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blast.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.blastSepolia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.avalancheFuji.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.degen.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyberTestnet.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.kaia.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.cyber.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6",
    [chains.ham.id]: "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimism.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.optimismSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.arbitrum.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalanche.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.polygon.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bsc.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.bscTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.base.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.baseSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.sepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blast.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.blastSepolia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.avalancheFuji.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.degen.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyberTestnet.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.kaia.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.cyber.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0",
    [chains.ham.id]: "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v110_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.optimism.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.optimismSepolia.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.arbitrum.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.avalanche.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.polygon.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.bsc.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.bscTestnet.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.base.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.baseSepolia.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.sepolia.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.blast.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.blastSepolia.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.avalancheFuji.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.degen.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.cyberTestnet.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.kaia.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.cyber.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732",
    [chains.ham.id]: "0x453BC7E7e956d83DC6E307b1378339F16D0C4732"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.optimism.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.optimismSepolia.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.arbitrum.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.avalanche.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.polygon.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.bsc.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.bscTestnet.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.base.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.baseSepolia.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.sepolia.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.blast.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.blastSepolia.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.avalancheFuji.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.degen.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.cyberTestnet.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.kaia.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.cyber.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0",
    [chains.ham.id]: "0xA8512915978A60B2604804d311D9ff181d7b69D0"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v111_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.optimism.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.optimismSepolia.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.arbitrum.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.avalanche.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.polygon.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.bsc.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.bscTestnet.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.base.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.baseSepolia.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.sepolia.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.blast.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.blastSepolia.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.avalancheFuji.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.degen.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.cyberTestnet.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.kaia.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.cyber.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF",
    [chains.ham.id]: "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.optimism.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.optimismSepolia.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.arbitrum.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.avalanche.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.polygon.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.bsc.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.bscTestnet.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.base.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.baseSepolia.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.sepolia.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.blast.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.blastSepolia.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.avalancheFuji.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.degen.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.cyberTestnet.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.kaia.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.cyber.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF",
    [chains.ham.id]: "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v112_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.optimism.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.optimismSepolia.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.arbitrum.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.avalanche.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.polygon.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.bsc.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.bscTestnet.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.base.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.baseSepolia.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.sepolia.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.blast.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.blastSepolia.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.avalancheFuji.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.degen.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.cyberTestnet.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.kaia.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.cyber.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119",
    [chains.ham.id]: "0xe25C11A39Ff84C71dfe47078f08C66431f357119"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.optimism.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.optimismSepolia.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.arbitrum.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.avalanche.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.polygon.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.bsc.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.bscTestnet.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.base.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.baseSepolia.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.sepolia.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.blast.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.blastSepolia.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.avalancheFuji.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.degen.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.cyberTestnet.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.kaia.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.cyber.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74",
    [chains.ham.id]: "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v114_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.optimism.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.optimismSepolia.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.arbitrum.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.avalanche.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.polygon.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.bsc.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.bscTestnet.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.base.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.baseSepolia.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.sepolia.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.blast.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.blastSepolia.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.avalancheFuji.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.degen.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.cyberTestnet.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.kaia.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.cyber.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c",
    [chains.ham.id]: "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.optimism.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.optimismSepolia.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.arbitrum.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.avalanche.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.polygon.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.bsc.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.bscTestnet.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.base.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.baseSepolia.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.sepolia.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.blast.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.blastSepolia.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.avalancheFuji.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.degen.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.cyberTestnet.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.kaia.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.cyber.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188",
    [chains.ham.id]: "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v115_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.optimism.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.optimismSepolia.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.arbitrum.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.avalanche.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.polygon.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.bsc.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.bscTestnet.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.base.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.baseSepolia.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.sepolia.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.blast.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.blastSepolia.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.avalancheFuji.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.degen.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.cyberTestnet.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.kaia.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.cyber.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8",
    [chains.ham.id]: "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.optimism.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.optimismSepolia.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.arbitrum.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.avalanche.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.polygon.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.bsc.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.bscTestnet.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.base.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.baseSepolia.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.sepolia.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.blast.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.blastSepolia.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.avalancheFuji.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.degen.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.cyberTestnet.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.kaia.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.cyber.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad",
    [chains.ham.id]: "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v116_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.optimism.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.optimismSepolia.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.arbitrum.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.avalanche.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.polygon.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.bsc.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.bscTestnet.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.base.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.baseSepolia.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.sepolia.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.blast.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.blastSepolia.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.avalancheFuji.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.degen.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.cyberTestnet.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.kaia.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.cyber.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868",
    [chains.ham.id]: "0x9102d69826B11c4256c2B2C23799325d2C578868"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.optimism.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.optimismSepolia.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.arbitrum.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.avalanche.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.polygon.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.bsc.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.bscTestnet.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.base.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.baseSepolia.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.sepolia.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.blast.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.blastSepolia.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.avalancheFuji.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.degen.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.cyberTestnet.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.kaia.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.cyber.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F",
    [chains.ham.id]: "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v117_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.optimism.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.optimismSepolia.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.arbitrum.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.avalanche.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.polygon.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.bsc.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.bscTestnet.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.base.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.baseSepolia.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.sepolia.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.blast.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.blastSepolia.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.avalancheFuji.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.degen.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.cyberTestnet.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.kaia.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.cyber.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d",
    [chains.ham.id]: "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.optimism.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.optimismSepolia.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.arbitrum.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.avalanche.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.polygon.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.bsc.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.bscTestnet.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.base.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.baseSepolia.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.sepolia.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.blast.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.blastSepolia.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.avalancheFuji.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.degen.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.cyberTestnet.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.kaia.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.cyber.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3",
    [chains.ham.id]: "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v118_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.optimism.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.optimismSepolia.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.arbitrum.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.avalanche.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.polygon.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.bsc.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.bscTestnet.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.base.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.baseSepolia.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.sepolia.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.blast.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.blastSepolia.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.avalancheFuji.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.degen.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.cyberTestnet.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.kaia.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.cyber.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090",
    [chains.ham.id]: "0x8F418560B2996dA6853A88B8b41C6253C2B53090"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.optimism.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.optimismSepolia.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.arbitrum.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.avalanche.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.polygon.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.bsc.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.bscTestnet.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.base.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.baseSepolia.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.sepolia.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.blast.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.blastSepolia.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.avalancheFuji.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.degen.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.cyberTestnet.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.kaia.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.cyber.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66",
    [chains.ham.id]: "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v120_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.optimism.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.optimismSepolia.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.arbitrum.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.avalanche.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.polygon.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.bsc.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.bscTestnet.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.base.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.baseSepolia.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.sepolia.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.blast.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.blastSepolia.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.avalancheFuji.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.degen.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.cyberTestnet.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.kaia.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.cyber.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33",
    [chains.ham.id]: "0x51363b99E1d6698bC71bdB95941De1f5875aCd33"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.optimism.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.optimismSepolia.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.arbitrum.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.avalanche.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.polygon.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.bsc.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.bscTestnet.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.base.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.baseSepolia.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.sepolia.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.blast.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.blastSepolia.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.avalancheFuji.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.degen.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.cyberTestnet.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.kaia.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.cyber.id]: "0xB9186462c868A559c7352b424C12312703964a58",
    [chains.ham.id]: "0xB9186462c868A559c7352b424C12312703964a58"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v121_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.optimism.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.optimismSepolia.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.arbitrum.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.avalanche.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.polygon.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.bsc.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.bscTestnet.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.base.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.baseSepolia.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.sepolia.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.blast.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.blastSepolia.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.avalancheFuji.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.degen.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.cyberTestnet.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.kaia.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.cyber.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.ham.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.optimism.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.optimismSepolia.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.arbitrum.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.avalanche.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.polygon.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.bsc.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.bscTestnet.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.base.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.baseSepolia.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.sepolia.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.blast.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.blastSepolia.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.avalancheFuji.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.degen.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.cyberTestnet.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.kaia.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.cyber.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.ham.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v122_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0xA7BB3E43CBa4e863e5e6c29E58E0F3Ac90A6Ac17",
    [chains.bscTestnet.id]: "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0xd1c6508301B0567e3b8aFC45808704F5c0ea7FEf",
    [chains.bscTestnet.id]: "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v124_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x27d16F8373EB8932C558793ccaBd05B2e8D52f5A",
    [chains.bscTestnet.id]: "0x31DFda6f441dEA4CD9D5dA5807Fb0107209780C3",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB",
    [chains.bscTestnet.id]: "0x8347C0E0F6243216a4DF23694991725D91DA1Af2",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const v125_SDK_CONTRACT_ADDRESSES = {
  ERC20: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x187E536C5404dD472476B9e4C716878d359a506A",
    [chains.bscTestnet.id]: "0x872d3Cfc052aA4267A78fF5ae21138b7742824B2",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ERC1155: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  BOND: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537",
    [chains.bscTestnet.id]: "0x491d7411577eC1209e5B48251217Fc12F2f5c4B0",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ZAP: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  LOCKER: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  MERKLE: {
    [chains.mainnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimism.id]: "0x0000000000000000000000000000000000000000",
    [chains.optimismSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.arbitrum.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalanche.id]: "0x0000000000000000000000000000000000000000",
    [chains.polygon.id]: "0x0000000000000000000000000000000000000000",
    [chains.bsc.id]: "0x0000000000000000000000000000000000000000",
    [chains.bscTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.base.id]: "0x0000000000000000000000000000000000000000",
    [chains.baseSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.sepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.blast.id]: "0x0000000000000000000000000000000000000000",
    [chains.blastSepolia.id]: "0x0000000000000000000000000000000000000000",
    [chains.avalancheFuji.id]: "0x0000000000000000000000000000000000000000",
    [chains.degen.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyberTestnet.id]: "0x0000000000000000000000000000000000000000",
    [chains.kaia.id]: "0x0000000000000000000000000000000000000000",
    [chains.cyber.id]: "0x0000000000000000000000000000000000000000",
    [chains.ham.id]: "0x0000000000000000000000000000000000000000"
  },
  ONEINCH: {
    [chains.mainnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimism.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.optimismSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.arbitrum.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalanche.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.polygon.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bsc.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.bscTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.base.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.kaia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.sepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.baseSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blast.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.blastSepolia.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.avalancheFuji.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.degen.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyberTestnet.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.cyber.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8",
    [chains.ham.id]: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8"
  }
};
const VERSION_TO_SDK_CONTRACT_ADDRESSES = {
  "0.1.0": SDK_CONTRACT_ADDRESSES,
  "0.2.0": V2_SDK_CONTRACT_ADDRESSES,
  "0.3.0": V3_SDK_CONTRACT_ADDRESSES,
  "0.3.1": V31_SDK_CONTRACT_ADDRESSES,
  "0.4.0": v4_SDK_CONTRACT_ADDRESSES,
  "0.5.0": v5_SDK_CONTRACT_ADDRESSES,
  "0.6.0": v6_SDK_CONTRACT_ADDRESSES,
  "0.6.1": v61_SDK_CONTRACT_ADDRESSES,
  "0.7.0": v7_SDK_CONTRACT_ADDRESSES,
  "0.7.1": v71_SDK_CONTRACT_ADDRESSES,
  "0.7.2": v72_SDK_CONTRACT_ADDRESSES,
  "0.7.3": v73_SDK_CONTRACT_ADDRESSES,
  "0.8.0": v8_SDK_CONTRACT_ADDRESSES,
  "0.8.1": v81_SDK_CONTRACT_ADDRESSES,
  "0.8.2": v82_SDK_CONTRACT_ADDRESSES,
  "0.8.3": v83_SDK_CONTRACT_ADDRESSES,
  "0.9.0": v9_SDK_CONTRACT_ADDRESSES,
  "0.9.1": v91_SDK_CONTRACT_ADDRESSES,
  "0.9.2": v92_SDK_CONTRACT_ADDRESSES,
  "1.0.0": v100_SDK_CONTRACT_ADDRESSES,
  "1.0.1": v101_SDK_CONTRACT_ADDRESSES,
  "1.0.2": v102_SDK_CONTRACT_ADDRESSES,
  "1.1.0": v110_SDK_CONTRACT_ADDRESSES,
  "1.1.1": v111_SDK_CONTRACT_ADDRESSES,
  "1.1.2": v112_SDK_CONTRACT_ADDRESSES,
  "1.1.4": v114_SDK_CONTRACT_ADDRESSES,
  "1.1.5": v115_SDK_CONTRACT_ADDRESSES,
  "1.1.6": v116_SDK_CONTRACT_ADDRESSES,
  "1.1.7": v117_SDK_CONTRACT_ADDRESSES,
  "1.1.8": v118_SDK_CONTRACT_ADDRESSES,
  "1.2.0": v120_SDK_CONTRACT_ADDRESSES,
  "1.2.1": v121_SDK_CONTRACT_ADDRESSES,
  "1.2.2": v122_SDK_CONTRACT_ADDRESSES,
  "1.2.4": v124_SDK_CONTRACT_ADDRESSES,
  "1.2.5": v125_SDK_CONTRACT_ADDRESSES
};
function getBitAgentContractAddress(contractName, chainId, version = "1.2.5") {
  let contractAddress = VERSION_TO_SDK_CONTRACT_ADDRESSES[version][contractName][chainId];
  if (process.env.NODE_ENV === "hardhat") {
    contractAddress = global.mcv2Hardhat?.[contractName]?.[chainId];
  }
  if (!contractAddress) {
    throw new Error(`Contract address for ${contractName} on chain ${chainId} not found`);
  }
  return contractAddress;
}

const CHAINS = [
  {
    id: chains.mainnet.id,
    name: "Ethereum",
    icon: "https://bitagent.io/assets/networks/ethereum@2x.png",
    color: "#627EEA",
    openseaSlug: "ethereum",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.mainnet.id)),
    chain: chains.mainnet
  },
  {
    id: chains.base.id,
    name: "Base",
    icon: "https://bitagent.io/assets/networks/base@2x.png",
    color: "#0052FF",
    openseaSlug: "base",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.base.id)),
    chain: chains.base
  },
  {
    id: chains.blast.id,
    name: "Blast",
    icon: "https://bitagent.io/assets/networks/blast@2x.png",
    color: "#FCFC03",
    openseaSlug: "blast",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.blast.id)),
    chain: chains.blast
  },
  {
    id: chains.optimism.id,
    name: "Optimism",
    icon: "https://bitagent.io/assets/networks/optimism@2x.png",
    color: "#FF0420",
    openseaSlug: "optimism",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.optimism.id)),
    chain: chains.optimism
  },
  {
    id: chains.optimismSepolia.id,
    name: "OptimismSepolia",
    icon: "https://bitagent.io/assets/networks/optimism@2x.png",
    color: "#FF0420",
    openseaSlug: "optimism",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.optimismSepolia.id)),
    chain: chains.optimism
  },
  {
    id: chains.degen.id,
    name: "Degen",
    icon: "https://bitagent.io/assets/networks/degen@2x.png",
    color: "#A36EFD",
    openseaSlug: "degen",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.degen.id)),
    chain: chains.degen
  },
  {
    id: chains.arbitrum.id,
    name: "Arbitrum",
    icon: "https://bitagent.io/assets/networks/arbitrum@2x.png",
    color: "#12AAFF",
    openseaSlug: "arbitrum",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.arbitrum.id)),
    chain: chains.arbitrum
  },
  {
    id: chains.avalanche.id,
    name: "Avalanche",
    icon: "https://bitagent.io/assets/networks/avalanche@2x.png",
    color: "#E94143",
    openseaSlug: "avalanche",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.avalanche.id)),
    chain: chains.avalanche
  },
  {
    id: chains.polygon.id,
    name: "Polygon",
    icon: "https://bitagent.io/assets/networks/polygon@2x.png",
    color: "#8247E5",
    openseaSlug: "matic",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.polygon.id)),
    chain: chains.polygon
  },
  {
    id: chains.bsc.id,
    name: "BNBChain",
    icon: "https://bitagent.io/assets/networks/bnb@2x.png",
    color: "#F0B90B",
    openseaSlug: "bsc",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.bsc.id)),
    chain: chains.bsc
  },
  {
    id: chains.bscTestnet.id,
    name: "BNBChainTestnet",
    icon: "https://bitagent.io/assets/networks/bnb@2x.png",
    color: "#F0B90B",
    openseaSlug: "bscTestnet",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.bscTestnet.id)),
    chain: chains.bsc
  },
  {
    id: chains.sepolia.id,
    name: "Sepolia",
    icon: "https://bitagent.io/assets/networks/ethereum@2x.png",
    color: "#627EEA",
    openseaSlug: "sepolia",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.sepolia.id)),
    isTestnet: true,
    chain: chains.sepolia
  },
  {
    id: chains.baseSepolia.id,
    name: "BaseSepolia",
    icon: "https://bitagent.io/assets/networks/base@2x.png",
    color: "#0052FF",
    openseaSlug: "base-sepolia",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.baseSepolia.id)),
    isTestnet: true,
    chain: chains.sepolia
  },
  {
    id: chains.blastSepolia.id,
    name: "BlastSepolia",
    icon: "https://bitagent.io/assets/networks/blast@2x.png",
    color: "#FCFC03",
    openseaSlug: "blast-sepolia",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.blastSepolia.id)),
    isTestnet: true,
    chain: chains.blastSepolia
  },
  {
    id: chains.cyber.id,
    name: "Cyber",
    icon: "https://bitagent.io/assets/networks/cyber@2x.png",
    color: "#32A0CD",
    openseaSlug: "cyber",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.cyber.id)),
    chain: chains.cyber
  },
  {
    id: chains.ham.id,
    name: "Ham",
    icon: "https://bitagent.io/assets/networks/ham@2x.png",
    color: "#EB4747",
    openseaSlug: "ham",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.ham.id)),
    chain: chains.ham
  },
  {
    id: chains.avalancheFuji.id,
    name: "AvalancheFuji",
    icon: "https://bitagent.io/assets/networks/avalanche@2x.png",
    color: "#E94143",
    openseaSlug: "avalanche-fuji",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.avalancheFuji.id)),
    isTestnet: true,
    chain: chains.avalancheFuji
  },
  {
    id: chains.cyberTestnet.id,
    name: "CyberTestnet",
    icon: "https://bitagent.io/assets/networks/cyber@2x.png",
    color: "#32A0CD",
    openseaSlug: "cyber-testnet",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.cyberTestnet.id)),
    isTestnet: true,
    chain: chains.cyberTestnet
  },
  {
    id: chains.kaia.id,
    name: "Kaia",
    icon: "https://bitagent.io/assets/networks/kaia@2x.png",
    color: "#BFF009",
    openseaSlug: "klaytn",
    enabled: viem.isAddress(getBitAgentContractAddress("BOND", chains.kaia.id)),
    chain: chains.kaia
  }
];
function chainIdToViemChain(chainId) {
  return CHAINS.find((chain) => chain.id === chainId)?.chain;
}
function chainIdToString(chainId) {
  const found = CHAINS.find((chain) => chain.id === chainId);
  if (!found) throw new ChainNotSupportedError(chainId);
  return found?.name?.toLowerCase();
}
function chainStringToId(name) {
  const found = CHAINS.find((chain) => chain?.name?.toLowerCase?.() === name?.toLowerCase?.());
  if (!found) throw new ChainNotSupportedError(name);
  return found.id;
}
function getChain(chainId) {
  let chain = Object.values(chains__namespace).find((c) => c.id === chainId) ?? CHAINS.find((c) => c.id === chainId)?.chain;
  if (!chain) {
    throw new ChainNotSupportedError(chainId);
  }
  return chain;
}
const CHAIN_MAP = CHAINS.reduce((prev, curr) => {
  prev[curr.id] = curr;
  return prev;
}, {});
const CHAIN_NAME_ID_MAP = {
  sepolia: chains.sepolia.id
};

const RPCS = [
  {
    id: chains.mainnet.id,
    rpcs: [
      "https://ethereum-rpc.publicnode.com",
      "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
      "https://public.stackup.sh/api/v1/node/ethereum-mainnet",
      "https://rpc.flashbots.net",
      // 'https://api.zmok.io/mainnet/oaen6dy8ff6hju9k', // NOTE: 503 error
      "https://rpc.mevblocker.io",
      "https://rpc.mevblocker.io/fast",
      // 'https://go.getblock.io/d9fde9abc97545f4887f56ae54f3c2c0', // NOTE: 429 error
      "https://rpc.mevblocker.io/noreverts",
      "https://rpc.mevblocker.io/fullprivacy",
      "https://eth1.lava.build/lava-referer-ed07f753-8c19-4309-b632-5a4a421aa589",
      "https://rpc.flashbots.net/fast",
      "https://eth1.lava.build/lava-referer-16223de7-12c0-49f3-8d87-e5f1e6a0eb3b",
      "https://core.gashawk.io/rpc",
      "https://eth.meowrpc.com",
      "https://gateway.subquery.network/rpc/eth",
      "https://eth-pokt.nodies.app",
      // 'https://gateway.tenderly.co/public/mainnet', // NOTE: 400 on `eth_getFilterChanges`
      // 'https://mainnet.gateway.tenderly.co', // NOTE: 400 on `eth_getFilterChanges`
      "https://eth-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
      "https://rpc.builder0x69.io"
    ]
  },
  {
    id: chains.base.id,
    rpcs: [
      "https://mainnet.base.org",
      "https://base-pokt.nodies.app",
      // 'https://base.gateway.tenderly.co', // NOTE: 400 on `eth_getFilterChanges`
      // 'https://gateway.tenderly.co/public/base', // NOTE: 400 on `eth_getFilterChanges`
      "https://base-rpc.publicnode.com",
      "https://developer-access-mainnet.base.org",
      "https://base.meowrpc.com"
    ]
  },
  {
    id: chains.cyber.id,
    rpcs: ["https://cyber.alt.technology/", "https://rpc.cyber.co/"]
  },
  {
    id: chains.cyberTestnet.id,
    rpcs: ["https://cyber-testnet.alt.technology"]
  },
  {
    id: chains.optimism.id,
    rpcs: [
      // 'https://api.tatum.io/v3/blockchain/node/optimism-mainnet', // NOTE: CORS issue
      // 'https://optimism.drpc.org', // NOTE: 400 on `eth_getFilterChanges`
      // 'https://gateway.tenderly.co/public/optimism', // NOTE: 400 on `eth_getFilterChanges`
      // 'https://optimism.gateway.tenderly.co', // NOTE: 400 on `eth_getFilterChanges`
      "https://optimism-rpc.publicnode.com",
      "https://op-pokt.nodies.app",
      "https://optimism.meowrpc.com"
    ]
  },
  {
    id: chains.arbitrum.id,
    rpcs: [
      "https://arbitrum-one.publicnode.com",
      "https://arbitrum.rpc.subquery.network/public",
      "https://public.stackup.sh/api/v1/node/arbitrum-one",
      "https://arbitrum.meowrpc.com",
      "https://arb-pokt.nodies.app",
      "https://arbitrum-one-rpc.publicnode.com"
      // 'https://arb-mainnet.g.alchemy.com/v2/654scodAkt2_QjvbCk8oPbAV6wJHoR8j', // Alchemy private API because public RPCs are often unstable
    ]
  },
  {
    id: chains.polygon.id,
    rpcs: [
      "https://polygon-bor-rpc.publicnode.com",
      "https://polygon-pokt.nodies.app",
      "https://public.stackup.sh/api/v1/node/polygon-mainnet",
      "https://rpc-mainnet.matic.quiknode.pro",
      // 'https://gateway.tenderly.co/public/polygon', // NOTE: 400 on `eth_getFilterChanges`
      // 'https://polygon.gateway.tenderly.co', // NOTE: 400 on `eth_getFilterChanges`
      "https://polygon.meowrpc.com",
      "https://polygon-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
      "https://polygon.rpc.subquery.network/public"
    ]
  },
  {
    id: chains.bsc.id,
    rpcs: [
      "https://bsc-dataseed4.ninicoin.io",
      "https://bsc.rpc.blxrbdn.com",
      "https://bsc-dataseed1.bnbchain.org",
      "https://bsc-dataseed2.bnbchain.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed3.ninicoin.io",
      // 'https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', // NOTE: 429 error
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed.bnbchain.org",
      "https://bsc-dataseed3.bnbchain.org",
      "https://bsc-dataseed4.bnbchain.org",
      "https://binance.nodereal.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-pokt.nodies.app",
      "https://public.stackup.sh/api/v1/node/bsc-mainnet",
      "https://bsc-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
      "https://rpc-bsc.48.club",
      "https://koge-rpc-bsc.48.club",
      "https://bsc.meowrpc.com"
    ]
  },
  {
    id: chains.avalanche.id,
    rpcs: [
      "https://avalanche-c-chain-rpc.publicnode.com",
      // 'https://api.tatum.io/v3/blockchain/node/avax-mainnet', // NOTE: CORS issue
      "https://avax-pokt.nodies.app/ext/bc/C/rpc",
      "https://avax.meowrpc.com",
      "https://api.avax.network/ext/bc/C/rpc"
    ]
  },
  {
    id: chains.blast.id,
    rpcs: [
      "https://rpc.blast.io"
      // 'https://blast.din.dev/rpc' // NOTE: 503 error
    ]
  },
  {
    id: chains.sepolia.id,
    rpcs: [
      "https://ethereum-sepolia-rpc.publicnode.com",
      "https://rpc2.sepolia.org",
      // 'https://sepolia.gateway.tenderly.co', // NOTE: 400 on `eth_getFilterChanges`
      // 'https://gateway.tenderly.co/public/sepolia', // NOTE: 400 on `eth_getFilterChanges`
      "https://public.stackup.sh/api/v1/node/ethereum-sepolia",
      "https://eth-sepolia-public.unifra.io",
      "https://sepolia.drpc.org",
      "https://rpc-sepolia.rockx.com",
      "https://ethereum-sepolia.rpc.subquery.network/public"
    ]
  },
  {
    id: chains.degen.id,
    rpcs: ["https://rpc.degen.tips", "https://nitrorpc-degen-mainnet-1.t.conduit.xyz"]
  },
  {
    id: chains.zora.id,
    rpcs: ["https://rpc.zora.energy"]
  },
  {
    id: chains.kaia.id,
    rpcs: [
      "https://public-en.node.kaia.io",
      // ✅ - All checks passed
      "https://rpc.ankr.com/klaytn",
      // ✅ - All checks passed
      "https://kaia.blockpi.network/v1/rpc/public",
      // 🤔 - Old block NOT supported
      "https://klaytn-pokt.nodies.app",
      // 🤔 - Old block NOT supported
      "https://klaytn.api.onfinality.io/public",
      // 🤔 - Old block NOT supported
      "https://public-en-cypress.klaytn.net",
      // ❌ - Both checks failed
      "https://klaytn-rpc.gateway.pokt.network/",
      // ❌ - Both checks failed
      "https://klaytn-mainnet.g.allthatnode.com/full/evm"
      // ❌ - Both checks failed
    ]
  }
];
function customTransport(params) {
  const { rpc, fetchOptions } = params;
  return viem.http(rpc, {
    key: rpc,
    name: rpc,
    fetchOptions,
    retryCount: 0,
    timeout: 4e3
  });
}
function chainRPCFallbacks(chain, fetchOptions = {
  cache: "no-store"
}) {
  return RPCS.find((c) => c.id === chain.id)?.rpcs.map(
    (rpc) => customTransport({
      rpc,
      fetchOptions
    })
  ) || [viem.http()];
}
const DEFAULT_RANK_OPTIONS = {
  retryCount: 0,
  rank: {
    interval: 1e5,
    sampleCount: 5,
    timeout: 4e3,
    weights: {
      latency: 0.3,
      stability: 0.7
    }
  }
};

const BOND_ERROR_MESSAGES = {
  AddressEmptyCode: {
    message: "The address field cannot be empty. Please provide a valid address.",
    reportToBugsnag: true
  },
  AddressInsufficientBalance: {
    message: "The address does not have enough balance to proceed with the transaction.",
    reportToBugsnag: false
  },
  ERC1167FailedCreateClone: {
    message: "Failed to create a clone due to an ERC1167 cloning error. Please check the implementation.",
    reportToBugsnag: true
  },
  FailedInnerCall: {
    message: "An internal call within the contract failed, indicating a potential issue with contract logic or state.",
    reportToBugsnag: true
  },
  MCV2_Bond__CreationFeeTransactionFailed: {
    message: "The transaction for the creation fee has failed. Ensure you have enough funds and the fee is correctly set.",
    reportToBugsnag: true
  },
  MCV2_Bond__ExceedMaxSupply: {
    message: "The creation of this token would exceed its maximum supply limit. No further tokens can be created.",
    reportToBugsnag: false
  },
  MCV2_Bond__ExceedTotalSupply: {
    message: "Attempting to exceed the total supply of tokens. Please verify the token amount.",
    reportToBugsnag: false
  },
  MCV2_Bond__InvalidConstructorParams: {
    message: "The constructor parameters provided are invalid. Please check and try again.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidCreationFee: {
    message: "The creation fee provided is invalid. Ensure the fee meets the required criteria.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidCreatorAddress: {
    message: "The creator address is invalid. A valid creator address is required to proceed.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidCurrentSupply: {
    message: "The current supply value is invalid. Please check the supply amount and try again.",
    reportToBugsnag: true
  },
  MCV2_BOND__InvalidPaginationParameters: {
    message: "Pagination parameters are invalid. Please adjust your request and try again.",
    reportToBugsnag: false
  },
  MCV2_Bond__InvalidReceiver: {
    message: "The receiver address is invalid. Transactions require a valid receiver address.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidReserveToken: {
    message: "The reserve token specified is invalid. Check the token address and try again.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidStepParams: {
    message: "The step parameters provided are invalid. Please review and correct them.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidTokenAmount: {
    message: "The token amount specified is invalid. Ensure the amount is correct and try again.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidTokenCreationParams: {
    message: "The token creation parameters are invalid. Check the documentation and try again.",
    reportToBugsnag: true
  },
  MCV2_Bond__PermissionDenied: {
    message: "You do not have permission to perform this action. Ensure you have the necessary rights.",
    reportToBugsnag: true
  },
  MCV2_Bond__SlippageLimitExceeded: {
    message: "The slippage limit has been exceeded. Adjust your slippage settings and try again.",
    reportToBugsnag: false
  },
  MCV2_Bond__TokenNotFound: {
    message: "The specified token could not be found. Check the token address and try again.",
    reportToBugsnag: true
  },
  MCV2_Bond__TokenSymbolAlreadyExists: {
    message: "The token symbol already exists. Use a unique symbol and try again.",
    reportToBugsnag: true
  },
  MCV2_Royalty__InvalidParams: {
    message: "The parameters provided for royalty settings are invalid. Please review and correct them.",
    reportToBugsnag: true
  },
  MCV2_Royalty__NothingToClaim: {
    message: "There is nothing to claim at this time. Check back later or verify your entitlement.",
    reportToBugsnag: false
  },
  OwnableInvalidOwner: {
    message: "The operation was attempted by an invalid owner. Only the contract owner can perform this action.",
    reportToBugsnag: true
  },
  OwnableUnauthorizedAccount: {
    message: "The account is unauthorized. This action is restricted to authorized accounts only.",
    reportToBugsnag: true
  },
  SafeCastOverflowedUintDowncast: {
    message: "Overflow encountered during uint downcasting. Please check the values being cast.",
    reportToBugsnag: true
  },
  SafeERC20FailedOperation: {
    message: "An operation with ERC20 tokens failed. Ensure the contract and token addresses are correct.",
    reportToBugsnag: true
  },
  MCV2_Bond__InvalidGraduateReserveAmount: {
    message: "InvalidGraduateReserveAmount",
    reportToBugsnag: void 0
  },
  MCV2_Bond__SqrtPriceX96CalculationInvalidInput: {
    message: "SqrtPriceX96CalculationInvalidInput",
    reportToBugsnag: void 0
  },
  MCV2_Bond__SqrtPriceX96CalculationOverflow: {
    message: "SqrtPriceX96CalculationOverflow",
    reportToBugsnag: void 0
  }
};
const ERC20_ERROR_MESSAGES = {
  ERC20InsufficientAllowance: {
    message: "Your allowance for spending these tokens is insufficient. Please approve more tokens before proceeding.",
    reportToBugsnag: true
  },
  ERC20InsufficientBalance: {
    message: "Your balance is insufficient to complete this transaction. Please ensure you have enough tokens.",
    reportToBugsnag: false
  },
  ERC20InvalidApprover: {
    message: "The approver address is invalid or does not have permission to approve these tokens.",
    reportToBugsnag: true
  },
  ERC20InvalidReceiver: {
    message: "The receiver address is invalid. Please provide a valid address to complete the transaction.",
    reportToBugsnag: true
  },
  ERC20InvalidSender: {
    message: "The sender address is invalid or does not have permission to send these tokens.",
    reportToBugsnag: true
  },
  ERC20InvalidSpender: {
    message: "The spender address is invalid or not allowed to spend tokens on behalf of the sender.",
    reportToBugsnag: true
  },
  MCV2_Token__AlreadyInitialized: {
    message: "This token has already been initialized. Token initialization can only occur once.",
    reportToBugsnag: true
  },
  MCV2_Token__PermissionDenied: {
    message: "Permission denied. You do not have the necessary permissions to perform this action.",
    reportToBugsnag: true
  }
};
const ERC1155_ERROR_MESSAGES = {
  ERC1155InsufficientBalance: {
    message: "Your balance for one or more tokens is insufficient to complete this transaction.",
    reportToBugsnag: false
  },
  ERC1155InvalidApprover: {
    message: "The approver for this operation is invalid or does not have approval rights.",
    reportToBugsnag: true
  },
  ERC1155InvalidArrayLength: {
    message: "The length of the array provided does not match the expected length for this operation.",
    reportToBugsnag: true
  },
  ERC1155InvalidOperator: {
    message: "The operator address provided is invalid or not authorized to perform this operation.",
    reportToBugsnag: true
  },
  ERC1155InvalidReceiver: {
    message: "The receiver address provided is invalid. A valid address is required to receive the tokens.",
    reportToBugsnag: true
  },
  ERC1155InvalidSender: {
    message: "The sender address is invalid or unauthorized to send these tokens.",
    reportToBugsnag: true
  },
  ERC1155MissingApprovalForAll: {
    message: "Approval for all tokens has not been given. Please approve all tokens before proceeding.",
    reportToBugsnag: true
  },
  MCV2_MultiToken__AlreadyInitialized: {
    message: "The multi-token contract has already been initialized and cannot be initialized again.",
    reportToBugsnag: true
  },
  MCV2_MultiToken__BurnAmountExceedsTotalSupply: {
    message: "The amount to be burned exceeds the total supply of the token.",
    reportToBugsnag: true
  },
  MCV2_MultiToken__NotApproved: {
    message: "The operation was not approved. Ensure you have the necessary approvals before retrying.",
    reportToBugsnag: true
  },
  MCV2_MultiToken__PermissionDenied: {
    message: "Permission denied for this operation. Required permissions are not met.",
    reportToBugsnag: true
  }
};
const LOCKER_ERROR_MESSAGES = {
  AddressEmptyCode: {
    message: "The provided address is empty. Please ensure you input a valid address.",
    reportToBugsnag: true
  },
  AddressInsufficientBalance: {
    message: "The address has an insufficient balance for this operation. Please check your balance and try again.",
    reportToBugsnag: false
  },
  FailedInnerCall: {
    message: "An internal contract call failed. Please review the contract logic or contact support.",
    reportToBugsnag: true
  },
  LockUp__AlreadyClaimed: {
    message: "The rewards or tokens have already been claimed. You cannot claim them again.",
    reportToBugsnag: true
  },
  LockUp__InvalidPaginationParameters: {
    message: "Pagination parameters provided are invalid. Please adjust and retry your request.",
    reportToBugsnag: true
  },
  LockUp__InvalidParams: {
    message: "Parameters provided for the operation are invalid. Please review and correct them.",
    reportToBugsnag: true
  },
  LockUp__NotYetUnlocked: {
    message: "The locked tokens are not yet available for claim. Please wait until the unlock period has passed.",
    reportToBugsnag: true
  },
  LockUp__PermissionDenied: {
    message: "You do not have permission to perform this action. Check your account permissions and try again.",
    reportToBugsnag: true
  },
  SafeERC20FailedOperation: {
    message: "An operation with ERC20 tokens failed. Ensure the contract addresses and token details are correct.",
    reportToBugsnag: true
  }
};
const MERKLE_ERROR_MESSAGES = {
  AddressEmptyCode: {
    message: "The address provided is empty. A valid address is required for this operation.",
    reportToBugsnag: true
  },
  AddressInsufficientBalance: {
    message: "Insufficient balance for the operation. Please ensure your balance is sufficient to proceed.",
    reportToBugsnag: false
  },
  FailedInnerCall: {
    message: "An internal call within the contract failed, indicating a potential issue. Please investigate further.",
    reportToBugsnag: true
  },
  MerkleDistributor__AlreadyClaimed: {
    message: "The claim has already been made. Duplicate claims are not allowed.",
    reportToBugsnag: true
  },
  MerkleDistributor__AlreadyRefunded: {
    message: "The refund has already been processed. Duplicate refunds are not permitted.",
    reportToBugsnag: true
  },
  MerkleDistributor__Finished: {
    message: "The distribution period has ended. No further claims can be processed.",
    reportToBugsnag: true
  },
  MerkleDistributor__InvalidCaller: {
    message: "The caller is not authorized for this operation. Please check the caller\u2019s permissions.",
    reportToBugsnag: true
  },
  MerkleDistributor__InvalidPaginationParameters: {
    message: "Provided pagination parameters are invalid. Please correct them and try again.",
    reportToBugsnag: true
  },
  MerkleDistributor__InvalidParams: {
    message: "The parameters provided are invalid. Check the input parameters and retry.",
    reportToBugsnag: true
  },
  MerkleDistributor__InvalidProof: {
    message: "The provided proof is invalid. Ensure you connected the correct address for your airdrop claim.",
    reportToBugsnag: true
  },
  MerkleDistributor__NoClaimableTokensLeft: {
    message: "There are no tokens left to claim. All tokens have been distributed.",
    reportToBugsnag: true
  },
  MerkleDistributor__NothingToRefund: {
    message: "There is nothing to refund. Please check your claim status.",
    reportToBugsnag: true
  },
  MerkleDistributor__NotStarted: {
    message: "The distribution has not started yet. Please wait for the distribution period to begin.",
    reportToBugsnag: true
  },
  MerkleDistributor__PermissionDenied: {
    message: "Permission denied for this action. You do not have the necessary permissions.",
    reportToBugsnag: true
  },
  MerkleDistributor__Refunded: {
    message: "Your tokens have been refunded. Check your account for the refunded tokens.",
    reportToBugsnag: true
  },
  SafeERC20FailedOperation: {
    message: "An ERC20 operation failed. Ensure the contract address and token details are correct and try again.",
    reportToBugsnag: true
  }
};
const ZAP_ERROR_MESSAGES = {
  AddressEmptyCode: {
    message: "The provided address is empty. A valid address must be used for this operation.",
    reportToBugsnag: true
  },
  AddressInsufficientBalance: {
    message: "The address has insufficient balance for the intended operation. Please check your balance.",
    reportToBugsnag: false
  },
  FailedInnerCall: {
    message: "An internal call failed. This may indicate an issue with contract interactions or logic.",
    reportToBugsnag: true
  },
  MCV2_ZapV1__EthTransferFailed: {
    message: "ETH transfer failed. Ensure you have enough ETH and the recipient address is correct.",
    reportToBugsnag: true
  },
  MCV2_ZapV1__InvalidReceiver: {
    message: "The receiver address is invalid. Transactions require a valid receiver address.",
    reportToBugsnag: true
  },
  MCV2_ZapV1__ReserveIsNotWETH: {
    message: "The reserve is not WETH. This operation requires WETH as the reserve currency.",
    reportToBugsnag: true
  },
  MCV2_ZapV1__SlippageLimitExceeded: {
    message: "The slippage limit was exceeded. Adjust your slippage tolerance and try again.",
    reportToBugsnag: false
  },
  OwnableInvalidOwner: {
    message: "The action was attempted by an invalid owner. Only the contract owner can perform this action.",
    reportToBugsnag: true
  },
  OwnableUnauthorizedAccount: {
    message: "This account is unauthorized to perform the requested action. Check account permissions.",
    reportToBugsnag: true
  },
  SafeERC20FailedOperation: {
    message: "An operation involving ERC20 tokens failed. Check the contract and token details before retrying.",
    reportToBugsnag: true
  }
};
const CONTRACT_ERROR_MESSAGES = {
  ...BOND_ERROR_MESSAGES,
  ...ERC20_ERROR_MESSAGES,
  ...ERC1155_ERROR_MESSAGES,
  ...LOCKER_ERROR_MESSAGES,
  ...MERKLE_ERROR_MESSAGES,
  ...ZAP_ERROR_MESSAGES
};

const ARBITRUM_TOKENS = {
  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x912CE59144191C1204E64559FE8253a0e49E6548": {
    name: "Arbitrum",
    symbol: "ARB",
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/arbitrum.png"
  },
  "0xaf88d065e77c8cC2239327C5EDb3A432268e5831": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": {
    name: "Bridged USDC",
    symbol: "USDC.e",
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a": {
    name: "GMX Token",
    symbol: "GMX",
    address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/18323/large/arbit.png"
  },
  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdt.png"
  },
  "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": {
    name: "Wrapped BTC",
    symbol: "WBTC",
    address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    decimals: 8,
    image: "https://bitagent.io/assets/tokens/wbtc.png"
  },
  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1": {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/dai.png"
  },
  "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4": {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/link.png"
  },
  "0x00CBcF7B3d37844e44b888Bc747bDd75FCf4E555": {
    name: "xPet.tech XPET",
    symbol: "XPET",
    address: "0x00CBcF7B3d37844e44b888Bc747bDd75FCf4E555",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/33553/large/xpet_token.jpeg"
  },
  "0x5979D7b546E38E414F7E9822514be443A4800529": {
    name: "Wrapped stETH",
    symbol: "wstETH",
    address: "0x5979D7b546E38E414F7E9822514be443A4800529",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/18834/large/wstETH.png"
  },
  "0x6fD58f5a2F3468e35fEb098b5F59F04157002407": {
    name: "poor guy",
    symbol: "pogai",
    address: "0x6fD58f5a2F3468e35fEb098b5F59F04157002407",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/30116/large/pogai.jpeg"
  },
  "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8": {
    name: "Pendle",
    symbol: "PENDLE",
    address: "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/15069/large/Pendle_Logo_Normal-03.png"
  },
  "0x539bdE0d7Dbd336b79148AA742883198BBF60342": {
    name: "Magic",
    symbol: "MAGIC",
    address: "0x539bdE0d7Dbd336b79148AA742883198BBF60342",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/18623/large/magic.png"
  },
  "0x6dAF586B7370B14163171544fca24AbcC0862ac5": {
    name: "xPet.tech BPET",
    symbol: "BPET",
    address: "0x6dAF586B7370B14163171544fca24AbcC0862ac5",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/33848/large/BPET_logo.png"
  },
  "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42": {
    name: "MUX Protocol",
    symbol: "MCB",
    address: "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/11796/large/mux.jpg"
  },
  "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F": {
    name: "Frax",
    symbol: "FRAX",
    address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/frax.png"
  },
  "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0": {
    name: "Uniswap",
    symbol: "UNI",
    address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/uni.png"
  },
  "0x13Ad51ed4F1B7e9Dc168d8a00cB3f4dDD85EfA60": {
    name: "Lido DAO",
    symbol: "LDO",
    address: "0x13Ad51ed4F1B7e9Dc168d8a00cB3f4dDD85EfA60",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ldo.png"
  },
  "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978": {
    name: "Curve DAO Token",
    symbol: "CRV",
    address: "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/curve.png"
  }
};

const AVALANCHE_TOKENS = {
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": {
    name: "Wrapped AVAX",
    symbol: "WAVAX",
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/avalanche.png"
  },
  "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7": {
    name: "TetherToken",
    symbol: "USDt",
    address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdt.png"
  },
  "0x152b9d0FdC40C096757F570A51E494bd4b943E50": {
    name: "Bitcoin",
    symbol: "BTC.b",
    address: "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    decimals: 8,
    image: "https://assets.coingecko.com/coins/images/26115/large/btcb.png"
  },
  "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590": {
    name: "StargateToken",
    symbol: "STG",
    address: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/24413/large/STG_LOGO.png"
  },
  "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd": {
    name: "JoeToken",
    symbol: "JOE",
    address: "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/17569/large/JoeToken.png"
  },
  "0x714f020C54cc9D104B6F4f6998C63ce2a31D1888": {
    name: "Step App",
    symbol: "FITFI",
    address: "0x714f020C54cc9D104B6F4f6998C63ce2a31D1888",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/25015/large/200x200.png"
  }
};

const AVALANCHE_FUJI_TOKENS = {
  "0xd00ae08403B9bbb9124bB305C09058E32C39A48c": {
    name: "Wrapped AVAX",
    symbol: "WAVAX",
    address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/avalanche.png"
  }
};

const BASE_TOKENS = {
  "0x4200000000000000000000000000000000000006": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": {
    name: "USDC",
    symbol: "USDC",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA": {
    name: "Bridged USDC",
    symbol: "USDBC",
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb": {
    name: "Dai",
    symbol: "DAI",
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/dai.png"
  },
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22": {
    name: "Coinbase Wrapped Staked ETH",
    symbol: "CBETH",
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/27008/large/cbeth.png"
  },
  "0x940181a94A35A4569E4529A3CDfB74e38FD98631": {
    name: "Aerodrome Finance",
    symbol: "AERO",
    address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/31745/large/token.png"
  },
  "0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8": {
    name: "Bald",
    symbol: "BALD",
    address: "0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/31119/large/cdjxKSjo_400x400.jpg"
  },
  "0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b": {
    name: "Echelon Prime",
    symbol: "PRIME",
    address: "0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/29053/large/prime-logo-small-border_%282%29.png"
  },
  "0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b": {
    name: "tBTC",
    symbol: "TBTC",
    address: "0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/11224/large/0x18084fba666a33d37592fa2633fd49a74dd93a88.png"
  },
  "0x4158734D47Fc9692176B5085E0F52ee0Da5d47F1": {
    name: "Balancer",
    symbol: "BAL",
    address: "0x4158734D47Fc9692176B5085E0F52ee0Da5d47F1",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/11683/large/Balancer.png"
  },
  "0xdCf5130274753c8050aB061B1a1DCbf583f5bFd0": {
    name: "ViciCoin",
    symbol: "VCNT",
    address: "0xdCf5130274753c8050aB061B1a1DCbf583f5bFd0",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/31305/large/ViciCoin_-_small.png"
  },
  "0xCfA3Ef56d303AE4fAabA0592388F19d7C3399FB4": {
    name: "Electronic USD",
    symbol: "EUSD",
    address: "0xCfA3Ef56d303AE4fAabA0592388F19d7C3399FB4",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/28445/large/0xa0d69e286b938e21cbf7e51d71f6a4c8918f482f.png"
  },
  "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85": {
    name: "Seamless",
    symbol: "SEAM",
    address: "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/33480/large/Seamless_Logo_Black_Transparent.png"
  },
  "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9": {
    name: "BaseSwap",
    symbol: "BSWAP",
    address: "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/31245/large/Baseswap_LogoNew.jpg"
  }
};

const BLAST_TOKENS = {
  "0x4300000000000000000000000000000000000004": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4300000000000000000000000000000000000004",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x4300000000000000000000000000000000000003": {
    name: "USDBlast",
    symbol: "USDB",
    address: "0x4300000000000000000000000000000000000003",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/blast.png"
  }
};

const BLAST_SEPOLIA_TOKENS = {
  "0x4200000000000000000000000000000000000023": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000023",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x4200000000000000000000000000000000000022": {
    name: "USDBlast",
    symbol: "USDB",
    address: "0x4200000000000000000000000000000000000022",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/blast.png"
  }
};

const BSC_TOKENS = {
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
    name: "Wrapped BNB",
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png"
  },
  "0x9A044277c8C0Db6703552C185060aa478557363F": {
    name: "Unibase",
    symbol: "BASE",
    address: "0x9A044277c8C0Db6703552C185060aa478557363F",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/base.png"
  },
  "0x55d398326f99059ff775485246999027b3197955": {
    name: "Binance-Peg BSC-USD",
    symbol: "BSC-USD",
    address: "0x55d398326f99059ff775485246999027b3197955",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/usdt.png"
  },
  "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82": {
    name: "PancakeSwap Token",
    symbol: "Cake",
    address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png"
  },
  "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63": {
    name: "Venus",
    symbol: "XVS",
    address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/12677/large/download.jpg"
  },
  "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1": {
    name: "Biswap",
    symbol: "BSW",
    address: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/16845/large/biswap.png"
  },
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
    name: "Binance-Peg Ethereum Token",
    symbol: "ETH",
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": {
    name: "Binance-Peg USD Coin",
    symbol: "USDC",
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3": {
    name: "Binance-Peg Dai Token",
    symbol: "DAI",
    address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/dai.png"
  },
  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c": {
    name: "Binance-Peg BTCB Token",
    symbol: "BTCB",
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/wbtc.png"
  },
  "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE": {
    name: "Binance-Peg XRP Token",
    symbol: "XRP",
    address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/xrp.png"
  },
  "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD": {
    name: "Binance-Peg ChainLink Token",
    symbol: "LINK",
    address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/link.png"
  },
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
    name: "Binance-Peg BUSD Token",
    symbol: "BUSD",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/busd.png"
  },
  "0xd17479997F34dd9156Deef8F95A52D81D265be9c": {
    name: "Decentralized USD",
    symbol: "USDD",
    address: "0xd17479997F34dd9156Deef8F95A52D81D265be9c",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/usdd.png"
  },
  "0xCC42724C6683B7E57334c4E856f4c9965ED682bD": {
    name: "Matic Token",
    symbol: "MATIC",
    address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/matic.png"
  },
  "0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350": {
    name: "Binance-Peg Maker",
    symbol: "MKR",
    address: "0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/mkr.png"
  },
  "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1": {
    name: "Binance-Peg Uniswap",
    symbol: "UNI",
    address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/uni.png"
  },
  "0x111111111117dC0aa78b770fA6A738034120C302": {
    name: "1INCH Token",
    symbol: "1INCH",
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/1inch.svg"
  },
  "0x8595F9dA7b868b1822194fAEd312235E43007b49": {
    name: "Binance-Peg BitTorrent Token",
    symbol: "BTT",
    address: "0x8595F9dA7b868b1822194fAEd312235E43007b49",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/btt.png"
  },
  "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D": {
    name: "Binance-Peg Shiba Inu Token",
    symbol: "SHIB",
    address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/shib.png"
  },
  "0xbA2aE424d960c26247Dd6c32edC70B295c744C43": {
    name: "Binance-Peg Dogecoin Token",
    symbol: "DOGE",
    address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    decimals: 8,
    image: "https://bitagent.io/assets/tokens/doge.png"
  },
  "0xc748673057861a797275CD8A068AbB95A902e8de": {
    name: "Baby Doge Coin",
    symbol: "BabyDoge",
    address: "0xc748673057861a797275CD8A068AbB95A902e8de",
    decimals: 9,
    image: "https://bitagent.io/assets/tokens/babydoge.png"
  },
  "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47": {
    name: "Binance-Peg Cardano Token",
    symbol: "ADA",
    address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/cardano.png"
  },
  "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3": {
    name: "TRON",
    symbol: "TRX",
    address: "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/tron.png"
  },
  "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94": {
    name: "Binance-Peg Litecoin Token",
    symbol: "LTC",
    address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ltc.png"
  },
  "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402": {
    name: "Binance-Peg Polkadot Token",
    symbol: "DOT",
    address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/dot.png"
  }
};

const MAINNET_TOKENS = {
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x9AAb071B4129B083B01cB5A0Cb513Ce7ecA26fa5": {
    name: "Hunt Token",
    symbol: "HUNT",
    address: "0x9AAb071B4129B083B01cB5A0Cb513Ce7ecA26fa5",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/hunt.png"
  },
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdt.png"
  },
  "0x6B175474E89094C44Da98b954EedeAC495271d0F": {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/dai.png"
  },
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": {
    name: "Wrapped BTC",
    symbol: "WBTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    decimals: 8,
    image: "https://bitagent.io/assets/tokens/wbtc.png"
  },
  "0x4d224452801ACEd8B2F0aebE155379bb5D594381": {
    name: "ApeCoin",
    symbol: "APE",
    address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ape.png"
  },
  "0x6982508145454ce325ddbe47a25d4ec3d2311933": {
    name: "Pepe",
    symbol: "PEPE",
    address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/pepe.webp"
  },
  "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE": {
    name: "Shiba Inu",
    symbol: "SHIB",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/shib.png"
  },
  "0xb131f4A55907B10d1F0A50d8ab8FA09EC342cd74": {
    name: "Memecoin",
    symbol: "MEME",
    address: "0xb131f4A55907B10d1F0A50d8ab8FA09EC342cd74",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/32528/large/memecoin_%282%29.png"
  },
  "0x514910771AF9Ca656af840dff83E8264EcF986CA": {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/link.png"
  },
  "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0": {
    name: "Matic Token",
    symbol: "MATIC",
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/matic.png"
  },
  "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2": {
    name: "Maker",
    symbol: "MKR",
    address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/mkr.png"
  },
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/uni.png"
  },
  "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32": {
    name: "Lido DAO Token",
    symbol: "LDO",
    address: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ldo.png"
  },
  "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0": {
    name: "Wrapped stETH",
    symbol: "wstETH",
    address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/18834/large/wstETH.png"
  },
  "0x111111111117dC0aa78b770fA6A738034120C302": {
    name: "1INCH Token",
    symbol: "1INCH",
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/1inch.svg"
  },
  "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2": {
    name: "SushiToken",
    symbol: "SUSHI",
    address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png"
  },
  "0x5283D291DBCF85356A21bA090E6db59121208b44": {
    name: "Blur",
    symbol: "BLUR",
    address: "0x5283D291DBCF85356A21bA090E6db59121208b44",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/28453/large/blur.png"
  },
  "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF": {
    name: "Immutable X",
    symbol: "IMX",
    address: "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png"
  },
  "0xf4d2888d29D722226FafA5d9B24F9164c092421E": {
    name: "LooksRare Token",
    symbol: "LOOKS",
    address: "0xf4d2888d29D722226FafA5d9B24F9164c092421E",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/looks.png"
  },
  "0x6810e776880C02933D47DB1b9fc05908e5386b96": {
    name: "Gnosis Token",
    symbol: "GNO",
    address: "0x6810e776880C02933D47DB1b9fc05908e5386b96",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/gno.png"
  },
  "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8": {
    name: "agEUR",
    symbol: "agEUR",
    address: "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ageur.png"
  },
  "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9": {
    name: "Aave Token",
    symbol: "AAVE",
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/aave.png"
  }
};

const OPTIMISM_TOKENS = {
  "0x4200000000000000000000000000000000000006": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x4200000000000000000000000000000000000042": {
    name: "Optimism",
    symbol: "OP",
    address: "0x4200000000000000000000000000000000000042",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/optimism.png"
  },
  "0x7F5c764cBc14f9669B88837ca1490cCa17c31607": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58": {
    name: "Tether USD",
    symbol: "USDT",
    address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdt.png"
  },
  "0x68f180fcCe6836688e9084f035309E29Bf0A2095": {
    name: "Wrapped BTC",
    symbol: "WBTC",
    address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
    decimals: 8,
    image: "https://bitagent.io/assets/tokens/wbtc.png"
  },
  "0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1": {
    name: "Worldcoin",
    symbol: "WLD",
    address: "0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/worldcoin.png"
  },
  "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6": {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/link.png"
  },
  "0xFdb794692724153d1488CcdBE0C56c252596735F": {
    name: "Lido DAO Token",
    symbol: "LDO",
    address: "0xFdb794692724153d1488CcdBE0C56c252596735F",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ldo.png"
  },
  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1": {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/dai.png"
  },
  "0x2E3D870790dC77A83DD1d18184Acc7439A53f475": {
    name: "Frax",
    symbol: "FRAX",
    address: "0x2E3D870790dC77A83DD1d18184Acc7439A53f475",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/frax.png"
  },
  "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9": {
    name: "Synth sUSD",
    symbol: "sUSD",
    address: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/sUSD.png"
  },
  "0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db": {
    name: "VelodromeV2",
    symbol: "VELO",
    address: "0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/velo.png"
  },
  "0x76FB31fb4af56892A25e32cFC43De717950c9278": {
    name: "Aave Token",
    symbol: "AAVE",
    address: "0x76FB31fb4af56892A25e32cFC43De717950c9278",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/aave.png"
  },
  "0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb": {
    name: "Wrapped stETH",
    symbol: "wstETH",
    address: "0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/18834/large/wstETH.png"
  },
  "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4": {
    name: "Synthetix Network Token",
    symbol: "SNX",
    address: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/3406/large/SNX.png"
  },
  "0x9e1028F5F1D5eDE59748FFceE5532509976840E0": {
    name: "Perpetual",
    symbol: "PERP",
    address: "0x9e1028F5F1D5eDE59748FFceE5532509976840E0",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/12381/large/60d18e06844a844ad75901a9_mark_only_03.png"
  },
  "0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED": {
    name: "agEUR",
    symbol: "agEUR",
    address: "0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ageur.png"
  }
};

const POLYGON_TOKENS = {
  "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270": {
    name: "Wrapped Matic",
    symbol: "WMATIC",
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/matic.png"
  },
  "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F": {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdt.png"
  },
  "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6": {
    name: "Wrapped BTC",
    symbol: "WBTC",
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    decimals: 8,
    image: "https://bitagent.io/assets/tokens/wbtc.png"
  },
  "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39": {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/link.png"
  },
  "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89": {
    name: "Frax",
    symbol: "FRAX",
    address: "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/frax.png"
  },
  "0xb33EaAd8d922B1083446DC23f610c2567fB5180f": {
    name: "Uniswap",
    symbol: "UNI",
    address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/uni.png"
  },
  "0xC3C7d422809852031b44ab29EEC9F1EfF2A58756": {
    name: "Lido DAO Token",
    symbol: "LDO",
    address: "0xC3C7d422809852031b44ab29EEC9F1EfF2A58756",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ldo.png"
  },
  "0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f": {
    name: "1INCH Token",
    symbol: "1INCH",
    address: "0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/1inch.svg"
  },
  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/dai.png"
  },
  "0xB7b31a6BC18e48888545CE79e83E06003bE70930": {
    name: "ApeCoin",
    symbol: "APE",
    address: "0xB7b31a6BC18e48888545CE79e83E06003bE70930",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ape.png"
  },
  "0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec": {
    name: "Shiba Inu",
    symbol: "SHIB",
    address: "0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/shib.png"
  },
  "0xD6DF932A45C0f255f85145f286eA0b292B21C90B": {
    name: "Aave Token",
    symbol: "AAVE",
    address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/aave.png"
  },
  "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683": {
    name: "SAND",
    symbol: "SAND",
    address: "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/sandbox.png"
  },
  "0x172370d5Cd63279eFa6d502DAB29171933a610AF": {
    name: "Curve DAO Token",
    symbol: "CRV",
    address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/curve.png"
  },
  "0x61299774020dA444Af134c82fa83E3810b309991": {
    name: "Render Token",
    symbol: "RNDR",
    address: "0x61299774020dA444Af134c82fa83E3810b309991",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/11636/large/rndr.png"
  },
  "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4": {
    name: "agEUR",
    symbol: "agEUR",
    address: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/ageur.png"
  },
  "0x50B728D8D964fd00C2d0AAD81718b71311feF68a": {
    name: "Synthetix Network Token",
    symbol: "SNX",
    address: "0x50B728D8D964fd00C2d0AAD81718b71311feF68a",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/3406/large/SNX.png"
  }
};

const SEPOLIA_TOKENS = {
  "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  }
};

const DEGEN_TOKENS = {
  "0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387": {
    name: "Wrapped Degen",
    symbol: "WDEGEN",
    address: "0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/degen.png"
  }
};

const BASE_SEPOLIA_TOKENS = {
  "0x4200000000000000000000000000000000000006": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  }
};

const CYBER_TESTNET_TOKENS = {
  "0xf760686C2b40F7C526D040b979641293D2F55816": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0xf760686C2b40F7C526D040b979641293D2F55816",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  }
};

const CYBER_TOKENS = {
  "0x4200000000000000000000000000000000000006": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  }
};

const KAIA_TOKENS = {
  "0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432": {
    name: "Wrapped Klaytn",
    symbol: "WKLAY",
    address: "0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/kaia.png"
  },
  "0x98A8345bB9D3DDa9D808Ca1c9142a28F6b0430E1": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x98A8345bB9D3DDa9D808Ca1c9142a28F6b0430E1",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0x608792Deb376CCE1c9FA4D0E6B7b44f507CfFa6A": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x608792Deb376CCE1c9FA4D0E6B7b44f507CfFa6A",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  },
  "0x5C13E303a62Fc5DEdf5B52D66873f2E59fEdADC2": {
    name: "Tether USD",
    symbol: "USDT",
    address: "0x5C13E303a62Fc5DEdf5B52D66873f2E59fEdADC2",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdt.png"
  }
};

const HAM_TOKENS = {
  "0x4200000000000000000000000000000000000006": {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/weth.png"
  },
  "0xE8DD44d0791B73afe9066C3A77721f42d0844bEB": {
    name: "The Next 100x Memecoin on Base",
    symbol: "TN100x",
    address: "0xE8DD44d0791B73afe9066C3A77721f42d0844bEB",
    decimals: 18,
    image: "https://bitagent.io/assets/tokens/tn100x.png"
  },
  "0x30005Fd5eE0480D0ccFdDe168BBe4527Ffb27062": {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x30005Fd5eE0480D0ccFdDe168BBe4527Ffb27062",
    decimals: 6,
    image: "https://bitagent.io/assets/tokens/usdc.png"
  }
  // NOTE:
  // Disable the following tokens because the bridge doesn't work properly with them at the moment and some of their contracts are not verified
  // We can enable them later if we confirm the bridge works properly and contracts are verified.
  // '0x2c7Bb8516A08cB83776E038934a3e9b3Bbb54b80': {
  //   name: 'Hunt Token',
  //   symbol: 'HUNT',
  //   address: '0x2c7Bb8516A08cB83776E038934a3e9b3Bbb54b80',
  //   decimals: 18,
  //   image: '/assets/tokens/hunt.png',
  // },
  // '0x489A9121ac2D99a29556AbbCA80c02fd3C755418': {
  //   name: 'Based Chad',
  //   symbol: 'CHAD',
  //   address: '0x489A9121ac2D99a29556AbbCA80c02fd3C755418',
  //   decimals: 18,
  //   image: '/assets/tokens/chad.png',
  // },
  // '0x1259276781757704EfD471c7F73F343C7f60Ac4a': {
  //   name: 'Degen',
  //   symbol: 'DEGEN',
  //   address: '0x1259276781757704EfD471c7F73F343C7f60Ac4a',
  //   decimals: 18,
  //   image: '/assets/tokens/degen.png',
  // },
  // '0x7172ACB16Ac0C11f717fF699CC23bf881b60124F': {
  //   name: '747 Airlines (boeing)',
  //   symbol: 'CRASH',
  //   address: '0x7172ACB16Ac0C11f717fF699CC23bf881b60124F',
  //   decimals: 18,
  //   image: '/assets/tokens/crash.png',
  // },
  // '0x822c3f852A395975D10dEBB8886518621b508954': {
  //   name: 'BORED',
  //   symbol: 'BORED',
  //   address: '0x822c3f852A395975D10dEBB8886518621b508954',
  //   decimals: 18,
  //   image: '/assets/tokens/bored.png',
  // },
  // '0x8F5e92accBcacd7585926E00C88b7F596F2A8Dfd': {
  //   name: 'higher',
  //   symbol: 'HIGHER',
  //   address: '0x8F5e92accBcacd7585926E00C88b7F596F2A8Dfd',
  //   decimals: 18,
  //   image: '/assets/tokens/higher.png',
  // },
  // '0x2EEE4f5631f0863114601aAFF0706940AECb791c': {
  //   name: 'PURR',
  //   symbol: 'PURRCOIN',
  //   address: '0x2EEE4f5631f0863114601aAFF0706940AECb791c',
  //   decimals: 18,
  //   image: '/assets/tokens/purrcoin.png',
  // },
  // '0xa5781A046B10B38355AaDA3039951356fEE26A5c': {
  //   name: 'mfercoin',
  //   symbol: 'MFER',
  //   address: '0xa5781A046B10B38355AaDA3039951356fEE26A5c',
  //   decimals: 18,
  //   image: '/assets/tokens/mfer.png',
  // },
  // '0x46D1639976a19443D36203853bFC156fC05eaF03': {
  //   name: 'member',
  //   symbol: 'MEMBER',
  //   address: '0x46D1639976a19443D36203853bFC156fC05eaF03',
  //   decimals: 18,
  //   image: '/assets/tokens/member.png',
  // },
  // '0x1548CA622cd77e07d1B05F667E814D6320eA6FAF': {
  //   name: 'Penjamin Blinkerton',
  //   symbol: 'PEN',
  //   address: '0x1548CA622cd77e07d1B05F667E814D6320eA6FAF',
  //   decimals: 18,
  //   image: '/assets/tokens/pen.png',
  // },
  // '0x9dFb118ba733785216726A35EBeDD5c181bea03A': {
  //   name: 'wrappedRAWR',
  //   symbol: 'wRAWR',
  //   address: '0x9dFb118ba733785216726A35EBeDD5c181bea03A',
  //   decimals: 18,
  //   image: '/assets/tokens/wrawr.png',
  // },
  // '0x397B539003888e05e7Bf291cef5FfD69424E1b6C': {
  //   name: 'Base God',
  //   symbol: 'TYBG',
  //   address: '0x397B539003888e05e7Bf291cef5FfD69424E1b6C',
  //   decimals: 18,
  //   image: '/assets/tokens/tybg.png',
  // },
  // '0x3b301bBca166f9523bBADf0F55dc733cb69C8b52': {
  //   name: 'Shaka',
  //   symbol: 'SHAKA',
  //   address: '0x3b301bBca166f9523bBADf0F55dc733cb69C8b52',
  //   decimals: 18,
  //   image: '/assets/tokens/shaka.png',
  // },
  // '0x39874feF8dAca2a4fb8eE4abC44DA31AD8167853': {
  //   name: 'Virtual Protocol',
  //   symbol: 'VIRTUAL',
  //   address: '0x39874feF8dAca2a4fb8eE4abC44DA31AD8167853',
  //   decimals: 18,
  //   image: '/assets/tokens/virtual.png',
  // },
  // '0x437EBFaa970345b7FbCb4C9aC278902856610c9B': {
  //   name: 'Gloom',
  //   symbol: 'GLOOM',
  //   address: '0x437EBFaa970345b7FbCb4C9aC278902856610c9B',
  //   decimals: 18,
  //   image: '/assets/tokens/gloom.png',
  // },
  // '0x72CB15d01D1219678Cc7B1f3B545459A66D74Ac3': {
  //   name: 'BLACK ROCK',
  //   symbol: 'ROCK',
  //   address: '0x72CB15d01D1219678Cc7B1f3B545459A66D74Ac3',
  //   decimals: 18,
  //   image: '/assets/tokens/rock.png',
  // },
  // '0x8EEd334826BaBA2bf0FCB03e97D5e6b39b41d230': {
  //   name: 'PILL',
  //   symbol: 'PILL',
  //   address: '0x8EEd334826BaBA2bf0FCB03e97D5e6b39b41d230',
  //   decimals: 18,
  //   image: '/assets/tokens/pill.png',
  // },
  // '0xBfe9C207508CCcEAc8bD60D0A01Eada13B55bE79': {
  //   name: 'dude',
  //   symbol: 'DUDE',
  //   address: '0xBfe9C207508CCcEAc8bD60D0A01Eada13B55bE79',
  //   decimals: 18,
  //   image: '/assets/tokens/dude.png',
  // },
  // '0x9922B08815Bf00B72060A8596335fd80Bc915515': {
  //   name: 'doginme',
  //   symbol: 'DOGINME',
  //   address: '0x9922B08815Bf00B72060A8596335fd80Bc915515',
  //   decimals: 18,
  //   image: '/assets/tokens/doginme.png',
  // },
  // '0xD6b018D25e16381B52049e04875a290B9Ec42dEB': {
  //   name: 'SPX6900',
  //   symbol: 'SPX',
  //   address: '0xD6b018D25e16381B52049e04875a290B9Ec42dEB',
  //   decimals: 18,
  //   image: '/assets/tokens/spx.png',
  // },
  // '0x334B2b98087d555598AFBe3C3823D3981C0DD156': {
  //   name: 'Japan',
  //   symbol: 'JAPAN',
  //   address: '0x334B2b98087d555598AFBe3C3823D3981C0DD156',
  //   decimals: 18,
  //   image: '/assets/tokens/japan.png',
  // },
  // '0x059Be3ad5F7dCa3CF41e376a3d367fe9ae58C8dB': {
  //   name: 'nomad',
  //   symbol: 'NOM',
  //   address: '0x059Be3ad5F7dCa3CF41e376a3d367fe9ae58C8dB',
  //   decimals: 18,
  //   image: '/assets/tokens/nom.png',
  // },
  // '0x7210D62c1893433C144e69CB94730Ad1aA93ddbb': {
  //   name: 'Noggles',
  //   symbol: 'NOGS',
  //   address: '0x7210D62c1893433C144e69CB94730Ad1aA93ddbb',
  //   decimals: 18,
  //   image: '/assets/tokens/nogs.png',
  // },
  // '0x8221ccad6E9327B5F0978e42df0c5A2f8f7fAAc0': {
  //   name: 'L2VE',
  //   symbol: 'L2VE',
  //   address: '0x8221ccad6E9327B5F0978e42df0c5A2f8f7fAAc0',
  //   decimals: 18,
  //   image: '/assets/tokens/l2ve.png',
  // },
  // '0xd11512c866Eb8BA500966e5bd5623C5dC3fb0C3f': {
  //   name: 'Toshi',
  //   symbol: 'TOSHI',
  //   address: '0xd11512c866Eb8BA500966e5bd5623C5dC3fb0C3f',
  //   decimals: 18,
  //   image: '/assets/tokens/toshi.png',
  // },
  // '0xbf816855d2420BE98D19c429d35f3DCb63397466': {
  //   name: 'Mochi',
  //   symbol: 'MOCHI',
  //   address: '0xbf816855d2420BE98D19c429d35f3DCb63397466',
  //   decimals: 18,
  //   image: '/assets/tokens/mochi.png',
  // },
  // '0xF20e5B2d748572F73BB5e143b312188DFa95952c': {
  //   name: 'duh',
  //   symbol: 'DUH',
  //   address: '0xF20e5B2d748572F73BB5e143b312188DFa95952c',
  //   decimals: 18,
  //   image: '/assets/tokens/duh.png',
  // },
  // '0xC8ee20E5dfB6Ab465324B07cda356ba62EEDeaB2': {
  //   name: 'lower',
  //   symbol: 'LOWER',
  //   address: '0xC8ee20E5dfB6Ab465324B07cda356ba62EEDeaB2',
  //   decimals: 18,
  //   image: '/assets/tokens/lower.png',
  // },
  // '0xb313B6B101E0DE4139D07C4Fd690A89fb9e2E789': {
  //   name: 'The Doge NFT',
  //   symbol: 'DOG',
  //   address: '0xb313B6B101E0DE4139D07C4Fd690A89fb9e2E789',
  //   decimals: 18,
  //   image: '/assets/tokens/dog.png',
  // },
  // '0x5440ABD35ED274b1783AA66ecB70fa5dC041F275': {
  //   name: 'Pizza',
  //   symbol: 'PIZZA',
  //   address: '0x5440ABD35ED274b1783AA66ecB70fa5dC041F275',
  //   decimals: 18,
  //   image: '/assets/tokens/pizza.png',
  // },
  // '0xB209C83d18c5AB079331b5d1708723F2Bc0C0fA6': {
  //   name: 'Sendit',
  //   symbol: 'SENDIT',
  //   address: '0xB209C83d18c5AB079331b5d1708723F2Bc0C0fA6',
  //   decimals: 18,
  //   image: '/assets/tokens/sendit.png',
  // },
  // '0xe374BD638d5f1529DAB101ac6198C5A517D873B8': {
  //   name: 'BMX',
  //   symbol: 'BMX',
  //   address: '0xe374BD638d5f1529DAB101ac6198C5A517D873B8',
  //   decimals: 18,
  //   image: '/assets/tokens/bmx.png',
  // },
  // '0xa155274497e8fd5a22C77B687D73810F0531e9Da': {
  //   name: 'PHAM',
  //   symbol: 'pHAM',
  //   address: '0xa155274497e8fd5a22C77B687D73810F0531e9Da',
  //   decimals: 18,
  //   image: '/assets/tokens/bleu.png',
  // },
  // '0x83F4507Fd5DE223D3DcC0aAA274f4FCF28a06Dc1': {
  //   name: 'BLEU',
  //   symbol: 'BLEU',
  //   address: '0x83F4507Fd5DE223D3DcC0aAA274f4FCF28a06Dc1',
  //   decimals: 18,
  //   image: '/assets/tokens/bleu.png',
  // },
  // '0xBD16e51B1513107989AE357A561dBE545b2e1b1A': {
  //   name: 'AM',
  //   symbol: 'AM',
  //   address: '0xBD16e51B1513107989AE357A561dBE545b2e1b1A',
  //   decimals: 18,
  //   image: '/assets/tokens/am.png',
  // },
};

const BSC_TESTNET_TOKENS = {
  "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd": {
    name: "Wrapped BNB",
    symbol: "WBNB",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png"
  }
};

const COINGECKO_NETWORK_IDS = {
  [chains.mainnet.id]: "ethereum",
  [chains.optimism.id]: "optimistic-ethereum",
  [chains.arbitrum.id]: "arbitrum-one",
  [chains.avalanche.id]: "avalanche",
  [chains.base.id]: "base",
  [chains.polygon.id]: "polygon-pos",
  [chains.bsc.id]: "binance-smart-chain",
  [chains.sepolia.id]: "ethereum",
  // sepolia not supported by coingecko API
  [chains.blast.id]: "ethereum",
  // blast not supported by coingecko API
  [chains.blastSepolia.id]: "ethereum",
  // blast sepolia not supported by coingecko API
  [chains.avalancheFuji.id]: "ethereum"
  // avalanche-fuji not supported by coingecko API
};
const WRAPPED_NATIVE_TOKENS = {
  [chains.mainnet.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.optimism.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0x4200000000000000000000000000000000000006",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.optimismSepolia.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0x4200000000000000000000000000000000000006",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.arbitrum.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.avalanche.id]: {
    image: "https://bitagent.io/assets/tokens/avalanche.png",
    tokenAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    nativeSymbol: "AVAX",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.polygon.id]: {
    image: "https://bitagent.io/assets/tokens/matic.png",
    tokenAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    nativeSymbol: "MATIC",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.bsc.id]: {
    image: "https://bitagent.io/assets/tokens/bnb.png",
    tokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    nativeSymbol: "BNB",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.bscTestnet.id]: {
    image: "https://bitagent.io/assets/tokens/bnb.png",
    tokenAddress: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    nativeSymbol: "BNB",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.base.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0x4200000000000000000000000000000000000006",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDbC",
    decimals: 18
  },
  [chains.sepolia.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.baseSepolia.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0x4200000000000000000000000000000000000006",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.blast.id]: {
    image: "https://bitagent.io/assets/tokens/blast.png",
    tokenAddress: "0x4300000000000000000000000000000000000004",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDB",
    decimals: 18
  },
  [chains.blastSepolia.id]: {
    image: "https://bitagent.io/assets/tokens/blast.png",
    tokenAddress: "0x4200000000000000000000000000000000000023",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDB",
    decimals: 18
  },
  [chains.avalancheFuji.id]: {
    image: "https://bitagent.io/assets/tokens/avalanche.png",
    tokenAddress: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
    nativeSymbol: "AVAX",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.degen.id]: {
    image: "https://bitagent.io/assets/tokens/degen.png",
    tokenAddress: "0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387",
    nativeSymbol: "DEGEN",
    oneInchSymbol: "USDC",
    decimals: 18
  },
  [chains.cyber.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0x4200000000000000000000000000000000000006",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDT",
    decimals: 18
  },
  [chains.cyberTestnet.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0xf760686C2b40F7C526D040b979641293D2F55816",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDC",
    decimals: 18
  },
  [chains.kaia.id]: {
    image: "https://bitagent.io/assets/tokens/kaia.png",
    tokenAddress: "0x608792Deb376CCE1c9FA4D0E6B7b44f507CfFa6A",
    nativeSymbol: "KLAY",
    oneInchSymbol: "USDC",
    decimals: 6
  },
  [chains.ham.id]: {
    image: "https://bitagent.io/assets/tokens/eth.png",
    tokenAddress: "0x4200000000000000000000000000000000000006",
    nativeSymbol: "ETH",
    oneInchSymbol: "USDC",
    decimals: 18
  }
};
const TOKENS = {
  // export const TOKENS = {
  [chains.mainnet.id]: MAINNET_TOKENS,
  [chains.optimism.id]: OPTIMISM_TOKENS,
  [chains.optimismSepolia.id]: OPTIMISM_TOKENS,
  [chains.arbitrum.id]: ARBITRUM_TOKENS,
  [chains.avalanche.id]: AVALANCHE_TOKENS,
  [chains.polygon.id]: POLYGON_TOKENS,
  [chains.bsc.id]: BSC_TOKENS,
  [chains.bscTestnet.id]: BSC_TESTNET_TOKENS,
  [chains.base.id]: BASE_TOKENS,
  [chains.blast.id]: BLAST_TOKENS,
  [chains.blastSepolia.id]: BLAST_SEPOLIA_TOKENS,
  [chains.sepolia.id]: SEPOLIA_TOKENS,
  [chains.baseSepolia.id]: BASE_SEPOLIA_TOKENS,
  [chains.avalancheFuji.id]: AVALANCHE_FUJI_TOKENS,
  [chains.degen.id]: DEGEN_TOKENS,
  [chains.cyber.id]: CYBER_TOKENS,
  [chains.cyberTestnet.id]: CYBER_TESTNET_TOKENS,
  [chains.kaia.id]: KAIA_TOKENS,
  [chains.ham.id]: HAM_TOKENS
};

const MCV2_WALLET_STATE_LOCALSTORAGE = "mcv2_wallet_state";
class Client {
  static instance;
  walletClient;
  // these are always defined, singleton
  publicClients = {};
  constructor() {
    if (Client.instance) {
      return Client.instance;
    }
    Client.instance = this;
  }
  getDefaultProvider() {
    if (typeof window.ethereum === "undefined") throw new NoEthereumProviderError();
    return window?.ethereum;
  }
  isPrivateKey() {
    return this.walletClient?.account?.source === "privateKey";
  }
  async connect(provider) {
    let addressToReturn = null;
    if (this.walletClient?.account || this.isPrivateKey()) {
      if (this.walletClient?.account?.address) {
        addressToReturn = this.walletClient?.account?.address;
      }
    }
    if (this.walletClient) {
      const [address] = await this.walletClient?.requestAddresses();
      this.walletClient = viem.createWalletClient({
        account: address,
        transport: viem.custom(provider ?? this.walletClient.transport)
      });
      addressToReturn = address;
    } else {
      this.walletClient = viem.createWalletClient({
        transport: viem.custom(provider ?? this.getDefaultProvider())
      });
      const [address] = await this.walletClient?.requestAddresses();
      this.walletClient = viem.createWalletClient({
        account: address,
        transport: viem.custom(provider ?? this.getDefaultProvider())
      });
      addressToReturn = address;
    }
    if (addressToReturn) this.walletState = "connected";
    return addressToReturn;
  }
  get walletState() {
    if (typeof window === "undefined") {
      return "none";
    }
    return window?.localStorage?.getItem?.(MCV2_WALLET_STATE_LOCALSTORAGE) ?? "none";
  }
  set walletState(newState) {
    window?.localStorage?.setItem?.(MCV2_WALLET_STATE_LOCALSTORAGE, newState);
  }
  async change() {
    await this.walletClient?.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
  }
  disconnect() {
    this.walletClient = void 0;
    this.walletState = "disconnected";
  }
  async account() {
    if (this.walletState === "disconnected") return null;
    if (!this.walletClient && window?.ethereum !== void 0) {
      this.walletClient = viem.createWalletClient({
        transport: viem.custom(window.ethereum)
      });
    }
    const accounts = await this.walletClient?.getAddresses();
    return accounts?.[0] || null;
  }
  async getNativeBalance(params) {
    const { walletAddress, chainId } = params || {};
    if (chainId !== void 0 && walletAddress)
      return this._getPublicClient(chainId).getBalance({ address: walletAddress });
    await this.connect();
    const address = await this.account();
    const connectedChain = this.walletClient?.chain?.id;
    if (!address || connectedChain === void 0) throw new WalletNotConnectedError();
    return this._getPublicClient(connectedChain).getBalance({
      address
    });
  }
  _getPublicClient(id) {
    if (this.publicClients[id] !== void 0) return this.publicClients[id];
    const chain = Object.values(chains__namespace).find((chain2) => chain2.id === id) ?? chainIdToViemChain(id);
    if (!chain) throw new ChainNotSupportedError(id);
    this.publicClients[chain.id] = viem.createPublicClient({
      chain,
      transport: viem.fallback(chainRPCFallbacks(chain), DEFAULT_RANK_OPTIONS)
    });
    this.publicClients[chain.id].transport.onResponse((response) => {
      if (!response.response && response.status === "success") {
        throw new Error("Empty RPC Response");
      }
    });
    return this.publicClients[chain.id];
  }
  getWalletClient() {
    return this.walletClient;
  }
  withPublicClient(publicClient) {
    if (publicClient.chain?.id === void 0) throw new ChainNotSupportedError(publicClient.chain);
    this.publicClients[publicClient.chain.id] = publicClient;
    return this;
  }
  withWalletClient(walletClient) {
    this.walletClient = walletClient;
    return this;
  }
  withPrivateKey(privateKey) {
    const account = accounts.privateKeyToAccount(privateKey);
    this.walletClient = viem.createWalletClient({
      transport: viem.fallback(chainRPCFallbacks(chains__namespace.mainnet), DEFAULT_RANK_OPTIONS),
      account
    });
    return this;
  }
  withAccount(account, provider) {
    const providerToUse = provider || this.getDefaultProvider();
    this.walletClient = viem.createWalletClient({
      account,
      transport: viem.custom(providerToUse)
    });
    return this;
  }
  async withProvider(provider) {
    this.walletClient = viem.createWalletClient({
      transport: viem.custom(provider)
    });
    return this;
  }
}

class GenericContractLogic {
  abi;
  contractType;
  chainId;
  clientHelper;
  chain;
  version;
  constructor(params) {
    const { chainId, type, abi, version } = params;
    this.contractType = type;
    this.abi = abi;
    this.chainId = chainId;
    this.chain = getChain(chainId);
    this.clientHelper = new Client();
    this.version = version;
  }
  read(params) {
    const { functionName } = params;
    const args = "args" in params ? params.args : void 0;
    let address;
    if ("tokenAddress" in params) {
      address = params.tokenAddress;
    } else {
      address = getBitAgentContractAddress(this.contractType, this.chainId, this.version);
    }
    const publicClient = this.clientHelper._getPublicClient(this.chainId);
    return publicClient.readContract({
      abi: this.abi,
      address,
      functionName,
      args
    });
  }
  async write(params) {
    const { functionName, value, debug, onError, onSignatureRequest, onSigned, onSuccess } = params;
    let args, simulationArgs;
    args = "args" in params ? params.args : void 0;
    let address;
    if ("tokenAddress" in params) {
      address = params.tokenAddress;
    } else {
      address = getBitAgentContractAddress(this.contractType, this.chainId, this.version);
    }
    try {
      const walletClient = this.clientHelper.getWalletClient();
      const isPrivateKey = this.clientHelper.isPrivateKey();
      if (isPrivateKey && !walletClient?.account) {
        throw new WalletNotConnectedError();
      } else if (!walletClient || !walletClient.account) {
        await this.clientHelper.connect();
        return;
      } else if (!isPrivateKey) {
      }
      simulationArgs = {
        chain: this.chain,
        account: walletClient.account,
        abi: this.abi,
        address,
        functionName,
        args,
        ...value !== void 0 && { value }
      };
      debug?.(simulationArgs);
      let tx;
      if (isPrivateKey) {
        const client = viem.createWalletClient({
          chain: this.chain,
          account: walletClient.account,
          transport: viem.fallback(chainRPCFallbacks(this.chain), DEFAULT_RANK_OPTIONS)
        }).extend(viem.publicActions);
        const { request } = await client.simulateContract(simulationArgs);
        onSignatureRequest?.();
        tx = await client.writeContract(request);
      } else {
        const { request } = await this.clientHelper._getPublicClient(this.chainId).simulateContract(simulationArgs);
        onSignatureRequest?.();
        tx = await walletClient.writeContract(request);
      }
      onSigned?.(tx);
      const receipt = await this.clientHelper._getPublicClient(this.chainId).waitForTransactionReceipt({
        hash: tx
      });
      onSuccess?.(receipt);
      return receipt;
    } catch (e) {
      if (e) {
        Object.assign(e, { functionName, args, simulationArgs, value });
      }
      onError?.(e);
      return;
    }
  }
}

class GenericContract {
  contractType;
  abi;
  constructor(type) {
    this.contractType = type;
    if (type === "BOND") {
      this.abi = BOND_ABI;
    } else if (type === "ERC20") {
      this.abi = ERC20_ABI;
    } else if (type === "ERC1155") {
      this.abi = ERC1155_ABI;
    } else if (type === "LOCKER") {
      this.abi = LOCKER_ABI;
    } else if (type === "MERKLE") {
      this.abi = MERKLE_ABI;
    } else if (type === "ZAP") {
      this.abi = ZAP_ABI;
    } else if (type === "ONEINCH") {
      this.abi = ONEINCH_ABI;
    } else {
      throw new Error(`Contract type ${type} not supported`);
    }
  }
  network(id, version) {
    let chainId;
    if (typeof id === "string") {
      chainId = chainStringToId(id);
    } else {
      chainId = id;
    }
    return new GenericContractLogic({
      chainId,
      type: this.contractType,
      abi: this.abi,
      version
    });
  }
}

const bondContract = new GenericContract("BOND");
const erc20Contract = new GenericContract("ERC20");
const erc1155Contract = new GenericContract("ERC1155");
const zapContract = new GenericContract("ZAP");
const airdropContract = new GenericContract("MERKLE");
const lockupContract = new GenericContract("LOCKER");
const oneInchContract = new GenericContract("ONEINCH");

class Bond {
  chainId;
  version;
  constructor(chainId, version) {
    this.chainId = chainId;
    this.version = version;
  }
  getCreationFee() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "creationFee"
    });
  }
  getTokensByReserveToken(params) {
    const { reserveToken, start = 0, end = 1e3 } = params;
    return bondContract.network(this.chainId, this.version).read({
      functionName: "getTokensByReserveToken",
      args: [reserveToken, BigInt(start), BigInt(end)]
    });
  }
  getTokensByCreator(params) {
    const { creator, start = 0, end = 1e3 } = params;
    return bondContract.network(this.chainId, this.version).read({
      functionName: "getTokensByCreator",
      args: [creator, BigInt(start), BigInt(end)]
    });
  }
}

function computeCreate2Address(chainId, tokenType, tokenSymbol, version) {
  const bondAddress = getBitAgentContractAddress("BOND", chainId, version);
  const tokenImplementation = getBitAgentContractAddress(
    tokenType === "ERC20" ? "ERC20" : "ERC1155",
    chainId,
    version
  );
  const hexedSymbol = viem.stringToHex(tokenSymbol);
  const packed = `0x${[bondAddress, hexedSymbol].map((x) => x?.replace("0x", "")).join("").toLowerCase()}`;
  const salt = viem.keccak256(packed);
  const creationCode = [
    "0x3d602d80600a3d3981f3363d3d373d3d3d363d73",
    tokenImplementation?.replace(/0x/, "").toLowerCase(),
    "5af43d82803e903d91602b57fd5bf3"
  ].join("");
  const params = `0x${["ff", bondAddress, salt, viem.keccak256(creationCode)].map((x) => x?.replace(/0x/, "")).join("")}`;
  const hexed = viem.hexToBytes(params);
  const hash = viem.keccak256(hexed);
  const address = viem.getAddress(`0x${hash.slice(-40)}`);
  return address;
}
function createRandomAddress() {
  const randBytes = crypto.randomBytes(20);
  return viem.bytesToHex(randBytes);
}

const { uniqBy } = lodash;
var CurveEnum = /* @__PURE__ */ ((CurveEnum2) => {
  CurveEnum2["FLAT"] = "FLAT";
  CurveEnum2["LINEAR"] = "LINEAR";
  CurveEnum2["EXPONENTIAL"] = "EXPONENTIAL";
  CurveEnum2["LOGARITHMIC"] = "LOGARITHMIC";
  return CurveEnum2;
})(CurveEnum || {});
const graphTypes = ["FLAT" /* FLAT */, "LINEAR" /* LINEAR */, "EXPONENTIAL" /* EXPONENTIAL */, "LOGARITHMIC" /* LOGARITHMIC */];
function formatGraphPoint(value, maxDecimalPoints) {
  const maxWeiDecimals = 18;
  let formattedValue;
  if (maxDecimalPoints !== void 0 && maxWeiDecimals > maxDecimalPoints) {
    formattedValue = Number(value?.toFixed(maxDecimalPoints));
  } else {
    formattedValue = Number(value?.toFixed(maxWeiDecimals));
  }
  if (value !== 0 && formattedValue === 0) return value;
  return formattedValue;
}
function generateSteps(form) {
  const {
    tokenType,
    reserveToken,
    curveData: {
      curveType,
      stepCount: _stepCount,
      maxSupply,
      creatorAllocation = 0,
      initialMintingPrice,
      finalMintingPrice
    }
  } = form;
  const maxPrice = finalMintingPrice;
  const startingPrice = initialMintingPrice;
  const stepPoints = [];
  let stepCount = curveType === "FLAT" /* FLAT */ ? 1 : _stepCount;
  let extraStepCount = 0;
  if (startingPrice === 0) {
    extraStepCount = 1;
  }
  if (tokenType === "ERC1155" && stepCount > maxSupply) {
    stepCount = Math.max(maxSupply, 2);
    extraStepCount = 1;
  }
  const deltaX = (maxSupply - creatorAllocation) / (stepCount + extraStepCount);
  const totalX = maxSupply - creatorAllocation - deltaX;
  const totalY = maxPrice - startingPrice;
  const exponent = 0.5;
  const coefficientPower = totalY / Math.pow(totalX, exponent);
  const percentageIncrease = Math.pow(maxPrice / startingPrice, 1 / (stepCount - 1));
  for (let i = extraStepCount; i <= stepCount + extraStepCount; i++) {
    let x = i * deltaX + creatorAllocation;
    if (tokenType === "ERC1155") x = Math.ceil(x);
    let y;
    switch (curveType) {
      case "FLAT" /* FLAT */:
        y = startingPrice;
        break;
      case "LINEAR" /* LINEAR */:
        const stepPerPrice = totalY / totalX;
        y = stepPerPrice * (x - extraStepCount - creatorAllocation) + startingPrice;
        break;
      case "EXPONENTIAL" /* EXPONENTIAL */:
        if (i === 0) {
          y = startingPrice;
        } else {
          const prevY = stepPoints[i - 1].y;
          y = prevY * percentageIncrease;
        }
        break;
      case "LOGARITHMIC" /* LOGARITHMIC */:
        if (x - creatorAllocation === 0) y = startingPrice;
        else {
          y = startingPrice + coefficientPower * Math.pow(x - extraStepCount - creatorAllocation, exponent);
        }
        break;
      default:
        y = 0;
    }
    if (tokenType === "ERC1155") {
      x = Number(x.toFixed(0));
    } else {
      x = formatGraphPoint(x, 18);
    }
    y = Math.max(Math.min(y, maxPrice), initialMintingPrice);
    y = formatGraphPoint(y, reserveToken.decimals);
    if (i === stepCount && curveType !== "FLAT" /* FLAT */) {
      stepPoints.push({ x, y: maxPrice });
    } else {
      stepPoints.push({ x, y: Math.min(y ?? 0, maxPrice) });
    }
  }
  if (startingPrice === 0) {
    return generateSteps({
      ...form,
      curveData: {
        ...form.curveData,
        initialMintingPrice: stepPoints[0].y
      }
    });
  }
  let mergeCount = 0;
  let clonedPoints = structuredClone(stepPoints);
  for (let i = 0; i < clonedPoints.length - 2; i++) {
    if (clonedPoints[i].x === clonedPoints[i + 1].x) {
      clonedPoints.splice(i, 1);
      mergeCount++;
      i--;
    }
  }
  const finalData = uniqBy(clonedPoints, (point) => `${point.x}-${point.y}`).map((point) => {
    return { rangeTo: point.x, price: point.y };
  });
  return { stepData: finalData, mergeCount };
}
function calculateArea(steps, partialIndex) {
  const clonedSteps = structuredClone(steps);
  clonedSteps.sort((a, b) => a.x - b.x);
  let intervalArea = 0;
  let totalArea = 0;
  let lastIndex = clonedSteps.length - 1;
  if (partialIndex !== void 0) {
    lastIndex = Math.min(lastIndex, partialIndex);
  }
  for (let i = 1; i <= lastIndex; i++) {
    const height = clonedSteps[i - 1].y;
    const width = clonedSteps[i].x - clonedSteps[i - 1].x;
    if (width > 0 && height > 0) {
      const plotArea = width * height;
      totalArea += plotArea;
      if (partialIndex === i) {
        intervalArea = plotArea;
      }
    }
  }
  return { intervalArea, totalArea };
}
function generateTableData(steps) {
  const clonedSteps = structuredClone(steps);
  clonedSteps.sort((a, b) => a.x - b.x);
  let data = [];
  let totalTVL = 0;
  for (let i = 1; i < clonedSteps.length; i++) {
    const height = clonedSteps[i - 1].y;
    const width = clonedSteps[i].x - clonedSteps[i - 1].x;
    const obj = {};
    obj.start = clonedSteps[i - 1].x;
    obj.end = clonedSteps[i].x;
    obj.price = clonedSteps[i - 1].y;
    if (width > 0 && height > 0) {
      const tvl = width * height;
      obj.tvl = tvl;
      totalTVL += tvl;
    }
    data.push(obj);
  }
  return { data, totalTVL };
}

const { cloneDeep } = lodash;
function generateCreateArgs(params) {
  const {
    tokenType,
    name,
    symbol,
    agentHash,
    curveData,
    reserveToken,
    buyRoyalty = 0.03,
    sellRoyalty = 0.03,
    stepData: _stepData
  } = params;
  if (curveData === void 0 && _stepData === void 0) {
    throw new CreationError("Either curveData or stepData is required for creation");
  }
  const stepRanges = [];
  const stepPrices = [];
  let stepData = [];
  const { creatorAllocation = 0, maxSupply = 0 } = curveData || {};
  if (curveData) {
    const { stepData: generatedSteps } = generateSteps({
      ...params,
      curveData
    });
    if (creatorAllocation > maxSupply) {
      throw new CreationError("Generating argument for creation failed", {
        metaMessages: ["Creator allocation cannot be greater than max supply"]
      });
    }
    stepData = generatedSteps;
    const cloned = cloneDeep(generatedSteps);
    for (let i = cloned.length - 1; i > 0; i--) {
      cloned[i].price = cloned[i - 1].price;
    }
    cloned.shift();
    stepData = cloned;
    if (creatorAllocation > 0) {
      stepRanges.unshift(wei$1(creatorAllocation, tokenType === "ERC20" ? 18 : 0));
      stepPrices.unshift(0n);
    }
    if (tokenType === "ERC1155" && maxSupply === 1) {
      stepData = [{ rangeTo: 1, price: curveData.finalMintingPrice }];
    } else if (stepData[0].price !== curveData.initialMintingPrice) {
      throw new CreationError(`Generated step data's initial price does not match your desired value.`, {
        metaMessages: ["Please try a different step count", JSON.stringify(stepData)]
      });
    } else if (stepData[stepData.length - 1].price !== curveData.finalMintingPrice) {
      throw new CreationError(`Generated step data's final price does not match your desired value.`, {
        metaMessages: ["Please try a different step count", JSON.stringify(stepData)]
      });
    }
  } else {
    stepData = _stepData;
  }
  stepData.forEach(({ rangeTo, price }) => {
    if (isNaN(rangeTo) || isNaN(price) || rangeTo < 0 || price < 0) {
      throw new CreationError("Invalid arguments passed for creation", {
        metaMessages: ["Please double check the step data"]
      });
    }
    stepRanges.push(wei$1(rangeTo, tokenType === "ERC20" ? 18 : 0));
    stepPrices.push(wei$1(price, reserveToken.decimals));
  });
  for (let i = 0; i < stepPrices.length; i++) {
    if (stepPrices[i] === stepPrices[i + 1]) {
      stepRanges.splice(i, 1);
      stepPrices.splice(i, 1);
      i--;
    }
  }
  if (tokenType === "ERC1155") {
    for (let i = 0; i < stepRanges.length; i++) {
      if (stepRanges[i] === stepRanges[i + 1]) {
        stepRanges.splice(i, 1);
        stepPrices.splice(i, 1);
        i--;
      }
    }
  }
  if (stepRanges.length === 0 || stepPrices.length === 0 || stepRanges.length !== stepPrices.length) {
    throw new CreationError("Invalid step data. Please double check the step data");
  } else if (stepData === void 0 && creatorAllocation === 0 && stepPrices.some((price) => price === 0n)) {
    throw new CreationError(
      "Your parameters may be too extreme to generate a valid curve. Please change parameters, such as stepCount."
    );
  } else if (creatorAllocation > 0) {
    const weiAllocation = wei$1(creatorAllocation, tokenType === "ERC20" ? 18 : 0);
    if (stepRanges[0] !== weiAllocation) {
      throw new CreationError("Creator allocation does not match the first step range. Try different parameters");
    }
  }
  const tokenParams = {
    name,
    symbol,
    agentHash
  };
  const bondParams = {
    mintRoyalty: buyRoyalty * 100,
    burnRoyalty: sellRoyalty * 100,
    reserveToken: reserveToken.address,
    maxSupply: stepRanges[stepRanges.length - 1],
    stepRanges,
    stepPrices
  };
  return { tokenParams, bondParams };
}

class ApiError {
  status;
  message;
  constructor({ status, message }) {
    this.status = status;
    this.message = message || "An unexpected error occurred";
  }
}
const baseFetcher = ky.extend({
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const data = await response.json();
        const { ok, status } = response;
        if (ok) {
          return data;
        }
        const { message = "An error occurred while fetching the data." } = data;
        throw new ApiError({ status, message });
      }
    ]
  }
});
const api = baseFetcher.extend({
  prefixUrl: "https://bitagent.io/api",
  timeout: 6e4
  // 1 min timeout
});

const EMPTY_ROOT = "0x0000000000000000000000000000000000000000000000000000000000000000";
class Airdrop {
  chainId;
  version;
  constructor(chainId, version) {
    this.chainId = chainId;
    this.version = version;
  }
  getTotalAirdropCount() {
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "distributionCount"
    });
  }
  async getAirdropById(airdropId) {
    const [
      token,
      isERC20,
      walletCount,
      claimCount,
      amountPerClaim,
      startTime,
      endTime,
      owner,
      refundedAt,
      merkleRoot,
      title,
      ipfsCID
    ] = await airdropContract.network(this.chainId, this.version).read({
      functionName: "distributions",
      args: [BigInt(airdropId)]
    });
    return {
      token,
      isERC20,
      walletCount,
      claimCount,
      amountPerClaim,
      startTime,
      endTime,
      owner,
      refundedAt,
      merkleRoot,
      title,
      ipfsCID
    };
  }
  getAmountClaimed(airdropId) {
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "getAmountClaimed",
      args: [BigInt(airdropId)]
    });
  }
  getAmountLeft(airdropId) {
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "getAmountLeft",
      args: [BigInt(airdropId)]
    });
  }
  getAirdropIdsByOwner(params) {
    const { owner, start = 0, end = 1e3 } = params;
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "getDistributionIdsByOwner",
      args: [owner, BigInt(start), BigInt(end)]
    });
  }
  getAirdropIdsByToken(params) {
    const { token, start = 0, end = 1e3 } = params;
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "getDistributionIdsByToken",
      args: [token, BigInt(start), BigInt(end)]
    });
  }
  getIsClaimed(airdropId, account) {
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "isClaimed",
      args: [BigInt(airdropId), account]
    });
  }
  getIsWhitelistOnly(airdropId) {
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "isWhitelistOnly",
      args: [BigInt(airdropId)]
    });
  }
  async getMerkleProof(airdropId) {
    const { ipfsCID } = await this.getAirdropById(airdropId);
    const merkleProof = await api.get(`ipfs/whitelist?cid=${ipfsCID}`).json().catch(() => {
      return baseFetcher.get(`https://ipfs.io/ipfs/${ipfsCID}`).json();
    });
    return merkleProof;
  }
  async getIsWhitelisted(airdropId, account) {
    const { merkleRoot } = await this.getAirdropById(airdropId);
    if (merkleRoot === EMPTY_ROOT) return Promise.resolve(true);
    return airdropContract.network(this.chainId, this.version).read({
      functionName: "isWhitelisted",
      args: [BigInt(airdropId), account, await this.getMerkleProof(airdropId)]
    });
  }
  async claimAirdrop(params) {
    const { airdropId } = params;
    return airdropContract.network(this.chainId, this.version).write({
      ...params,
      functionName: "claim",
      args: [BigInt(airdropId), await this.getMerkleProof(airdropId)]
    });
  }
  createAirdrop(params) {
    const { token, isERC20, amountPerClaim, walletCount, startTime, endTime, merkleRoot, title, ipfsCID } = params;
    return airdropContract.network(this.chainId, this.version).write({
      ...params,
      functionName: "createDistribution",
      args: [token, isERC20, amountPerClaim, walletCount, startTime, endTime, merkleRoot, title, ipfsCID]
    });
  }
  cancelAirdrop(params) {
    const { airdropId } = params;
    return airdropContract.network(this.chainId, this.version).write({
      ...params,
      functionName: "refund",
      args: [BigInt(airdropId)]
    });
  }
}

class Ipfs {
  async add(apiKey, blob) {
    if (!apiKey) throw new PinataKeyNeededErrror();
    const client = new pinataWeb3.PinataSDK({ pinataJwt: apiKey, pinataGateway: "" });
    switch (blob.type) {
      case "image/png":
        const fileUploadResponse = await client.upload.file(new File([blob], Date.now().toString()));
        return fileUploadResponse.IpfsHash;
      case "application/json":
        const jsonUploadResponse = await client.upload.json(blob.json());
        return jsonUploadResponse.IpfsHash;
      default:
        return "";
    }
  }
  isIpfsUrl(url) {
    return url.toLowerCase().startsWith("ipfs://");
  }
  isHttpUrl(url) {
    return url.toLowerCase().startsWith("http://") || url.toLowerCase().startsWith("https://");
  }
  validateHttpUrl(url) {
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      throw new InvalidImageProvidedError();
    }
    const valid = urlObj.protocol === "http:" || urlObj.protocol === "https:";
    if (!valid) {
      throw new InvalidImageProvidedError();
    }
    return valid;
  }
  hashToGatewayUrl(hash, gateway = "https://ipfs.io/ipfs/") {
    if (hash.includes("ipfs://")) {
      hash = hash.replace("ipfs://", "");
    }
    return `${gateway}${hash}`;
  }
  gatewayUrlToHash(url) {
    return "ipfs://" + url.split("ipfs/").pop();
  }
  validateIpfsHash(ipfsUrl) {
    const hash = ipfsUrl.replace(/^ipfs:\/\//, "");
    const cidv0Pattern = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;
    const cidv1Pattern = /^b[1-9A-Za-z]{49,}$/;
    const matched = cidv0Pattern.test(hash) || cidv1Pattern.test(hash);
    if (!matched) {
      throw new InvalidImageProvidedError();
    }
    return matched;
  }
  async upload(params) {
    const { pinataApiKey, media } = params;
    const hash = await this.add(pinataApiKey, media);
    return `ipfs://${hash}`;
  }
  async uploadMetadata(data) {
    const { pinataApiKey, name, image, video, description, external_url, attributes } = data;
    const defaultExternalLink = `https://bitagent.io`;
    const defaultDescription = [
      `A Bonding Curved ERC-1155 token powered by bitagent.io bonding curve protocol.`,
      defaultExternalLink
    ].join("\n\n");
    const finalMetadata = {
      name,
      description: defaultDescription,
      image,
      external_url: defaultExternalLink,
      attributes: []
    };
    if (video) {
      finalMetadata.animation_url = video;
    }
    if (description) finalMetadata.description = description;
    if (external_url) finalMetadata.external_url = external_url;
    if (attributes) finalMetadata.attributes = attributes;
    const metadata = JSON.stringify(finalMetadata);
    const metadataBuffer = new Blob([metadata], { type: "application/json" });
    const jsonHash = await this.add(pinataApiKey, metadataBuffer);
    return `ipfs://${jsonHash}`;
  }
}

const STABLE_COINS = {
  [chains.mainnet.id]: {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    symbol: "USDT",
    decimals: 6n
  },
  // USDT
  [chains.optimism.id]: {
    address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    symbol: "USDT",
    decimals: 6n
  },
  // USDT
  [chains.optimismSepolia.id]: {
    address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    symbol: "USDT",
    decimals: 6n
  },
  // USDT
  [chains.arbitrum.id]: {
    address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    symbol: "USDT",
    decimals: 6n
  },
  // USDT
  [chains.avalanche.id]: {
    address: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
    symbol: "USDT",
    decimals: 6n
  },
  // USDT
  [chains.polygon.id]: {
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    symbol: "USDT",
    decimals: 6n
  },
  // USDT
  [chains.bsc.id]: {
    address: "0x55d398326f99059ff775485246999027b3197955",
    symbol: "USDT",
    decimals: 18n
  },
  // USDT
  // TODO
  [chains.bscTestnet.id]: {
    address: "0x55d398326f99059ff775485246999027b3197955",
    symbol: "USDT",
    decimals: 18n
  },
  // USDT
  [chains.base.id]: {
    address: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    symbol: "USDBC",
    decimals: 6n
  },
  // USDBC
  [chains.baseSepolia.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.sepolia.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.blast.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.blastSepolia.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.avalancheFuji.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.degen.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.cyber.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.cyberTestnet.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.kaia.id]: { address: "0x", symbol: "", decimals: 0n },
  [chains.ham.id]: { address: "0x", symbol: "", decimals: 0n }
};
class OneInch {
  chainId;
  version;
  constructor(chainId, version) {
    this.chainId = chainId;
    this.version = version;
  }
  async getUsdRate({ tokenAddress, tokenDecimals }) {
    if (!viem.isAddress(STABLE_COINS[this.chainId].address) || STABLE_COINS[this.chainId].address === "0x") {
      return null;
    }
    const isSameToken = viem.isAddress(tokenAddress) && viem.getAddress(tokenAddress) === viem.getAddress(STABLE_COINS[this.chainId].address);
    if (isSameToken) return { rate: 1, stableCoin: STABLE_COINS[this.chainId] };
    const rate = await oneInchContract.network(this.chainId, this.version).read({
      functionName: "getRate",
      args: [tokenAddress, STABLE_COINS[this.chainId].address, false]
    });
    const stableCoinDecimals = STABLE_COINS[this.chainId].decimals;
    const rateToNumber = toNumber(rate, Number(18n + stableCoinDecimals) - tokenDecimals);
    return { rate: rateToNumber, stableCoin: STABLE_COINS[this.chainId] };
  }
}

function isFalse(value) {
  return typeof value === "undefined" || value === void 0 || value === null;
}

class Token {
  tokenAddress;
  clientHelper;
  airdropHelper;
  oneinch;
  ipfsHelper;
  symbol;
  tokenType;
  chain;
  version;
  chainId;
  constructor(params) {
    const { symbolOrAddress, chainId, tokenType, version } = params;
    if (viem.isAddress(symbolOrAddress)) {
      this.tokenAddress = symbolOrAddress;
    } else {
      this.tokenAddress = computeCreate2Address(chainId, tokenType, symbolOrAddress, version);
      this.symbol = symbolOrAddress;
    }
    this.chain = getChain(chainId);
    this.chainId = chainId;
    this.version = version;
    this.tokenType = tokenType;
    this.clientHelper = new Client();
    this.ipfsHelper = new Ipfs();
    this.oneinch = new OneInch(chainId === chains.bscTestnet.id ? chains.bsc.id : chainId, version);
    this.airdropHelper = new Airdrop(this.chainId, version);
  }
  async getConnectedWalletAddress() {
    const connectedAddress = await this.clientHelper.account();
    if (!connectedAddress) throw new WalletNotConnectedError();
    return connectedAddress;
  }
  async tokenToApprove(tradeType) {
    return tradeType === "buy" ? await this.getReserveTokenAddress() : this.getTokenAddress();
  }
  async bondContractApproved(params) {
    const { tradeType, walletAddress, isZap } = params;
    const tokenToApprove = await this.tokenToApprove(tradeType);
    if (this.tokenType === "ERC1155" && tradeType === "sell") {
      return erc1155Contract.network(this.chainId, this.version).read({
        tokenAddress: this.tokenAddress,
        functionName: "isApprovedForAll",
        args: [walletAddress, getBitAgentContractAddress(isZap ? "ZAP" : "BOND", this.chainId, this.version)]
      });
    }
    let amountToSpend = viem.maxUint256;
    if ("amountToSpend" in params && params?.amountToSpend !== void 0) {
      amountToSpend = params.amountToSpend;
    }
    const allowance = await erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: tokenToApprove,
      functionName: "allowance",
      args: [walletAddress, getBitAgentContractAddress(isZap ? "ZAP" : "BOND", this.chainId, this.version)]
    });
    return allowance >= amountToSpend;
  }
  async contractIsApproved(params, contract) {
    const connectedAddress = await this.getConnectedWalletAddress();
    if (this.tokenType === "ERC1155") {
      return erc1155Contract.network(this.chainId, this.version).read({
        ...params,
        tokenAddress: this.tokenAddress,
        functionName: "isApprovedForAll",
        args: [connectedAddress, getBitAgentContractAddress(contract, this.chainId, this.version)]
      });
    } else {
      let amountToSpend = viem.maxUint256;
      if ("allowanceAmount" in params && params?.allowanceAmount !== void 0) {
        amountToSpend = params.allowanceAmount;
      }
      const allowance = await erc20Contract.network(this.chainId, this.version).read({
        ...params,
        tokenAddress: this.tokenAddress,
        functionName: "allowance",
        args: [connectedAddress, getBitAgentContractAddress(contract, this.chainId, this.version)]
      });
      return allowance >= amountToSpend;
    }
  }
  approveContract(params, contract) {
    if (this.tokenType === "ERC1155") {
      return erc1155Contract.network(this.chainId, this.version).write({
        ...params,
        tokenAddress: this.tokenAddress,
        functionName: "setApprovalForAll",
        args: [getBitAgentContractAddress(contract, this.chainId, this.version), true]
      });
    } else {
      let amountToSpend = viem.maxUint256;
      if ("allowanceAmount" in params && params?.allowanceAmount !== void 0) {
        amountToSpend = params.allowanceAmount;
      }
      return erc20Contract.network(this.chainId, this.version).write({
        ...params,
        tokenAddress: this.tokenAddress,
        functionName: "approve",
        args: [getBitAgentContractAddress(contract, this.chainId, this.version), amountToSpend]
      });
    }
  }
  async approveBond(params) {
    const { isZap, tradeType, onAllowanceSignatureRequest, onAllowanceSigned, onAllowanceSuccess } = params;
    const tokenToCheck = await this.tokenToApprove(tradeType);
    if (this.tokenType === "ERC1155" && tradeType === "sell") {
      return erc1155Contract.network(this.chainId, this.version).write({
        ...params,
        onSignatureRequest: onAllowanceSignatureRequest,
        onSigned: onAllowanceSigned,
        onSuccess: onAllowanceSuccess,
        tokenAddress: this.tokenAddress,
        functionName: "setApprovalForAll",
        args: [getBitAgentContractAddress(isZap ? "ZAP" : "BOND", this.chainId, this.version), true]
      });
    } else {
      let amountToSpend = viem.maxUint256;
      if ("allowanceAmount" in params && params?.allowanceAmount !== void 0) {
        amountToSpend = params.allowanceAmount;
      }
      return erc20Contract.network(this.chainId, this.version).write({
        ...params,
        onSignatureRequest: onAllowanceSignatureRequest,
        onSigned: onAllowanceSigned,
        onSuccess: onAllowanceSuccess,
        tokenAddress: tokenToCheck,
        functionName: "approve",
        args: [getBitAgentContractAddress(isZap ? "ZAP" : "BOND", this.chainId, this.version), amountToSpend]
      });
    }
  }
  getCreationFee() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "creationFee"
    });
  }
  async zapAvailable() {
    const { reserveToken } = await this.getTokenBond();
    const reserveIsWrapped = WRAPPED_NATIVE_TOKENS[this.chainId].tokenAddress === reserveToken;
    return reserveIsWrapped;
  }
  exists() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "exists",
      args: [this.tokenAddress]
    });
  }
  async getReserveToken() {
    const { reserveToken } = await this.getTokenBond();
    const [name, symbol, decimals] = await Promise.all([
      erc20Contract.network(this.chainId, this.version).read({ tokenAddress: reserveToken, functionName: "name" }),
      erc20Contract.network(this.chainId, this.version).read({ tokenAddress: reserveToken, functionName: "symbol" }),
      erc20Contract.network(this.chainId, this.version).read({ tokenAddress: reserveToken, functionName: "decimals" })
    ]);
    return {
      address: reserveToken,
      name,
      symbol,
      decimals
    };
  }
  async getReserveTokenAddress() {
    const { reserveToken } = await this.getTokenBond();
    return reserveToken;
  }
  getTokenAddress() {
    return this.tokenAddress;
  }
  async getUsdRate(amount = 1) {
    const rateData = await this.oneinch.getUsdRate({
      tokenAddress: this.tokenAddress,
      tokenDecimals: this.tokenType === "ERC20" ? 18 : 0
    });
    if (isFalse(rateData)) return { usdRate: null, stableCoin: null };
    const { rate, stableCoin } = rateData;
    return { usdRate: rate * amount, stableCoin };
  }
  getDetail() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "getDetail",
      args: [this.tokenAddress]
    });
  }
  async getTokenBond() {
    const [creator, mintRoyalty, burnRoyalty, createdAt, reserveToken, reserveBalance] = await bondContract.network(this.chainId, this.version).read({
      functionName: "tokenBond",
      args: [this.tokenAddress]
    });
    return {
      creator,
      mintRoyalty,
      burnRoyalty,
      createdAt,
      reserveToken,
      reserveBalance
    };
  }
  getSteps() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "getSteps",
      args: [this.tokenAddress]
    });
  }
  getMaxSupply() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "maxSupply",
      args: [this.tokenAddress]
    });
  }
  getPriceForNextMint() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "priceForNextMint",
      args: [this.tokenAddress]
    });
  }
  getSellEstimation(amount) {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "getRefundForTokens",
      args: [this.tokenAddress, amount]
    });
  }
  getBuyEstimation(amount) {
    return bondContract.network(this.chainId, this.version).read({
      functionName: "getReserveForToken",
      args: [this.tokenAddress, amount]
    });
  }
  async checkAndPrepareCreateArgs(params) {
    if (!this.symbol) {
      throw new SymbolNotDefinedError();
    }
    const exists = await this.exists();
    if (exists) {
      throw new TokenAlreadyExistsError();
    }
    const args = generateCreateArgs({ ...params, tokenType: this.tokenType, symbol: this.symbol });
    const fee = await this.getCreationFee();
    return { args, fee };
  }
  async buy(params) {
    const { amount, slippage = 0, recipient, onError } = params;
    try {
      const connectedAddress = await this.getConnectedWalletAddress();
      const [estimatedOutcome] = await this.getBuyEstimation(amount);
      const maxReserveAmount = estimatedOutcome + estimatedOutcome * BigInt(slippage * 100) / 10000n;
      const bondApproved = await this.bondContractApproved({
        walletAddress: connectedAddress,
        amountToSpend: maxReserveAmount,
        tradeType: "buy"
      });
      if (!bondApproved) {
        this.approveBond({
          ...params,
          tradeType: "buy",
          amountToSpend: maxReserveAmount
        });
      }
      return bondContract.network(this.chainId, this.version).write({
        ...params,
        functionName: "mint",
        args: [this.tokenAddress, amount, maxReserveAmount, recipient || connectedAddress]
      });
    } catch (e) {
      onError?.(e);
    }
  }
  async sell(params) {
    const { amount, slippage = 0, recipient, onError } = params;
    try {
      const connectedAddress = await this.getConnectedWalletAddress();
      const [estimatedOutcome] = await this.getSellEstimation(amount);
      const minReserveAmount = estimatedOutcome - estimatedOutcome * BigInt(slippage * 100) / 10000n;
      const bondApproved = await this.bondContractApproved({
        walletAddress: connectedAddress,
        amountToSpend: params?.allowanceAmount ?? amount,
        tradeType: "sell"
      });
      if (!bondApproved) {
        this.approveBond({
          ...params,
          tradeType: "sell",
          amountToSpend: amount
        });
      }
      return bondContract.network(this.chainId, this.version).write({
        ...params,
        functionName: "burn",
        args: [this.tokenAddress, amount, minReserveAmount, recipient || connectedAddress]
      });
    } catch (e) {
      onError?.(e);
    }
  }
  async buyWithZap(params) {
    const { amount, slippage = 0, recipient, onError } = params;
    try {
      const connectedAddress = await this.getConnectedWalletAddress();
      const [estimatedOutcome] = await this.getBuyEstimation(amount);
      const maxReserveAmount = estimatedOutcome + estimatedOutcome * BigInt(slippage * 100) / 10000n;
      return zapContract.network(this.chainId, this.version).write({
        ...params,
        functionName: "mintWithEth",
        args: [this.tokenAddress, amount, recipient || connectedAddress],
        value: maxReserveAmount
      });
    } catch (e) {
      onError?.(e);
    }
  }
  async sellWithZap(params) {
    const { amount, slippage = 0, recipient, onError } = params;
    try {
      const connectedAddress = await this.getConnectedWalletAddress();
      const [estimatedOutcome] = await this.getBuyEstimation(amount);
      const minReserveAmount = estimatedOutcome - estimatedOutcome * BigInt(slippage * 100) / 10000n;
      const bondApproved = await this.bondContractApproved({
        walletAddress: connectedAddress,
        amountToSpend: params?.allowanceAmount ?? amount,
        tradeType: "sell",
        isZap: true
      });
      if (!bondApproved) {
        return this.approveBond({
          ...params,
          tradeType: "sell",
          amountToSpend: amount,
          isZap: true
        });
      }
      return zapContract.network(this.chainId, this.version).write({
        ...params,
        functionName: "burnToEth",
        args: [this.tokenAddress, amount, minReserveAmount, recipient || connectedAddress]
      });
    } catch (e) {
      onError?.(e);
    }
  }
  async transfer(params) {
    const { amount, recipient, onError } = params;
    try {
      if (this.tokenType === "ERC20") {
        return erc20Contract.network(this.chainId, this.version).write({
          ...params,
          tokenAddress: this.getTokenAddress(),
          functionName: "transfer",
          args: [recipient, amount]
        });
      } else {
        const connectedAddress = await this.getConnectedWalletAddress();
        return erc1155Contract.network(this.chainId, this.version).write({
          ...params,
          tokenAddress: this.getTokenAddress(),
          functionName: "safeTransferFrom",
          args: [connectedAddress, recipient, 0n, amount, "0x"]
        });
      }
    } catch (e) {
      onError?.(e);
    }
  }
  async createAirdrop(params) {
    const { title, filebaseApiKey, wallets, amountPerClaim: _amountPerClaim, startTime, endTime } = params;
    if (wallets.some((address) => !viem.isAddress(address))) {
      throw new AirdropContainsInvalidWalletError();
    }
    const isERC20 = this.tokenType === "ERC20";
    const walletCount = wallets.length;
    let decimals = 0;
    if (this.tokenType === "ERC20") {
      decimals = await erc20Contract.network(this.chainId, this.version).read({
        tokenAddress: this.getTokenAddress(),
        functionName: "decimals"
      });
    }
    const amountPerClaim = wei(_amountPerClaim, decimals);
    const totalAmount = BigInt(amountPerClaim) * BigInt(walletCount);
    const approved = await this.contractIsApproved(
      {
        allowanceAmount: totalAmount,
        amountToSpend: totalAmount
      },
      "MERKLE"
    );
    if (!approved) {
      return this.approveContract(
        {
          ...params,
          allowanceAmount: totalAmount,
          amountToSpend: totalAmount
        },
        "MERKLE"
      );
    }
    const leaves = wallets.map((address) => viem.keccak256(address));
    const tree = new MerkleTree(leaves, viem.keccak256, {
      sortPairs: true
    });
    const merkleRoot = `0x${tree.getRoot().toString("hex")}`;
    const json = JSON.stringify(wallets, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const ipfsCID = await this.ipfsHelper.add(filebaseApiKey, blob);
    return this.airdropHelper.createAirdrop({
      token: this.tokenAddress,
      isERC20,
      amountPerClaim,
      walletCount,
      startTime: startTime ? Math.floor(startTime.getTime() / 1e3) : 0,
      endTime: Math.floor(endTime.getTime() / 1e3),
      merkleRoot,
      title,
      ipfsCID
    });
  }
}

class ERC1155 extends Token {
  constructor(params) {
    super({
      ...params,
      tokenType: "ERC1155"
    });
  }
  getBalanceOf(walletAddress) {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "balanceOf",
      args: [walletAddress, 0n]
    });
  }
  getBalanceOfBatch(walletAddresses) {
    const ids = Array(walletAddresses.length).fill(0n);
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "balanceOfBatch",
      args: [walletAddresses, ids]
    });
  }
  getBondAddress() {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "bond"
    });
  }
  getContractURI() {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "contractURI"
    });
  }
  getDecimals() {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "decimals"
    });
  }
  getIsApprovedForAll(params) {
    const { owner, spender } = params;
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "isApprovedForAll",
      args: [owner, spender]
    });
  }
  getName() {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "name"
    });
  }
  getSupportsInterface(interfaceId) {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "supportsInterface",
      args: [interfaceId]
    });
  }
  getSymbol() {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "symbol"
    });
  }
  getTotalSupply() {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "totalSupply"
    });
  }
  getMetadataUri() {
    return erc1155Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "uri",
      args: [0n]
    });
  }
  async getImageUri() {
    const jsonHash = await this.getMetadataUri();
    const metadataIpfsUrl = this.ipfsHelper.hashToGatewayUrl(jsonHash);
    const { image } = await fetch(metadataIpfsUrl).then((res) => res.json());
    return image;
  }
  async create(params) {
    const { onError, metadataUrl } = params;
    try {
      const { args, fee } = await this.checkAndPrepareCreateArgs(params);
      if (metadataUrl.startsWith("ipfs://")) {
        this.ipfsHelper.validateIpfsHash(metadataUrl);
      }
      return bondContract.network(this.chainId, this.version).write({
        ...params,
        functionName: "createMultiToken",
        args: [Object.assign(args.tokenParams, { uri: metadataUrl }), args.bondParams],
        value: fee
      });
    } catch (e) {
      console.error(e);
      onError?.(e);
    }
  }
  async approve(params) {
    const { spender, approved } = params;
    return erc1155Contract.network(this.chainId, this.version).write({
      ...params,
      tokenAddress: this.getTokenAddress(),
      functionName: "setApprovalForAll",
      args: [spender, approved]
    });
  }
}

class ERC20 extends Token {
  constructor(params) {
    super({
      ...params,
      tokenType: "ERC20"
    });
  }
  getAllowance(params) {
    const { owner, spender } = params;
    return erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "allowance",
      args: [owner, spender]
    });
  }
  getBalanceOf(walletAddress) {
    return erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "balanceOf",
      args: [walletAddress]
    });
  }
  getBondAddress() {
    return erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "bond"
    });
  }
  getDecimals() {
    return erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "decimals"
    });
  }
  getName() {
    return erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "name"
    });
  }
  getSymbol() {
    return erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "symbol"
    });
  }
  getTotalSupply() {
    return erc20Contract.network(this.chainId, this.version).read({
      tokenAddress: this.getTokenAddress(),
      functionName: "totalSupply"
    });
  }
  async approve(params) {
    const { spender, amount } = params;
    return erc20Contract.network(this.chainId, this.version).write({
      ...params,
      tokenAddress: this.getTokenAddress(),
      functionName: "approve",
      args: [spender, amount]
    });
  }
  async create(params) {
    try {
      const { args, fee } = await this.checkAndPrepareCreateArgs(params);
      return bondContract.network(this.chainId, this.version).write({
        ...params,
        functionName: "createToken",
        args: [args.tokenParams, args.bondParams],
        value: fee
      });
    } catch (e) {
      params.onError?.(e);
    }
  }
}

class Lockup {
  chainId;
  version;
  constructor(chainId, version) {
    this.chainId = chainId;
    this.version = version;
  }
  getTotalLockUpCount() {
    return lockupContract.network(this.chainId, this.version).read({
      functionName: "lockUpCount"
    });
  }
  getLockUpIdsByReceiver(params) {
    const { receiver, start = 0, end = 1e3 } = params;
    return lockupContract.network(this.chainId, this.version).read({
      functionName: "getLockUpIdsByReceiver",
      args: [receiver, BigInt(start), BigInt(end)]
    });
  }
  getLockUpIdsByToken(params) {
    const { token, start = 0, end = 1e3 } = params;
    return lockupContract.network(this.chainId, this.version).read({
      functionName: "getLockUpIdsByToken",
      args: [token, BigInt(start), BigInt(end)]
    });
  }
  async getLockUpById(lockUpId) {
    const [token, isERC20, unlockTime, unlocked, amount, receiver, title] = await lockupContract.network(this.chainId, this.version).read({
      functionName: "lockUps",
      args: [BigInt(lockUpId)]
    });
    return {
      token,
      isERC20,
      unlockTime,
      unlocked,
      amount,
      receiver,
      title
    };
  }
  createLockUp(params) {
    const { token, isERC20, amount, unlockTime, receiver, title } = params;
    return lockupContract.network(this.chainId, this.version).write({
      ...params,
      functionName: "createLockUp",
      args: [token, isERC20, amount, unlockTime, receiver, title]
    });
  }
  unlock(params) {
    const { lockUpId } = params;
    return lockupContract.network(this.chainId, this.version).write({
      ...params,
      functionName: "unlock",
      args: [BigInt(lockUpId)]
    });
  }
}

class Utils {
  generateMerkleRoot(wallets) {
    const leaves = wallets.map((address) => viem.keccak256(address));
    const tree = new MerkleTree(leaves, viem.keccak256, {
      sortPairs: true
    });
    const merkleRoot = `0x${tree.getRoot().toString("hex")}`;
    return merkleRoot;
  }
}

class BitAgentSDK {
  // chain agnostic
  wallet = new Client();
  ipfs = new Ipfs();
  utils = new Utils();
  network(id, version = "0.1.0") {
    let chainId;
    if (typeof id === "string") {
      chainId = chainStringToId(id);
    } else {
      chainId = id;
    }
    return this.withClientHelper(this.wallet, chainId, version);
  }
  withClientHelper(clientHelper, chainId, version) {
    return Object.assign(clientHelper, {
      getPublicClient() {
        return clientHelper._getPublicClient(chainId);
      },
      token: (symbolOrAddress) => {
        return new ERC20({
          symbolOrAddress,
          chainId,
          version
        });
      },
      nft: (symbolOrAddress) => {
        return new ERC1155({
          symbolOrAddress,
          chainId,
          version
        });
      },
      airdrop: new Airdrop(chainId, version),
      lockup: new Lockup(chainId, version),
      bond: new Bond(chainId, version)
    });
  }
  withPublicClient(publicClient) {
    const chainId = publicClient.chain?.id;
    if (chainId === void 0) throw new InvalidClientError();
    this.wallet = this.wallet.withPublicClient(publicClient);
    return this;
  }
  withWalletClient(walletClient) {
    const chainId = walletClient.chain?.id;
    if (chainId === void 0) throw new InvalidClientError();
    if (walletClient.chain?.id === void 0) throw new InvalidClientError();
    this.wallet = this.wallet.withWalletClient(walletClient);
    return this;
  }
}

function calculateRoyalty(amount, rate) {
  return amount * BigInt(rate) / 10000n;
}
function getCurrentStepIndex(currentSupply, bondSteps) {
  const stepIndex = bondSteps.findIndex((step) => currentSupply < step.rangeTo);
  return stepIndex === -1 ? bondSteps.length - 1 : stepIndex;
}
function calculateAdjustments(tokens, bondSteps, currentSupply, multiFactor, royaltyRate, slippage, isMinting) {
  let totalAmount = 0n;
  let tokensProcessed = tokens;
  let stepIndex = getCurrentStepIndex(currentSupply, bondSteps);
  let tempCurrentSupply = currentSupply;
  while (tokensProcessed > 0n && stepIndex < bondSteps.length && stepIndex >= 0) {
    const step = bondSteps[stepIndex];
    const supplyDelta = isMinting ? step.rangeTo - tempCurrentSupply : tempCurrentSupply - (stepIndex > 0 ? bondSteps[stepIndex - 1].rangeTo : 0n);
    const tokensToProcess = tokensProcessed > supplyDelta ? supplyDelta : tokensProcessed;
    const factor = isMinting ? multiFactor - 1n : 0n;
    totalAmount += (tokensToProcess * step.price + factor) / multiFactor;
    tokensProcessed -= tokensToProcess;
    tempCurrentSupply += isMinting ? tokensToProcess : -tokensToProcess;
    stepIndex += isMinting ? 1 : -1;
  }
  const royalty = calculateRoyalty(totalAmount, royaltyRate);
  let adjustedAmount = totalAmount + (isMinting ? royalty : -royalty);
  const slippageAmount = calculateRoyalty(adjustedAmount, slippage);
  adjustedAmount += isMinting ? slippageAmount : -slippageAmount;
  return { adjustedAmount, royalty };
}
function binarySearch(params) {
  const { reserveAmount, bondSteps, currentSupply, maxSupply, multiFactor, royaltyRate, slippage, isMinting } = params;
  let low = 0n;
  let high = isMinting ? maxSupply - currentSupply : currentSupply;
  let mid = 0n;
  let lastClosest = 0n;
  const MAX_ITERATIONS = 1e3;
  let iterations = 0;
  while (low <= high && iterations++ < MAX_ITERATIONS) {
    mid = (high + low) / 2n;
    const { adjustedAmount } = calculateAdjustments(
      mid,
      bondSteps,
      currentSupply,
      multiFactor,
      royaltyRate,
      slippage,
      isMinting
    );
    if (adjustedAmount === reserveAmount) return mid;
    else if (adjustedAmount < reserveAmount) {
      low = mid + 1n;
      lastClosest = mid;
    } else high = mid - 1n;
  }
  return lastClosest;
}
function binaryReverseMint(params) {
  return binarySearch({
    ...params,
    royaltyRate: params.mintRoyalty,
    isMinting: true
  });
}
function binaryReverseBurn(params) {
  return binarySearch({
    ...params,
    maxSupply: params.currentSupply,
    royaltyRate: params.burnRoyalty,
    isMinting: false
  });
}

const abis = {
  BOND: BOND_ABI,
  ERC20: ERC20_ABI,
  ERC1155: ERC1155_ABI,
  LOCKER: LOCKER_ABI,
  MERKLE: MERKLE_ABI,
  ONEINCH: ONEINCH_ABI,
  ZAP: ZAP_ABI
};
const whitelistedTokens = TOKENS;
const errorMessages = CONTRACT_ERROR_MESSAGES;
const supportedChains = [
  "ethereum",
  "sepolia",
  "bnbchain",
  "polygon",
  "arbitrum",
  "optimism",
  "avalanche",
  "base",
  "basesepolia",
  "kaia",
  "degen",
  "ham",
  "cyber",
  "cybertestnet"
];
const supportedChainsMap = {
  ethereum: chains.mainnet.id,
  sepolia: chains.sepolia.id,
  basesepolia: chains.baseSepolia.id,
  bnbchain: chains.bsc.id,
  bnbchaintestnet: chains.bscTestnet.id,
  polygon: chains.polygon.id,
  arbitrum: chains.arbitrum.id,
  kaia: chains.kaia.id,
  degen: chains.degen.id,
  optimism: chains.optimism.id,
  optimismsepolia: chains.optimismSepolia.id,
  avalanche: chains.avalanche.id,
  base: chains.base.id,
  blast: chains.blast.id,
  blastsepolia: chains.blastSepolia.id,
  avalanchefuji: chains.avalancheFuji.id,
  cyber: chains.cyber.id,
  ham: chains.ham.id,
  cybertestnet: chains.cyberTestnet.id
};
const bitagent = new BitAgentSDK();

exports.BOND_ABI = BOND_ABI;
exports.BOND_ERROR_MESSAGES = BOND_ERROR_MESSAGES;
exports.CHAINS = CHAINS;
exports.CHAIN_MAP = CHAIN_MAP;
exports.CHAIN_NAME_ID_MAP = CHAIN_NAME_ID_MAP;
exports.COINGECKO_NETWORK_IDS = COINGECKO_NETWORK_IDS;
exports.CONTRACT_ERROR_MESSAGES = CONTRACT_ERROR_MESSAGES;
exports.CurveEnum = CurveEnum;
exports.DEFAULT_RANK_OPTIONS = DEFAULT_RANK_OPTIONS;
exports.ERC1155_ABI = ERC1155_ABI;
exports.ERC1155_ERROR_MESSAGES = ERC1155_ERROR_MESSAGES;
exports.ERC20_ABI = ERC20_ABI;
exports.ERC20_ERROR_MESSAGES = ERC20_ERROR_MESSAGES;
exports.LOCKER_ABI = LOCKER_ABI;
exports.LOCKER_ERROR_MESSAGES = LOCKER_ERROR_MESSAGES;
exports.MERKLE_ABI = MERKLE_ABI;
exports.MERKLE_ERROR_MESSAGES = MERKLE_ERROR_MESSAGES;
exports.ONEINCH_ABI = ONEINCH_ABI;
exports.RPCS = RPCS;
exports.TOKENS = TOKENS;
exports.WRAPPED_NATIVE_TOKENS = WRAPPED_NATIVE_TOKENS;
exports.ZAP_ABI = ZAP_ABI;
exports.ZAP_ERROR_MESSAGES = ZAP_ERROR_MESSAGES;
exports.abis = abis;
exports.airdropContract = airdropContract;
exports.applyDecimals = applyDecimals;
exports.binaryReverseBurn = binaryReverseBurn;
exports.binaryReverseMint = binaryReverseMint;
exports.bitagent = bitagent;
exports.bondContract = bondContract;
exports.calculateArea = calculateArea;
exports.calculateRoyalty = calculateRoyalty;
exports.chainIdToString = chainIdToString;
exports.chainIdToViemChain = chainIdToViemChain;
exports.chainRPCFallbacks = chainRPCFallbacks;
exports.chainStringToId = chainStringToId;
exports.commify = commify;
exports.computeCreate2Address = computeCreate2Address;
exports.countDecimals = countDecimals;
exports.countLeadingZeros = countLeadingZeros;
exports.createRandomAddress = createRandomAddress;
exports.erc1155Contract = erc1155Contract;
exports.erc20Contract = erc20Contract;
exports.errorMessages = errorMessages;
exports.formatGraphPoint = formatGraphPoint;
exports.generateCreateArgs = generateCreateArgs;
exports.generateSteps = generateSteps;
exports.generateTableData = generateTableData;
exports.getBitAgentContractAddress = getBitAgentContractAddress;
exports.getChain = getChain;
exports.getSubscriptCharacter = getSubscriptCharacter;
exports.getSubscriptNumber = getSubscriptNumber;
exports.getValueAfterLeadingZeros = getValueAfterLeadingZeros;
exports.graphTypes = graphTypes;
exports.handleScientificNotation = handleScientificNotation;
exports.lockupContract = lockupContract;
exports.oneInchContract = oneInchContract;
exports.precisionRound = precisionRound;
exports.shortenNumber = shortenNumber;
exports.supportedChains = supportedChains;
exports.supportedChainsMap = supportedChainsMap;
exports.toFixed = toFixed;
exports.toNumber = toNumber;
exports.truncateString = truncateString;
exports.uncommify = uncommify;
exports.wei = wei$1;
exports.whitelistedTokens = whitelistedTokens;
exports.zapContract = zapContract;
