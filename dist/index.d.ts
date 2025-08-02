import { ExtractAbiErrorNames } from 'abitype';
import * as viem from 'viem';
import { Chain, HttpTransportConfig, FallbackTransportConfig, PublicClient, WalletClient, Abi, ContractFunctionName, ContractFunctionArgs, TransactionReceipt, ReadContractReturnType } from 'viem';
export { Abi } from 'viem';
import * as chains from 'viem/chains';
import { sepolia, blastSepolia, avalancheFuji, cyberTestnet } from 'viem/chains';

declare const BOND_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "tokenImplementation";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "multiTokenImplementation";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "protocolBeneficiary_";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "creationFee_";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxSteps";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "uniswapV3Factory_";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "positionManager_";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "rewardManager_";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "target";
        readonly type: "address";
    }];
    readonly name: "AddressEmptyCode";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "AddressInsufficientBalance";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ERC1167FailedCreateClone";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "FailedInnerCall";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_BOND__InvalidPaginationParameters";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__CreationFeeTransactionFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__ExceedMaxSupply";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__ExceedTotalSupply";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "MCV2_Bond__InvalidConstructorParams";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__InvalidCreationFee";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__InvalidCreatorAddress";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__InvalidCurrentSupply";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "MCV2_Bond__InvalidGraduateReserveAmount";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__InvalidReceiver";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "MCV2_Bond__InvalidReserveToken";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "MCV2_Bond__InvalidStepParams";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__InvalidTokenAmount";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "MCV2_Bond__InvalidTokenCreationParams";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__PermissionDenied";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__SlippageLimitExceeded";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__SqrtPriceX96CalculationInvalidInput";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__SqrtPriceX96CalculationOverflow";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__TokenNotFound";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Bond__TokenSymbolAlreadyExists";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Royalty__InvalidParams";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_Royalty__NothingToClaim";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "OwnableInvalidOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "OwnableUnauthorizedAccount";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint8";
        readonly name: "bits";
        readonly type: "uint8";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "SafeCastOverflowedUintDowncast";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "SafeERC20FailedOperation";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "creator";
        readonly type: "address";
    }];
    readonly name: "BondCreatorUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amountBurned";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "refundAmount";
        readonly type: "uint256";
    }];
    readonly name: "Burn";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "CreationFeeUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amountMinted";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "reserveAmount";
        readonly type: "uint256";
    }];
    readonly name: "Mint";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "symbol";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "uri";
        readonly type: "string";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }];
    readonly name: "MultiTokenCreated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "protocolBeneficiary";
        readonly type: "address";
    }];
    readonly name: "ProtocolBeneficiaryUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "RoyaltyClaimed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "ratio";
        readonly type: "uint256";
    }];
    readonly name: "RoyaltyRangeUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "symbol";
        readonly type: "string";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "agenthash";
        readonly type: "bytes32";
    }];
    readonly name: "TokenCreated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "tokenAmount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "reserveTokenAmount";
        readonly type: "uint256";
    }];
    readonly name: "TokenGraduated";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "BURN_ADDRESS";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokensToBurn";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "minRefund";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "burn";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }];
    readonly name: "burnRoyalties";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "tokenBalance";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "reserveTokenBalance";
        readonly type: "uint256";
    }];
    readonly name: "calculateSqrtPriceX96";
    readonly outputs: readonly [{
        readonly internalType: "uint160";
        readonly name: "sqrtPriceX96";
        readonly type: "uint160";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }];
    readonly name: "claimRoyalties";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "symbol";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "uri";
            readonly type: "string";
        }];
        readonly internalType: "struct MCV2_Bond.MultiTokenParams";
        readonly name: "tp";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint16";
            readonly name: "mintRoyalty";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "burnRoyalty";
            readonly type: "uint16";
        }, {
            readonly internalType: "address";
            readonly name: "reserveToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint128";
            readonly name: "maxSupply";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128[]";
            readonly name: "stepRanges";
            readonly type: "uint128[]";
        }, {
            readonly internalType: "uint128[]";
            readonly name: "stepPrices";
            readonly type: "uint128[]";
        }];
        readonly internalType: "struct MCV2_Bond.BondParams";
        readonly name: "bp";
        readonly type: "tuple";
    }];
    readonly name: "createMultiToken";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "symbol";
            readonly type: "string";
        }, {
            readonly internalType: "bytes32";
            readonly name: "agentHash";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct MCV2_Bond.TokenParams";
        readonly name: "tp";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint16";
            readonly name: "mintRoyalty";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "burnRoyalty";
            readonly type: "uint16";
        }, {
            readonly internalType: "address";
            readonly name: "reserveToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint128";
            readonly name: "maxSupply";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128[]";
            readonly name: "stepRanges";
            readonly type: "uint128[]";
        }, {
            readonly internalType: "uint128[]";
            readonly name: "stepPrices";
            readonly type: "uint128[]";
        }];
        readonly internalType: "struct MCV2_Bond.BondParams";
        readonly name: "bp";
        readonly type: "tuple";
    }];
    readonly name: "createToken";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "creationFee";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "exists";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "getDetail";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint16";
            readonly name: "mintRoyalty";
            readonly type: "uint16";
        }, {
            readonly internalType: "uint16";
            readonly name: "burnRoyalty";
            readonly type: "uint16";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "creator";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint8";
                readonly name: "decimals";
                readonly type: "uint8";
            }, {
                readonly internalType: "string";
                readonly name: "symbol";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "name";
                readonly type: "string";
            }, {
                readonly internalType: "uint40";
                readonly name: "createdAt";
                readonly type: "uint40";
            }, {
                readonly internalType: "uint128";
                readonly name: "currentSupply";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "maxSupply";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "priceForNextMint";
                readonly type: "uint128";
            }, {
                readonly internalType: "address";
                readonly name: "reserveToken";
                readonly type: "address";
            }, {
                readonly internalType: "uint8";
                readonly name: "reserveDecimals";
                readonly type: "uint8";
            }, {
                readonly internalType: "string";
                readonly name: "reserveSymbol";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "reserveName";
                readonly type: "string";
            }, {
                readonly internalType: "uint256";
                readonly name: "reserveBalance";
                readonly type: "uint256";
            }];
            readonly internalType: "struct MCV2_Bond.BondInfo";
            readonly name: "info";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "rangeTo";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "price";
                readonly type: "uint128";
            }];
            readonly internalType: "struct MCV2_Bond.BondStep[]";
            readonly name: "steps";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct MCV2_Bond.BondDetail";
        readonly name: "detail";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stop";
        readonly type: "uint256";
    }];
    readonly name: "getList";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "creator";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint8";
            readonly name: "decimals";
            readonly type: "uint8";
        }, {
            readonly internalType: "string";
            readonly name: "symbol";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "uint40";
            readonly name: "createdAt";
            readonly type: "uint40";
        }, {
            readonly internalType: "uint128";
            readonly name: "currentSupply";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "maxSupply";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "priceForNextMint";
            readonly type: "uint128";
        }, {
            readonly internalType: "address";
            readonly name: "reserveToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint8";
            readonly name: "reserveDecimals";
            readonly type: "uint8";
        }, {
            readonly internalType: "string";
            readonly name: "reserveSymbol";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "reserveName";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "reserveBalance";
            readonly type: "uint256";
        }];
        readonly internalType: "struct MCV2_Bond.BondInfo[]";
        readonly name: "info";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokensToBurn";
        readonly type: "uint256";
    }];
    readonly name: "getRefundForTokens";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "refundAmount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "royalty";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokensToMint";
        readonly type: "uint256";
    }];
    readonly name: "getReserveForToken";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "reserveAmount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "royalty";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "wallet";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }];
    readonly name: "getRoyaltyInfo";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "getSteps";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint128";
            readonly name: "rangeTo";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "price";
            readonly type: "uint128";
        }];
        readonly internalType: "struct MCV2_Bond.BondStep[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "creator";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stop";
        readonly type: "uint256";
    }];
    readonly name: "getTokensByCreator";
    readonly outputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "addresses";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stop";
        readonly type: "uint256";
    }];
    readonly name: "getTokensByReserveToken";
    readonly outputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "addresses";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "maxRoyaltyRange";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "maxSupply";
    readonly outputs: readonly [{
        readonly internalType: "uint128";
        readonly name: "";
        readonly type: "uint128";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokensToMint";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxReserveAmount";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "mint";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "positionManager";
    readonly outputs: readonly [{
        readonly internalType: "contract INonfungiblePositionManager";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "priceForNextMint";
    readonly outputs: readonly [{
        readonly internalType: "uint128";
        readonly name: "";
        readonly type: "uint128";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "protocolBeneficiary";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "tokenBond";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "creator";
        readonly type: "address";
    }, {
        readonly internalType: "uint16";
        readonly name: "mintRoyalty";
        readonly type: "uint16";
    }, {
        readonly internalType: "uint16";
        readonly name: "burnRoyalty";
        readonly type: "uint16";
    }, {
        readonly internalType: "uint40";
        readonly name: "createdAt";
        readonly type: "uint40";
    }, {
        readonly internalType: "address";
        readonly name: "reserveToken";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "reserveBalance";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "tokenCount";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "tokens";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "uniswapV3Factory";
    readonly outputs: readonly [{
        readonly internalType: "contract IUniswapV3Factory";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "creator";
        readonly type: "address";
    }];
    readonly name: "updateBondCreator";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "updateCreationFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "maxSupply";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "graduateMcap";
            readonly type: "uint256";
        }, {
            readonly internalType: "int24";
            readonly name: "poolTickSpacing";
            readonly type: "int24";
        }, {
            readonly internalType: "uint24";
            readonly name: "poolFee";
            readonly type: "uint24";
        }];
        readonly internalType: "struct MCV2_Bond.GraduationSettings";
        readonly name: "newSettings_";
        readonly type: "tuple";
    }];
    readonly name: "updateGraduationSettings";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "ratio";
        readonly type: "uint256";
    }];
    readonly name: "updateMaxRoyaltyRange";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "protocolBeneficiary_";
        readonly type: "address";
    }];
    readonly name: "updateProtocolBeneficiary";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newManager";
        readonly type: "address";
    }];
    readonly name: "updateRewardManager";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "userTokenRoyaltyBalance";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "userTokenRoyaltyClaimed";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "version";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}];

declare const ERC1155_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "balance";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "needed";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "ERC1155InsufficientBalance";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "approver";
        readonly type: "address";
    }];
    readonly name: "ERC1155InvalidApprover";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "idsLength";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "valuesLength";
        readonly type: "uint256";
    }];
    readonly name: "ERC1155InvalidArrayLength";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }];
    readonly name: "ERC1155InvalidOperator";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "ERC1155InvalidReceiver";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }];
    readonly name: "ERC1155InvalidSender";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "ERC1155MissingApprovalForAll";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_MultiToken__AlreadyInitialized";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_MultiToken__BurnAmountExceedsTotalSupply";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_MultiToken__NotApproved";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_MultiToken__PermissionDenied";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "approved";
        readonly type: "bool";
    }];
    readonly name: "ApprovalForAll";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256[]";
        readonly name: "values";
        readonly type: "uint256[]";
    }];
    readonly name: "TransferBatch";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "id";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "TransferSingle";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "id";
        readonly type: "uint256";
    }];
    readonly name: "URI";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "id";
        readonly type: "uint256";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "accounts";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }];
    readonly name: "balanceOfBatch";
    readonly outputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "bond";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "burnByBond";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "contractURI";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly internalType: "uint8";
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "name_";
        readonly type: "string";
    }, {
        readonly internalType: "string";
        readonly name: "symbol_";
        readonly type: "string";
    }, {
        readonly internalType: "string";
        readonly name: "uri_";
        readonly type: "string";
    }];
    readonly name: "init";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }];
    readonly name: "isApprovedForAll";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "mintByBond";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "values";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "safeBatchTransferFrom";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "id";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "safeTransferFrom";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "approved";
        readonly type: "bool";
    }];
    readonly name: "setApprovalForAll";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "interfaceId";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "uri";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];

declare const ERC20_ABI: readonly [{
    readonly type: "function";
    readonly name: "agentHash";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "allowance";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "approve";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "balanceOf";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "bond";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "burnByBond";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "decimals";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "init";
    readonly inputs: readonly [{
        readonly name: "name_";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "symbol_";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "agentHash_";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "mintByBond";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "name";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "symbol";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "totalSupply";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "transfer";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "transferFrom";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "event";
    readonly name: "Approval";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Transfer";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "ERC20InsufficientAllowance";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "allowance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "needed";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InsufficientBalance";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "balance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "needed";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidApprover";
    readonly inputs: readonly [{
        readonly name: "approver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidReceiver";
    readonly inputs: readonly [{
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidSender";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidSpender";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "MCV2_Token__AlreadyInitialized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "MCV2_Token__PermissionDenied";
    readonly inputs: readonly [];
}];

declare const LOCKER_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "target";
        readonly type: "address";
    }];
    readonly name: "AddressEmptyCode";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "AddressInsufficientBalance";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "FailedInnerCall";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "LockUp__AlreadyClaimed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "LockUp__InvalidPaginationParameters";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "param";
        readonly type: "string";
    }];
    readonly name: "LockUp__InvalidParams";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "LockUp__NotYetUnlocked";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "LockUp__PermissionDenied";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "SafeERC20FailedOperation";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "lockUpId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "isERC20";
        readonly type: "bool";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint40";
        readonly name: "unlockTime";
        readonly type: "uint40";
    }];
    readonly name: "LockedUp";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "lockUpId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "isERC20";
        readonly type: "bool";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "Unlocked";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isERC20";
        readonly type: "bool";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint40";
        readonly name: "unlockTime";
        readonly type: "uint40";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "string";
        readonly name: "title";
        readonly type: "string";
    }];
    readonly name: "createLockUp";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stop";
        readonly type: "uint256";
    }];
    readonly name: "getLockUpIdsByReceiver";
    readonly outputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stop";
        readonly type: "uint256";
    }];
    readonly name: "getLockUpIdsByToken";
    readonly outputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "lockUpCount";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "lockUps";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isERC20";
        readonly type: "bool";
    }, {
        readonly internalType: "uint40";
        readonly name: "unlockTime";
        readonly type: "uint40";
    }, {
        readonly internalType: "bool";
        readonly name: "unlocked";
        readonly type: "bool";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "string";
        readonly name: "title";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC1155Received";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "lockUpId";
        readonly type: "uint256";
    }];
    readonly name: "unlock";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];

declare const MERKLE_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "target";
        readonly type: "address";
    }];
    readonly name: "AddressEmptyCode";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "AddressInsufficientBalance";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "FailedInnerCall";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__AlreadyClaimed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__AlreadyRefunded";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__Finished";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__InvalidCaller";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__InvalidPaginationParameters";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "param";
        readonly type: "string";
    }];
    readonly name: "MerkleDistributor__InvalidParams";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__InvalidProof";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__NoClaimableTokensLeft";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__NotStarted";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__NothingToRefund";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__PermissionDenied";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MerkleDistributor__Refunded";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "SafeERC20FailedOperation";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "Claimed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "isERC20";
        readonly type: "bool";
    }, {
        readonly indexed: false;
        readonly internalType: "uint40";
        readonly name: "startTime";
        readonly type: "uint40";
    }];
    readonly name: "Created";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "Refunded";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes32[]";
        readonly name: "merkleProof";
        readonly type: "bytes32[]";
    }];
    readonly name: "claim";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isERC20";
        readonly type: "bool";
    }, {
        readonly internalType: "uint176";
        readonly name: "amountPerClaim";
        readonly type: "uint176";
    }, {
        readonly internalType: "uint40";
        readonly name: "walletCount";
        readonly type: "uint40";
    }, {
        readonly internalType: "uint40";
        readonly name: "startTime";
        readonly type: "uint40";
    }, {
        readonly internalType: "uint40";
        readonly name: "endTime";
        readonly type: "uint40";
    }, {
        readonly internalType: "bytes32";
        readonly name: "merkleRoot";
        readonly type: "bytes32";
    }, {
        readonly internalType: "string";
        readonly name: "title";
        readonly type: "string";
    }, {
        readonly internalType: "string";
        readonly name: "ipfsCID";
        readonly type: "string";
    }];
    readonly name: "createDistribution";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "distributionCount";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "distributions";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isERC20";
        readonly type: "bool";
    }, {
        readonly internalType: "uint40";
        readonly name: "walletCount";
        readonly type: "uint40";
    }, {
        readonly internalType: "uint40";
        readonly name: "claimedCount";
        readonly type: "uint40";
    }, {
        readonly internalType: "uint176";
        readonly name: "amountPerClaim";
        readonly type: "uint176";
    }, {
        readonly internalType: "uint40";
        readonly name: "startTime";
        readonly type: "uint40";
    }, {
        readonly internalType: "uint40";
        readonly name: "endTime";
        readonly type: "uint40";
    }, {
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly internalType: "uint40";
        readonly name: "refundedAt";
        readonly type: "uint40";
    }, {
        readonly internalType: "bytes32";
        readonly name: "merkleRoot";
        readonly type: "bytes32";
    }, {
        readonly internalType: "string";
        readonly name: "title";
        readonly type: "string";
    }, {
        readonly internalType: "string";
        readonly name: "ipfsCID";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }];
    readonly name: "getAmountClaimed";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }];
    readonly name: "getAmountLeft";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stop";
        readonly type: "uint256";
    }];
    readonly name: "getDistributionIdsByOwner";
    readonly outputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "stop";
        readonly type: "uint256";
    }];
    readonly name: "getDistributionIdsByToken";
    readonly outputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "wallet";
        readonly type: "address";
    }];
    readonly name: "isClaimed";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }];
    readonly name: "isWhitelistOnly";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "wallet";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32[]";
        readonly name: "merkleProof";
        readonly type: "bytes32[]";
    }];
    readonly name: "isWhitelisted";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC1155Received";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "distributionId";
        readonly type: "uint256";
    }];
    readonly name: "refund";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];

declare const ZAP_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "bondAddress";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "wethAddress";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "target";
        readonly type: "address";
    }];
    readonly name: "AddressEmptyCode";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "AddressInsufficientBalance";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "FailedInnerCall";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_ZapV1__EthTransferFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_ZapV1__InvalidReceiver";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_ZapV1__ReserveIsNotWETH";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MCV2_ZapV1__SlippageLimitExceeded";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "OwnableInvalidOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "OwnableUnauthorizedAccount";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "SafeERC20FailedOperation";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "BOND";
    readonly outputs: readonly [{
        readonly internalType: "contract MCV2_Bond";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "WETH";
    readonly outputs: readonly [{
        readonly internalType: "contract IWETH";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokensToBurn";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "minRefund";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "burnToEth";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokensToMint";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "mintWithEth";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "rescueETH";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];

type BondErrorNames = ExtractAbiErrorNames<typeof BOND_ABI>;
type ERC20ErrorNames = ExtractAbiErrorNames<typeof ERC20_ABI>;
type ERC1155ErrorNames = ExtractAbiErrorNames<typeof ERC1155_ABI>;
type LockerErrorNames = ExtractAbiErrorNames<typeof LOCKER_ABI>;
type MerkleErrorNames = ExtractAbiErrorNames<typeof MERKLE_ABI>;
type ZapErrorNames = ExtractAbiErrorNames<typeof ZAP_ABI>;
type AllContractErrorNames = BondErrorNames | ERC20ErrorNames | ERC1155ErrorNames | LockerErrorNames | MerkleErrorNames | ZapErrorNames;

declare const ONEINCH_ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "contract MultiWrapper";
        readonly name: "_multiWrapper";
        readonly type: "address";
    }, {
        readonly internalType: "contract IOracle[]";
        readonly name: "existingOracles";
        readonly type: "address[]";
    }, {
        readonly internalType: "enum OffchainOracle.OracleType[]";
        readonly name: "oracleTypes";
        readonly type: "uint8[]";
    }, {
        readonly internalType: "contract IERC20[]";
        readonly name: "existingConnectors";
        readonly type: "address[]";
    }, {
        readonly internalType: "contract IERC20";
        readonly name: "wBase";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "ArraysLengthMismatch";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ConnectorAlreadyAdded";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidOracleTokenKind";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "OracleAlreadyAdded";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "SameTokens";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "TooBigThreshold";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "UnknownConnector";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "UnknownOracle";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "contract IERC20";
        readonly name: "connector";
        readonly type: "address";
    }];
    readonly name: "ConnectorAdded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "contract IERC20";
        readonly name: "connector";
        readonly type: "address";
    }];
    readonly name: "ConnectorRemoved";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "contract MultiWrapper";
        readonly name: "multiWrapper";
        readonly type: "address";
    }];
    readonly name: "MultiWrapperUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "contract IOracle";
        readonly name: "oracle";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "enum OffchainOracle.OracleType";
        readonly name: "oracleType";
        readonly type: "uint8";
    }];
    readonly name: "OracleAdded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "contract IOracle";
        readonly name: "oracle";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "enum OffchainOracle.OracleType";
        readonly name: "oracleType";
        readonly type: "uint8";
    }];
    readonly name: "OracleRemoved";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "connector";
        readonly type: "address";
    }];
    readonly name: "addConnector";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IOracle";
        readonly name: "oracle";
        readonly type: "address";
    }, {
        readonly internalType: "enum OffchainOracle.OracleType";
        readonly name: "oracleKind";
        readonly type: "uint8";
    }];
    readonly name: "addOracle";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "connectors";
    readonly outputs: readonly [{
        readonly internalType: "contract IERC20[]";
        readonly name: "allConnectors";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "srcToken";
        readonly type: "address";
    }, {
        readonly internalType: "contract IERC20";
        readonly name: "dstToken";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "useWrappers";
        readonly type: "bool";
    }];
    readonly name: "getRate";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "weightedRate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "srcToken";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "useSrcWrappers";
        readonly type: "bool";
    }];
    readonly name: "getRateToEth";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "weightedRate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "srcToken";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "useSrcWrappers";
        readonly type: "bool";
    }, {
        readonly internalType: "contract IERC20[]";
        readonly name: "customConnectors";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "thresholdFilter";
        readonly type: "uint256";
    }];
    readonly name: "getRateToEthWithCustomConnectors";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "weightedRate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "srcToken";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "useSrcWrappers";
        readonly type: "bool";
    }, {
        readonly internalType: "uint256";
        readonly name: "thresholdFilter";
        readonly type: "uint256";
    }];
    readonly name: "getRateToEthWithThreshold";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "weightedRate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "srcToken";
        readonly type: "address";
    }, {
        readonly internalType: "contract IERC20";
        readonly name: "dstToken";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "useWrappers";
        readonly type: "bool";
    }, {
        readonly internalType: "contract IERC20[]";
        readonly name: "customConnectors";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "thresholdFilter";
        readonly type: "uint256";
    }];
    readonly name: "getRateWithCustomConnectors";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "weightedRate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "srcToken";
        readonly type: "address";
    }, {
        readonly internalType: "contract IERC20";
        readonly name: "dstToken";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "useWrappers";
        readonly type: "bool";
    }, {
        readonly internalType: "uint256";
        readonly name: "thresholdFilter";
        readonly type: "uint256";
    }];
    readonly name: "getRateWithThreshold";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "weightedRate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "multiWrapper";
    readonly outputs: readonly [{
        readonly internalType: "contract MultiWrapper";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "oracles";
    readonly outputs: readonly [{
        readonly internalType: "contract IOracle[]";
        readonly name: "allOracles";
        readonly type: "address[]";
    }, {
        readonly internalType: "enum OffchainOracle.OracleType[]";
        readonly name: "oracleTypes";
        readonly type: "uint8[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "connector";
        readonly type: "address";
    }];
    readonly name: "removeConnector";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract IOracle";
        readonly name: "oracle";
        readonly type: "address";
    }, {
        readonly internalType: "enum OffchainOracle.OracleType";
        readonly name: "oracleKind";
        readonly type: "uint8";
    }];
    readonly name: "removeOracle";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract MultiWrapper";
        readonly name: "_multiWrapper";
        readonly type: "address";
    }];
    readonly name: "setMultiWrapper";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];

declare const SDK_CONTRACT_ADDRESSES: {
    readonly ERC20: {
        readonly 1: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 10: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 11155420: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 42161: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 43114: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 137: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 56: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 97: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 8453: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 84532: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 11155111: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 81457: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 168587773: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 43113: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 666666666: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 111557560: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 8217: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 7560: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
        readonly 5112: "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB";
    };
    readonly ERC1155: {
        readonly 1: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 10: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 11155420: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 42161: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 43114: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 137: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 56: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 97: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 8453: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 84532: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 11155111: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 81457: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 168587773: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 43113: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 666666666: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 111557560: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 8217: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 7560: "0x187E536C5404dD472476B9e4C716878d359a506A";
        readonly 5112: "0x187E536C5404dD472476B9e4C716878d359a506A";
    };
    readonly BOND: {
        readonly 1: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 10: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 11155420: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 42161: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 43114: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 137: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 56: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 97: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 8453: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 84532: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 11155111: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 81457: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 168587773: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 43113: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 666666666: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 111557560: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 8217: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 7560: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
        readonly 5112: "0x912e3153a021b092ab85EA79B2a5d07b04B0073B";
    };
    readonly ZAP: {
        readonly 1: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 10: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 11155420: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 42161: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 43114: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 137: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 56: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 97: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 8453: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 84532: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 11155111: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 81457: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 168587773: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 43113: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 666666666: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 111557560: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 8217: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 7560: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
        readonly 5112: "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537";
    };
    readonly LOCKER: {
        readonly 1: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 10: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 11155420: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 42161: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 43114: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 137: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 56: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 97: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 8453: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 84532: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 11155111: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 81457: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 168587773: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 43113: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 666666666: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 111557560: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 8217: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 7560: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
        readonly 5112: "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867";
    };
    readonly MERKLE: {
        readonly 1: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 10: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 11155420: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 42161: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 43114: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 137: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 56: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 97: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 8453: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 84532: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 11155111: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 81457: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 168587773: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 43113: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 666666666: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 111557560: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 8217: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 7560: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
        readonly 5112: "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225";
    };
    readonly ONEINCH: {
        readonly 1: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 10: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 11155420: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 42161: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 43114: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 137: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 56: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 97: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 8453: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 8217: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 11155111: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x";
        readonly 84532: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 81457: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 168587773: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 43113: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x";
        readonly 666666666: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 111557560: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 7560: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
        readonly 5112: "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8";
    };
};
type Version = '0.1.0' | '0.2.0' | '0.3.0' | '0.3.1' | '0.4.0' | '0.5.0' | '0.6.0' | '0.6.1' | '0.7.0' | '0.7.1' | '0.7.2' | '0.7.3' | '0.8.0' | '0.8.1' | '0.8.2' | '0.8.3' | '0.9.0' | '0.9.1' | '0.9.2' | '1.0.0' | '1.0.1' | '1.0.2' | '1.1.0' | '1.1.1' | '1.1.2' | '1.1.4' | '1.1.5' | '1.1.6' | '1.1.7' | '1.1.8' | '1.2.0' | '1.2.1' | '1.2.2' | '1.2.4' | '1.2.5';
declare function getBitAgentContractAddress(contractName: ContractNames, chainId: SdkSupportedChainIds, version?: Version): "0xDEF22E6C358f10690D433CC82a0Ca9d98D3a8ebB" | "0x187E536C5404dD472476B9e4C716878d359a506A" | "0x912e3153a021b092ab85EA79B2a5d07b04B0073B" | "0xe4287a55a5512aE2cAb53bb1eFA4991ac7E2c537" | "0xBF2eb2b419d1871446509B7Ac233bd32Be7B8867" | "0xDF407862072B4de05aae94c1A2f0bE5EF8C72225" | "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8" | "0x0AdDd25a91563696D8567Df78D5A01C9a991F9B8x" | "0x72C2AFf46bE96f86a4a0Ca03DcCbC13fabA1388a" | "0x31cA89a5D7Ff696f691bDaC8f7F2D3b03C5011c3" | "0xCadA74C15F911Fdb653F8ecCc3Ef109b590Cf868" | "0xE9af8f69DF5cb825012d07cBd5C811A3a4c70c06" | "0x3A6EDDf80d55E35A1fc2f92EE07800999E4d3fd9" | "0x3e1C761024e1f93959F409641E8e0AbC63333604" | "0x0aDFA11353f98004554Bc4c5Ec7d5e62a235bABa" | "0xDfbB35E7fE82245691D7df41BfCE6FE15118Df60" | "0xdcd4D5CE277A5F48E478967e21105DF29453009E" | "0x1F032dE2be7A730EF5035dDfcAC92D8f928A9586" | "0x985A6F0D07ea503f5Ff2C99f4B4C813769793C92" | "0xA081Ae7e0472CdAB5dbb339F8EB6d588E2a7fD85" | "0x71465F54E6D9Ed9ddA62cA8fD843a6AaA14a37Af" | "0x2b63d5a9864ce4a00d3C4bcFd007a80aA4EDc412" | "0xb27e3733C163CCa8Cdcfe45E684c1afA2D5bF07d" | "0xD073656c90A22FB4C87409957496D2d4359200d5" | "0xb1303bCc370057AE779FF6D4cCA86537574806f5" | "0x6284b6f50BE9be1421239D0797FA7BeED45B2887" | "0xC846B4791cf6BA661475f073c39ec51779048755" | "0x5B905d22761dc9737ABEe1B642067676804Bf886" | "0xc4d2A58180DFe389917186FcF1C767F5459EEF4c" | "0x307567862AEA0291dbeecBC1019d9c54eDf15F04" | "0xb533C387107b1cecbB0bc3cC5444044C41B76528" | "0x2210a4A6234fFDa20E31D2EF72a8DB8CC626c9f6" | "0x55fDe4803CAB3f3929ebbF98D44C303b5f67600e" | "0xc9ADF8d18E663c52d39E67fDc204323b09Bd3e06" | "0x9464bd78CA8E90BE1c21da939B4a994e51129BdC" | "0x3805A4D5a475B48e884ca5f80bEc0fb984dC8657" | "0x629D32Bedfe4fa8C8dfA3Da45Ef2480870BF84c1" | "0x2b69fe0e1944398094900BA6260148f526Db6f60" | "0xF365F9bFE959C8f3251A3d5426a0Fa091E8Cc61D" | "0xb2468e9B5fD8856699C81BAc9BF4eDBA4B6bd9A9" | "0x5eaeB4E56D750D5AA1C313bE59C3a5a082Ee6fe5" | "0x778175D18084085a672522ec2B13a7765385cC55" | "0xa65Af9db4F3E92E75b92eDa4392171C23F3BA359" | "0x08ff20673A086c26bA4bba0dDb7BcC7bD38765bb" | "0xD63A5A57A3223976b8d7C52123dbb0F1EdE8c708" | "0x1569d719f41cE892d365b6a21D12E5980670AADA" | "0xed3B8039Bf94914e3E5cdC437f1E1c3386c231c2" | "0x857d1e6EC8c7dC57f9949f2e861a145069790c8E" | "0x476caAf62195BacCcCCbf5c4c9b1558EB6a1D437" | "0x814ECE214aD9e55A6B38056AE4758248B02E1440" | "0xF5aEc523c65310721b03A5af4C24a0b887110a61" | "0x04511963D497135275De7ce6651C413C2907EA7e" | "0xf39b0c07D0957f0aa6AdD665c34c942Ac693D84c" | "0xF12D17830190e8D97007a12873eF8dC562f0d1E1" | "0x8B5216933ac3026C9DaCc18D3456427448952a2C" | "0x1c509Ac0294d8DC6c20c691b43d8cb30b356eE87" | "0xA5b308a3d2627c24e5a78D687cA9c3AECC0F4A77" | "0xd00c523222D7D88D3FcdffbD5cA504f476984a1A" | "0x91D8b32C79c14d48794d599B86E39460C3Cd3F2e" | "0xfF206d94eA5c1440f5Ab852a14BBcBcecDCcD076" | "0x7Cd221c9190F3b5c979e24e9c85D45A2d28761af" | "0x10187EF28299Ce5fD01d0304F27E1b5B70Bf10D5" | "0x5De9A3Ee14B140B27bB31b17Dce47eC1aD8cbED9" | "0xaF2F9318fF703374a720d4847F96d47bA4f965e6" | "0xce38aa12cE9d026fb72970B752E7693FAAD96744" | "0x7150BA4ac053B023275780baf01887079d98f873" | "0x8eAa62c10c32e7565Bd7a0706ca91a0a2432aB7F" | "0x6A4629eb338AE89B92892aFcF3531c9509b1D2E7" | "0xcDFcE88AeAEa290DE2c8164Eb24041c4e4D23Bad" | "0xe72040F742BAc54A71Dd44Ea897BEB2eC8F5e419" | "0x529300923416c4332f77C74e14742F528a9Ec7d2" | "0x10A42F077817F58746E2c7f96D58EB367C40f878" | "0x81D93f6cFF60A13AC578410961d974Fb3A302722" | "0xdb880869d0D9edFB53A2E65471dcfc9720B2908c" | "0xC2bA9bc9e14521cF59FAed0a8a44975b58656ddD" | "0xFEE3B777143FF2ae91709Aee29935Afd9c5a561D" | "0xFDbF775ef0D0e59AD86eb4d0D96Ccf25e12748Dd" | "0x434Affe5cd2d7dfB58dF190bB4CBEADCf9D26199" | "0xb52eB13eA5EA79eAE8A1d2CE4b163778960f6f6a" | "0xa486Ece68219095a3412de978F92176C27E59A40" | "0x9dFE7aF6Bf6209c0CEFC4Dc70edEfDF47b3a22Bc" | "0x4E4b9BafE87E35a51aB3B4b46b4f4E073C1382dF" | "0xB92a3Ed43515339942f95e75b2f286Ea190619fa" | "0x4aA3c482a41c6005c7669987d061f333E1d8bA85" | "0xBcb20252C29a62dc5C9dDDBd88D8FCb97F1F206A" | "0x249575eEF633dae371Da9a7C76A96B114729665E" | "0x94C6cd917D2a1AbF47046c934d4D36AB3239858A" | "0x678fB2c5877fef12B67e983cb8f924b2e23DD4B1" | "0xA79499186f169559653Ad8fD8b1a43a15d1e8C80" | "0xc8748f8976a05F9143e9eEf965F32949c712DeE2" | "0xBCD1a5CEEfcDFd63A3b47a9083CB565faFf3bda8" | "0xC6e9Fd811c8EDD1E28d07d8492004Bc6fAE3592e" | "0xa1b4Dc1cF392D00c20355D66a51f1BE8c7e41455" | "0x6F01fA6c34f402942fC6B025660dE803128BDD34" | "0x94D98B263f3c6CD6e7dd22eD171f6931a6ddcF11" | "0xd629A5523671Ae63F52f99a102486Bf6ec51Ed0A" | "0x621e1c3FEfB71980175AE5EA8A3B7fCbA26E1C08" | "0xae110452fB8a092D24356732bBac0aadcA99B765" | "0x4b3401C82E2127793b2Af5a7d3079145555E83Ac" | "0x7D93b1593d3B28c2017Aa9e7e5728112129d6b82" | "0x7A85e71B2BbD0CD6961d56DaEa5448E123175816" | "0x5A273C42e6754013e6f1B8a893CEFCEccCf4822B" | "0x3e52Ae09CFAfdf18ED7BB66E5985096017d1fcB6" | "0x307c04DD253C097FA0e6f30e1C8d580506F4cEB0" | "0x076eDF8CE27F8facCE5Da93C428c3023cAe99802" | "0x282647a3E86FE2548f626E3D3ebbDd1a570161A1" | "0x058622E2ffbC935301961878EF5F4ea66c7A1239" | "0x657c86f9a5DAD7fFa7a78221e79e9B5BF6E63549" | "0x42cB512A9083838fcb54456B8D54c05b88cc85d1" | "0x785C3d807D8877da99575e5486D24476BCD1c9D9" | "0xA919E8E35FCC4Cbc54040E3861578dEf71C4df9E" | "0x16235FF80E42B2711C00a86FFFcF136629346946" | "0x67e1e85CA86Cc5A239C345D3F8d86D7Ef7EB91A1" | "0xf35E625eEccac07ab543B07b652f2ED59d38F2fe" | "0xb279253408CeB4A1902b785e6d42d9ecAa098619" | "0x85DA6886a653e1e92721BfF73C3e4Eb9Cc1779Bf" | "0x6c170041cc145605c6c744F58abd987826c6Cbfa" | "0xDaDB7b3E030C66B64833C131c7Bb8A992c4d1c14" | "0x84E51fEa26380bB60aaBc90f0974E39f1eE0FC7B" | "0x453BC7E7e956d83DC6E307b1378339F16D0C4732" | "0x0000000000000000000000000000000000000000" | "0xA8512915978A60B2604804d311D9ff181d7b69D0" | "0xe0fd8a3077E2E7594a5b80b1D419789DE0161beF" | "0x46eDF4FA2E63FF4E8233c484538069eB22AD06bF" | "0xe25C11A39Ff84C71dfe47078f08C66431f357119" | "0xDdd625790BfA5C5e2F7A73a62b203cEEfC042d74" | "0x33D6731d5DA33f1F6A4956EF4ce1d12E534E5D0c" | "0xeF3F4e3C1B828D671F2F41eDCA5FF90530c50188" | "0xE09efb90bF27013479CaD7705852f2E43e5f9fC8" | "0x6d5FE7cd0F75Dd1aB8b9e0Da4799F26D261c28Ad" | "0x9102d69826B11c4256c2B2C23799325d2C578868" | "0x005C5117aC3ed65FFa6931FB6f61A254cE5B401F" | "0x3CBd9fC2EA3CB9c5b1B56C52aCA563A69354B56d" | "0x098411EaD3c262FfA9980e9C4cAdC6d047B50cA3" | "0x8F418560B2996dA6853A88B8b41C6253C2B53090" | "0x532Dd7Ed4246ed4aE301725f26217a9DC7029e66" | "0x51363b99E1d6698bC71bdB95941De1f5875aCd33" | "0xB9186462c868A559c7352b424C12312703964a58" | "0x4762A8c5fd61314D25e4f5f1eCC1E75efE45721d" | "0x878C8E7b75E772E104Db6D70d6547B2B2f306a9A" | "0xA7BB3E43CBa4e863e5e6c29E58E0F3Ac90A6Ac17" | "0xd1c6508301B0567e3b8aFC45808704F5c0ea7FEf" | "0x27d16F8373EB8932C558793ccaBd05B2e8D52f5A" | "0x31DFda6f441dEA4CD9D5dA5807Fb0107209780C3" | "0x8347C0E0F6243216a4DF23694991725D91DA1Af2" | "0xC100FE7642005a4b87f1CBE727e6EA70F7356990" | "0x872d3Cfc052aA4267A78fF5ae21138b7742824B2" | "0xeD13BDD978EF64ddb0C94DA86464C20Dd85b4b26" | "0x491d7411577eC1209e5B48251217Fc12F2f5c4B0";
type ExcludeValue<T, V> = T extends V ? never : T;
type ExtractChainIds<T> = T extends {
    [key: string]: infer U;
} ? U extends {
    [key: number]: any;
} ? keyof U : never : never;
type ContractNames = keyof typeof SDK_CONTRACT_ADDRESSES;
type SdkSupportedChainIds = ExtractChainIds<typeof SDK_CONTRACT_ADDRESSES>;
type TokenType = 'ERC20' | 'ERC1155';
type MainnetChain = ExcludeValue<SdkSupportedChainIds, typeof sepolia.id | typeof blastSepolia.id | typeof avalancheFuji.id | typeof cyberTestnet.id>;

type ChainType = {
    readonly id: SdkSupportedChainIds;
    readonly name: 'Ethereum' | 'Base' | 'Blast' | 'Cyber' | 'Degen' | 'Optimism' | 'OptimismSepolia' | 'Arbitrum' | 'Avalanche' | 'Polygon' | 'BNBChain' | 'BNBChainTestnet' | 'Sepolia' | 'Kaia' | 'Ham' | 'BaseSepolia' | 'AvalancheFuji' | 'BlastSepolia' | 'CyberTestnet';
    readonly icon: string;
    readonly color: string;
    readonly openseaSlug?: string;
    readonly isTestnet?: boolean;
    readonly enabled?: boolean;
    readonly chain: chains.Chain;
};
declare const CHAINS: Array<ChainType>;
declare function chainIdToViemChain(chainId: SdkSupportedChainIds): chains.Chain | undefined;
type LowerCaseChainNames = (typeof CHAINS)[number]['name'] extends infer X ? X extends string ? Lowercase<X> : never : never;
declare function chainIdToString(chainId: number): LowerCaseChainNames;
declare function chainStringToId(name: LowerCaseChainNames): 1 | 10 | 11155420 | 42161 | 43114 | 137 | 56 | 97 | 8453 | 84532 | 11155111 | 81457 | 168587773 | 43113 | 666666666 | 111557560 | 8217 | 7560 | 5112;
declare function getChain(chainId: SdkSupportedChainIds): chains.Chain;
type ChainMapType = Record<SdkSupportedChainIds, ChainType>;
declare const CHAIN_MAP: ChainMapType;
declare const CHAIN_NAME_ID_MAP: Record<string, SdkSupportedChainIds>;

type RPCList = {
    readonly id: number;
    readonly rpcs: string[];
};
declare const RPCS: Array<RPCList>;
declare function chainRPCFallbacks(chain: Chain, fetchOptions?: HttpTransportConfig['fetchOptions']): viem.HttpTransport<undefined, false>[];
declare const DEFAULT_RANK_OPTIONS: FallbackTransportConfig;

type ErrorObjectType = {
    message: string;
    reportToBugsnag?: boolean;
};
declare const BOND_ERROR_MESSAGES: Record<BondErrorNames, ErrorObjectType>;
declare const ERC20_ERROR_MESSAGES: Record<ERC20ErrorNames, ErrorObjectType>;
declare const ERC1155_ERROR_MESSAGES: Record<ERC1155ErrorNames, ErrorObjectType>;
declare const LOCKER_ERROR_MESSAGES: Record<LockerErrorNames, ErrorObjectType>;
declare const MERKLE_ERROR_MESSAGES: Record<MerkleErrorNames, ErrorObjectType>;
declare const ZAP_ERROR_MESSAGES: Record<ZapErrorNames, ErrorObjectType>;
declare const CONTRACT_ERROR_MESSAGES: Record<AllContractErrorNames, ErrorObjectType>;

declare const COINGECKO_NETWORK_IDS: {
    readonly 1: "ethereum";
    readonly 10: "optimistic-ethereum";
    readonly 42161: "arbitrum-one";
    readonly 43114: "avalanche";
    readonly 8453: "base";
    readonly 137: "polygon-pos";
    readonly 56: "binance-smart-chain";
    readonly 11155111: "ethereum";
    readonly 81457: "ethereum";
    readonly 168587773: "ethereum";
    readonly 43113: "ethereum";
};
type BaseToken = {
    name: string;
    symbol: string;
    address: `0x${string}`;
    decimals: number;
    image?: string | null;
};
type WrappedToken = {
    image: string;
    tokenAddress: `0x${string}`;
    nativeSymbol: string;
    oneInchSymbol: 'USDT' | 'USDC' | 'USDbC' | 'USDB';
    decimals: number;
};
declare const WRAPPED_NATIVE_TOKENS: Record<SdkSupportedChainIds, WrappedToken>;
declare const TOKENS: Record<SdkSupportedChainIds, Record<`0x${string}`, BaseToken>>;
type TokenChain = keyof typeof TOKENS;
type TokenSymbol = keyof (typeof TOKENS)[TokenChain];

declare function commify(x: number | string): string;
declare function uncommify(str: string): string;
declare function handleScientificNotation(num: number | string): string;
declare function countLeadingZeros(num: number | string): number;
declare function getValueAfterLeadingZeros(num: number): number | undefined;
declare function countDecimals(value: number | string): number;
declare function toFixed(value: number, t: number): number;
declare function wei(num: number | string, decimals?: number): bigint;
declare function toNumber(num: bigint, decimals: number): number;
declare function shortenNumber(num: number | string, prefix?: string): string;
declare function applyDecimals(num: string | number): string;
declare function precisionRound(number: number, precision: number): number;
declare function getSubscriptNumber(params: {
    number: string | number;
    allowedLeadingZeros?: number;
    maxDecimals?: number;
    shorten?: boolean;
    valueLength?: number;
}): string;

declare class Bond {
    protected chainId: SdkSupportedChainIds;
    protected version: Version;
    constructor(chainId: SdkSupportedChainIds, version: Version);
    getCreationFee(): Promise<bigint>;
    getTokensByReserveToken(params: {
        reserveToken: `0x${string}`;
        start?: number;
        end?: number;
    }): Promise<readonly `0x${string}`[]>;
    getTokensByCreator(params: {
        creator: `0x${string}`;
        start?: number;
        end?: number;
    }): Promise<readonly `0x${string}`[]>;
}

declare class Client {
    private static instance?;
    private walletClient?;
    private publicClients;
    constructor();
    private getDefaultProvider;
    isPrivateKey(): boolean;
    connect(provider?: any): Promise<`0x${string}`>;
    private get walletState();
    private set walletState(value);
    change(): Promise<void>;
    disconnect(): void;
    account(): Promise<`0x${string}` | null>;
    getNativeBalance(params?: {
        walletAddress: `0x${string}`;
        chainId: number;
    }): Promise<bigint>;
    _getPublicClient(id: number): PublicClient;
    getWalletClient(): {
        account: viem.Account | undefined;
        batch?: {
            multicall?: boolean | chains.Prettify<viem.MulticallBatchOptions> | undefined;
        } | undefined;
        cacheTime: number;
        ccipRead?: false | {
            request?: (parameters: viem.CcipRequestParameters) => Promise<`0x${string}`>;
        } | undefined;
        chain: Chain | undefined;
        key: string;
        name: string;
        pollingInterval: number;
        request: viem.EIP1193RequestFn<viem.WalletRpcSchema>;
        transport: viem.TransportConfig<string, viem.EIP1193RequestFn> & Record<string, any>;
        type: string;
        uid: string;
        addChain: (args: viem.AddChainParameters) => Promise<void>;
        deployContract: <const abi extends viem.Abi | readonly unknown[], chainOverride extends Chain | undefined>(args: viem.DeployContractParameters<abi, Chain | undefined, viem.Account | undefined, chainOverride>) => Promise<viem.DeployContractReturnType>;
        getAddresses: () => Promise<viem.GetAddressesReturnType>;
        getCallsStatus: (parameters: viem.GetCallsStatusParameters) => Promise<viem.GetCallsStatusReturnType>;
        getCapabilities: <chainId extends number | undefined>(parameters?: viem.GetCapabilitiesParameters<chainId>) => Promise<viem.GetCapabilitiesReturnType<chainId>>;
        getChainId: () => Promise<viem.GetChainIdReturnType>;
        getPermissions: () => Promise<viem.GetPermissionsReturnType>;
        prepareAuthorization: (parameters: viem.PrepareAuthorizationParameters<viem.Account | undefined>) => Promise<viem.PrepareAuthorizationReturnType>;
        prepareTransactionRequest: <const request extends viem.PrepareTransactionRequestRequest<Chain | undefined, chainOverride>, chainOverride extends Chain | undefined = undefined, accountOverride extends viem.Account | viem.Address | undefined = undefined>(args: viem.PrepareTransactionRequestParameters<Chain | undefined, viem.Account | undefined, chainOverride, accountOverride, request>) => Promise<viem.UnionRequiredBy<Extract<viem.UnionOmit<viem.ExtractChainFormatterParameters<viem.DeriveChain<Chain | undefined, chainOverride>, "transactionRequest", viem.TransactionRequest>, "from"> & (viem.DeriveChain<Chain | undefined, chainOverride> extends infer T_14 ? T_14 extends viem.DeriveChain<Chain | undefined, chainOverride> ? T_14 extends Chain ? {
            chain: T_14;
        } : {
            chain?: undefined;
        } : never : never) & (viem.DeriveAccount<viem.Account | undefined, accountOverride> extends infer T_15 ? T_15 extends viem.DeriveAccount<viem.Account | undefined, accountOverride> ? T_15 extends viem.Account ? {
            account: T_15;
            from: viem.Address;
        } : {
            account?: undefined;
            from?: undefined;
        } : never : never), viem.IsNever<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_16 ? T_16 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_16 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_17 ? T_17 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_17 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_18 ? T_18 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_18 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_19 ? T_19 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_19 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_20 ? T_20 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_20 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : viem.ExactPartial<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_21 ? T_21 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_21 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_22 ? T_22 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_22 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_23 ? T_23 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_23 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_24 ? T_24 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_24 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_25 ? T_25 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_25 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)>> & {
            chainId?: number | undefined;
        }, (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "type" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") extends infer T_26 ? T_26 extends (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "type" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") ? T_26 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_26 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">) extends infer T ? { [K in keyof T]: (viem.UnionRequiredBy<Extract<viem.UnionOmit<viem.ExtractChainFormatterParameters<viem.DeriveChain<Chain | undefined, chainOverride>, "transactionRequest", viem.TransactionRequest>, "from"> & (viem.DeriveChain<Chain | undefined, chainOverride> extends infer T_1 ? T_1 extends viem.DeriveChain<Chain | undefined, chainOverride> ? T_1 extends Chain ? {
            chain: T_1;
        } : {
            chain?: undefined;
        } : never : never) & (viem.DeriveAccount<viem.Account | undefined, accountOverride> extends infer T_2 ? T_2 extends viem.DeriveAccount<viem.Account | undefined, accountOverride> ? T_2 extends viem.Account ? {
            account: T_2;
            from: viem.Address;
        } : {
            account?: undefined;
            from?: undefined;
        } : never : never), viem.IsNever<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_3 ? T_3 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_3 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_4 ? T_4 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_4 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_5 ? T_5 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_5 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_6 ? T_6 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_6 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_7 ? T_7 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_7 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : viem.ExactPartial<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_8 ? T_8 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_8 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_9 ? T_9 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_9 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_10 ? T_10 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_10 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_11 ? T_11 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_11 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_12 ? T_12 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_12 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)>> & {
            chainId?: number | undefined;
        }, (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "type" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") extends infer T_13 ? T_13 extends (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "type" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") ? T_13 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_13 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">))[K]; } : never>;
        requestAddresses: () => Promise<viem.RequestAddressesReturnType>;
        requestPermissions: (args: viem.RequestPermissionsParameters) => Promise<viem.RequestPermissionsReturnType>;
        sendCalls: <const calls extends readonly unknown[], chainOverride extends Chain | undefined = undefined>(parameters: viem.SendCallsParameters<Chain | undefined, viem.Account | undefined, chainOverride, calls>) => Promise<{
            capabilities?: {
                [x: string]: any;
            } | undefined;
            id: string;
        }>;
        sendRawTransaction: (args: viem.SendRawTransactionParameters) => Promise<viem.SendRawTransactionReturnType>;
        sendTransaction: <const request extends viem.SendTransactionRequest<Chain | undefined, chainOverride>, chainOverride extends Chain | undefined = undefined>(args: viem.SendTransactionParameters<Chain | undefined, viem.Account | undefined, chainOverride, request>) => Promise<viem.SendTransactionReturnType>;
        showCallsStatus: (parameters: viem.ShowCallsStatusParameters) => Promise<viem.ShowCallsStatusReturnType>;
        signAuthorization: (parameters: viem.SignAuthorizationParameters<viem.Account | undefined>) => Promise<viem.SignAuthorizationReturnType>;
        signMessage: (args: viem.SignMessageParameters<viem.Account | undefined>) => Promise<viem.SignMessageReturnType>;
        signTransaction: <chainOverride extends Chain | undefined, const request extends viem.UnionOmit<viem.ExtractChainFormatterParameters<viem.DeriveChain<Chain | undefined, chainOverride>, "transactionRequest", viem.TransactionRequest>, "from"> = viem.UnionOmit<viem.ExtractChainFormatterParameters<viem.DeriveChain<Chain | undefined, chainOverride>, "transactionRequest", viem.TransactionRequest>, "from">>(args: viem.SignTransactionParameters<Chain | undefined, viem.Account | undefined, chainOverride, request>) => Promise<viem.TransactionSerialized<viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>, (viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends infer T ? T extends viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> ? T extends "eip1559" ? `0x02${string}` : never : never : never) | (viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends infer T_1 ? T_1 extends viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> ? T_1 extends "eip2930" ? `0x01${string}` : never : never : never) | (viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends infer T_2 ? T_2 extends viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> ? T_2 extends "eip4844" ? `0x03${string}` : never : never : never) | (viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends infer T_3 ? T_3 extends viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> ? T_3 extends "eip7702" ? `0x04${string}` : never : never : never) | (viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends infer T_4 ? T_4 extends viem.GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } & (viem.OneOf<{
            maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
        } | {
            maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, viem.FeeValuesEIP1559> & {
            accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
        } & {
            accessList: viem.TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
        }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
            blobs: viem.TransactionSerializableEIP4844["blobs"];
        } | {
            blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
            sidecars: viem.TransactionSerializableEIP4844["sidecars"];
        }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        } | {
            accessList?: viem.AccessList | undefined;
            authorizationList?: viem.SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
        }) & {
            authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> ? T_4 extends "legacy" ? viem.TransactionSerializedLegacy : never : never : never)>>;
        signTypedData: <const typedData extends {
            [x: string]: readonly viem.TypedDataParameter[];
            [x: `string[${string}]`]: undefined;
            [x: `function[${string}]`]: undefined;
            [x: `address[${string}]`]: undefined;
            [x: `uint256[${string}]`]: undefined;
            [x: `uint8[${string}]`]: undefined;
            [x: `bytes32[${string}]`]: undefined;
            [x: `uint160[${string}]`]: undefined;
            [x: `uint16[${string}]`]: undefined;
            [x: `uint128[${string}]`]: undefined;
            [x: `bool[${string}]`]: undefined;
            [x: `uint40[${string}]`]: undefined;
            [x: `int24[${string}]`]: undefined;
            [x: `uint24[${string}]`]: undefined;
            [x: `bytes[${string}]`]: undefined;
            [x: `bytes4[${string}]`]: undefined;
            [x: `uint176[${string}]`]: undefined;
            [x: `bytes1[${string}]`]: undefined;
            [x: `bytes10[${string}]`]: undefined;
            [x: `bytes8[${string}]`]: undefined;
            [x: `bytes2[${string}]`]: undefined;
            [x: `bytes6[${string}]`]: undefined;
            [x: `bytes5[${string}]`]: undefined;
            [x: `bytes3[${string}]`]: undefined;
            [x: `bytes14[${string}]`]: undefined;
            [x: `bytes24[${string}]`]: undefined;
            [x: `bytes7[${string}]`]: undefined;
            [x: `bytes18[${string}]`]: undefined;
            [x: `bytes9[${string}]`]: undefined;
            [x: `bytes12[${string}]`]: undefined;
            [x: `bytes21[${string}]`]: undefined;
            [x: `bytes11[${string}]`]: undefined;
            [x: `bytes13[${string}]`]: undefined;
            [x: `bytes15[${string}]`]: undefined;
            [x: `bytes16[${string}]`]: undefined;
            [x: `bytes17[${string}]`]: undefined;
            [x: `bytes19[${string}]`]: undefined;
            [x: `bytes20[${string}]`]: undefined;
            [x: `bytes22[${string}]`]: undefined;
            [x: `bytes23[${string}]`]: undefined;
            [x: `bytes25[${string}]`]: undefined;
            [x: `bytes26[${string}]`]: undefined;
            [x: `bytes27[${string}]`]: undefined;
            [x: `bytes28[${string}]`]: undefined;
            [x: `bytes29[${string}]`]: undefined;
            [x: `bytes30[${string}]`]: undefined;
            [x: `bytes31[${string}]`]: undefined;
            [x: `int[${string}]`]: undefined;
            [x: `int56[${string}]`]: undefined;
            [x: `int8[${string}]`]: undefined;
            [x: `int32[${string}]`]: undefined;
            [x: `int48[${string}]`]: undefined;
            [x: `int16[${string}]`]: undefined;
            [x: `int40[${string}]`]: undefined;
            [x: `int64[${string}]`]: undefined;
            [x: `int72[${string}]`]: undefined;
            [x: `int80[${string}]`]: undefined;
            [x: `int88[${string}]`]: undefined;
            [x: `int96[${string}]`]: undefined;
            [x: `int104[${string}]`]: undefined;
            [x: `int112[${string}]`]: undefined;
            [x: `int120[${string}]`]: undefined;
            [x: `int128[${string}]`]: undefined;
            [x: `int136[${string}]`]: undefined;
            [x: `int144[${string}]`]: undefined;
            [x: `int152[${string}]`]: undefined;
            [x: `int160[${string}]`]: undefined;
            [x: `int168[${string}]`]: undefined;
            [x: `int176[${string}]`]: undefined;
            [x: `int184[${string}]`]: undefined;
            [x: `int192[${string}]`]: undefined;
            [x: `int200[${string}]`]: undefined;
            [x: `int208[${string}]`]: undefined;
            [x: `int216[${string}]`]: undefined;
            [x: `int224[${string}]`]: undefined;
            [x: `int232[${string}]`]: undefined;
            [x: `int240[${string}]`]: undefined;
            [x: `int248[${string}]`]: undefined;
            [x: `int256[${string}]`]: undefined;
            [x: `uint[${string}]`]: undefined;
            [x: `uint56[${string}]`]: undefined;
            [x: `uint32[${string}]`]: undefined;
            [x: `uint48[${string}]`]: undefined;
            [x: `uint64[${string}]`]: undefined;
            [x: `uint72[${string}]`]: undefined;
            [x: `uint80[${string}]`]: undefined;
            [x: `uint88[${string}]`]: undefined;
            [x: `uint96[${string}]`]: undefined;
            [x: `uint104[${string}]`]: undefined;
            [x: `uint112[${string}]`]: undefined;
            [x: `uint120[${string}]`]: undefined;
            [x: `uint136[${string}]`]: undefined;
            [x: `uint144[${string}]`]: undefined;
            [x: `uint152[${string}]`]: undefined;
            [x: `uint168[${string}]`]: undefined;
            [x: `uint184[${string}]`]: undefined;
            [x: `uint192[${string}]`]: undefined;
            [x: `uint200[${string}]`]: undefined;
            [x: `uint208[${string}]`]: undefined;
            [x: `uint216[${string}]`]: undefined;
            [x: `uint224[${string}]`]: undefined;
            [x: `uint232[${string}]`]: undefined;
            [x: `uint240[${string}]`]: undefined;
            [x: `uint248[${string}]`]: undefined;
            string?: undefined;
            address?: undefined;
            uint256?: undefined;
            uint8?: undefined;
            bytes32?: undefined;
            uint160?: undefined;
            uint16?: undefined;
            uint128?: undefined;
            bool?: undefined;
            uint40?: undefined;
            int24?: undefined;
            uint24?: undefined;
            bytes?: undefined;
            bytes4?: undefined;
            uint176?: undefined;
            bytes1?: undefined;
            bytes10?: undefined;
            bytes8?: undefined;
            bytes2?: undefined;
            bytes6?: undefined;
            bytes5?: undefined;
            bytes3?: undefined;
            bytes14?: undefined;
            bytes24?: undefined;
            bytes7?: undefined;
            bytes18?: undefined;
            bytes9?: undefined;
            bytes12?: undefined;
            bytes21?: undefined;
            bytes11?: undefined;
            bytes13?: undefined;
            bytes15?: undefined;
            bytes16?: undefined;
            bytes17?: undefined;
            bytes19?: undefined;
            bytes20?: undefined;
            bytes22?: undefined;
            bytes23?: undefined;
            bytes25?: undefined;
            bytes26?: undefined;
            bytes27?: undefined;
            bytes28?: undefined;
            bytes29?: undefined;
            bytes30?: undefined;
            bytes31?: undefined;
            int56?: undefined;
            int8?: undefined;
            int32?: undefined;
            int48?: undefined;
            int16?: undefined;
            int40?: undefined;
            int64?: undefined;
            int72?: undefined;
            int80?: undefined;
            int88?: undefined;
            int96?: undefined;
            int104?: undefined;
            int112?: undefined;
            int120?: undefined;
            int128?: undefined;
            int136?: undefined;
            int144?: undefined;
            int152?: undefined;
            int160?: undefined;
            int168?: undefined;
            int176?: undefined;
            int184?: undefined;
            int192?: undefined;
            int200?: undefined;
            int208?: undefined;
            int216?: undefined;
            int224?: undefined;
            int232?: undefined;
            int240?: undefined;
            int248?: undefined;
            int256?: undefined;
            uint56?: undefined;
            uint32?: undefined;
            uint48?: undefined;
            uint64?: undefined;
            uint72?: undefined;
            uint80?: undefined;
            uint88?: undefined;
            uint96?: undefined;
            uint104?: undefined;
            uint112?: undefined;
            uint120?: undefined;
            uint136?: undefined;
            uint144?: undefined;
            uint152?: undefined;
            uint168?: undefined;
            uint184?: undefined;
            uint192?: undefined;
            uint200?: undefined;
            uint208?: undefined;
            uint216?: undefined;
            uint224?: undefined;
            uint232?: undefined;
            uint240?: undefined;
            uint248?: undefined;
        } | {
            [key: string]: unknown;
        }, primaryType extends string>(args: viem.SignTypedDataParameters<typedData, primaryType, viem.Account | undefined>) => Promise<viem.SignTypedDataReturnType>;
        switchChain: (args: viem.SwitchChainParameters) => Promise<void>;
        waitForCallsStatus: (parameters: viem.WaitForCallsStatusParameters) => Promise<viem.WaitForCallsStatusReturnType>;
        watchAsset: (args: viem.WatchAssetParameters) => Promise<viem.WatchAssetReturnType>;
        writeContract: <const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "nonpayable" | "payable">, args_1 extends viem.ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainOverride extends Chain | undefined = undefined>(args: viem.WriteContractParameters<abi, functionName, args_1, Chain | undefined, viem.Account | undefined, chainOverride>) => Promise<viem.WriteContractReturnType>;
        extend: <const client extends {
            [x: string]: unknown;
            account?: undefined;
            batch?: undefined;
            cacheTime?: undefined;
            ccipRead?: undefined;
            chain?: undefined;
            key?: undefined;
            name?: undefined;
            pollingInterval?: undefined;
            request?: undefined;
            transport?: undefined;
            type?: undefined;
            uid?: undefined;
        } & viem.ExactPartial<Pick<viem.PublicActions<viem.Transport, Chain | undefined, viem.Account | undefined>, "getChainId" | "prepareTransactionRequest" | "sendRawTransaction" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<viem.WalletActions<Chain | undefined, viem.Account | undefined>, "sendTransaction" | "writeContract">>>(fn: (client: viem.Client<viem.Transport, Chain | undefined, viem.Account | undefined, viem.WalletRpcSchema, viem.WalletActions<Chain | undefined, viem.Account | undefined>>) => client) => viem.Client<viem.Transport, Chain | undefined, viem.Account | undefined, viem.WalletRpcSchema, { [K in keyof client]: client[K]; } & viem.WalletActions<Chain | undefined, viem.Account | undefined>>;
    } | undefined;
    withPublicClient(publicClient: PublicClient): this;
    withWalletClient(walletClient: WalletClient): this;
    withPrivateKey(privateKey: `0x${string}`): this;
    withAccount(account: `0x${string}`, provider?: any): this;
    withProvider(provider: any): Promise<this>;
}

type IpfsHashUrl = `ipfs://${string}`;
type HttpUrl = `http://${string}` | `https://${string}`;
type MediaUploadParams = {
    pinataApiKey: string;
    media: Blob;
};
type MetadataUploadParams = {
    pinataApiKey: string;
    image: IpfsHashUrl | HttpUrl;
    name: string;
    description?: string;
    external_url?: string;
    attributes?: {
        trait_type: string;
        value: string;
    }[];
    video?: IpfsHashUrl | HttpUrl;
};

type TokenContractReadWriteArgs<A extends Abi, T extends ContractFunctionName<A, 'view' | 'pure'> | ContractFunctionName<A, 'payable' | 'nonpayable'>, R extends ContractFunctionArgs<A, 'view' | 'pure', T> | ContractFunctionArgs<A, 'payable' | 'nonpayable', T>, C extends ContractNames = ContractNames> = (R extends readonly [] ? {} : {
    args: R;
}) & (C extends 'ERC20' | 'ERC1155' ? {
    tokenAddress: `0x${string}`;
    functionName: T;
} : {
    functionName: T;
});
type WriteTransactionCallbacks = {
    debug?: (args: any) => void;
    onAllowanceSignatureRequest?: () => void;
    onAllowanceSigned?: () => void;
    onAllowanceSuccess?: (receipt: TransactionReceipt) => void;
    onSignatureRequest?: () => void;
    onSigned?: (tx: `0x${string}`) => void;
    onSuccess?: (receipt: TransactionReceipt) => void;
    onError?: (error: unknown) => void;
};
type CommonWriteParams = WriteTransactionCallbacks & {
    value?: bigint;
};
type GenericWriteParams<A extends Abi = Abi, T extends ContractFunctionName<A, 'payable' | 'nonpayable'> = ContractFunctionName<A, 'payable' | 'nonpayable'>, R extends ContractFunctionArgs<A, 'payable' | 'nonpayable', T> = ContractFunctionArgs<A, 'payable' | 'nonpayable', T>, C extends ContractNames = ContractNames> = TokenContractReadWriteArgs<A, T, R, C> & CommonWriteParams;
type CurveType = 'LINEAR' | 'EXPONENTIAL' | 'LOGARITHMIC' | 'FLAT';
type TradeType = 'buy' | 'sell';
declare global {
    var mcv2Hardhat: Partial<{
        [K in ContractNames]: Partial<{
            [K in number]: `0x${string}`;
        }>;
    }>;
}

type ReserveToken = {
    address: `0x${string}`;
    decimals: number;
};
type StepData = {
    rangeTo: number;
    price: number;
}[];
type CurveParameter = {
    curveType: CurveType;
    stepCount: number;
    maxSupply: number;
    initialMintingPrice: number;
    finalMintingPrice: number;
    creatorAllocation?: number;
};
type WithCurveData = {
    curveData: CurveParameter;
    stepData?: never;
};
type WithStepData = {
    curveData?: never;
    stepData: StepData;
};
type CreateERC20TokenParams = {
    name: string;
    agentHash: `0x${string}`;
    reserveToken: ReserveToken;
    buyRoyalty?: number;
    sellRoyalty?: number;
} & (WithCurveData | WithStepData);
type CreateERC1155TokenParams = CreateERC20TokenParams & {
    metadataUrl: IpfsHashUrl | HttpUrl;
};
type CreateTokenParams = CreateERC20TokenParams & {
    tokenType: 'ERC20' | 'ERC1155';
    symbol: string;
};
type GenerateStepArgs = CreateTokenParams & {
    curveData: CurveParameter;
};
type BondApprovedParams<T extends TokenType, TT extends TradeType = TradeType> = T extends 'ERC20' ? {
    walletAddress: `0x${string}`;
    amountToSpend: bigint;
    tradeType: TT;
    isZap?: boolean;
} : TT extends 'buy' ? {
    walletAddress: `0x${string}`;
    amountToSpend: bigint;
    tradeType: TT;
    isZap?: boolean;
} : TT extends 'sell' ? {
    walletAddress: `0x${string}`;
    tradeType: TT;
    isZap?: boolean;
} : never;
type BuySellCommonParams = WriteTransactionCallbacks & {
    amount: bigint;
    recipient?: `0x${string}`;
    slippage?: number;
};
type TransferCommonParams = WriteTransactionCallbacks & {
    recipient: `0x${string}`;
    amount: bigint;
};

type TokenHelperConstructorParams = {
    symbolOrAddress: string;
    chainId: SdkSupportedChainIds;
    tokenType: TokenType;
    version: Version;
};
type TokenCreateAirdropParams = {
    title: string;
    wallets: `0x${string}`[];
    amountPerClaim: number;
    startTime?: Date;
    endTime: Date;
    filebaseApiKey: string;
} & WriteTransactionCallbacks;

type CreateAirdropParams = {
    token: `0x${string}`;
    isERC20: boolean;
    amountPerClaim: bigint;
    walletCount: number;
    startTime: number;
    endTime: number;
    merkleRoot: `0x${string}`;
    title: string;
    ipfsCID: string;
};

declare class Airdrop {
    protected chainId: SdkSupportedChainIds;
    protected version: Version;
    constructor(chainId: SdkSupportedChainIds, version: Version);
    getTotalAirdropCount(): Promise<bigint>;
    getAirdropById(airdropId: number): Promise<{
        token: `0x${string}`;
        isERC20: boolean;
        walletCount: number;
        claimCount: number;
        amountPerClaim: bigint;
        startTime: number;
        endTime: number;
        owner: `0x${string}`;
        refundedAt: number;
        merkleRoot: `0x${string}`;
        title: string;
        ipfsCID: string;
    }>;
    getAmountClaimed(airdropId: number): Promise<bigint>;
    getAmountLeft(airdropId: number): Promise<bigint>;
    getAirdropIdsByOwner(params: {
        owner: `0x${string}`;
        start?: number;
        end?: number;
    }): Promise<readonly bigint[]>;
    getAirdropIdsByToken(params: {
        token: `0x${string}`;
        start?: number;
        end?: number;
    }): Promise<readonly bigint[]>;
    getIsClaimed(airdropId: number, account: `0x${string}`): Promise<boolean>;
    getIsWhitelistOnly(airdropId: number): Promise<boolean>;
    getMerkleProof(airdropId: number): Promise<any>;
    getIsWhitelisted(airdropId: number, account: `0x${string}`): Promise<boolean>;
    claimAirdrop(params: {
        airdropId: number;
    } & WriteTransactionCallbacks): Promise<viem.TransactionReceipt | undefined>;
    createAirdrop(params: CreateAirdropParams & WriteTransactionCallbacks): Promise<viem.TransactionReceipt | undefined>;
    cancelAirdrop(params: {
        airdropId: number;
    } & WriteTransactionCallbacks): Promise<viem.TransactionReceipt | undefined>;
}

declare class Ipfs {
    add(apiKey: string, blob: Blob): Promise<string>;
    private isIpfsUrl;
    private isHttpUrl;
    private validateHttpUrl;
    hashToGatewayUrl(hash: string, gateway?: string): string;
    gatewayUrlToHash(url: string): IpfsHashUrl;
    validateIpfsHash(ipfsUrl: string): true;
    upload(params: MediaUploadParams): Promise<string>;
    uploadMetadata(data: MetadataUploadParams): Promise<IpfsHashUrl>;
}

type USDValueOptions = {
    tokenAddress: `0x${string}`;
    tokenDecimals: number;
};
declare class OneInch {
    private chainId;
    private version;
    constructor(chainId: SdkSupportedChainIds, version: Version);
    getUsdRate({ tokenAddress, tokenDecimals }: USDValueOptions): Promise<{
        rate: number;
        stableCoin: {
            address: `0x${string}`;
            symbol: string;
            decimals: bigint;
        };
    } | null>;
}

declare class Token<T extends TokenType> {
    private tokenAddress;
    protected clientHelper: Client;
    protected airdropHelper: Airdrop;
    protected oneinch: OneInch;
    protected ipfsHelper: Ipfs;
    protected symbol?: string;
    protected tokenType: T;
    protected chain: Chain;
    protected version: Version;
    protected chainId: SdkSupportedChainIds;
    constructor(params: TokenHelperConstructorParams);
    protected getConnectedWalletAddress(): Promise<`0x${string}`>;
    protected tokenToApprove(tradeType: TradeType): Promise<`0x${string}`>;
    bondContractApproved(params: BondApprovedParams<T>): Promise<boolean>;
    private contractIsApproved;
    private approveContract;
    private approveBond;
    protected getCreationFee(): Promise<bigint>;
    protected zapAvailable(): Promise<boolean>;
    exists(): Promise<boolean>;
    getReserveToken(): Promise<{
        address: `0x${string}`;
        name: string;
        symbol: string;
        decimals: number;
    }>;
    getReserveTokenAddress(): Promise<`0x${string}`>;
    getTokenAddress(): `0x${string}`;
    getUsdRate(amount?: number): Promise<{
        usdRate: null;
        stableCoin: null;
    } | {
        usdRate: number;
        stableCoin: {
            address: `0x${string}`;
            symbol: string;
            decimals: bigint;
        };
    }>;
    getDetail(): Promise<{
        mintRoyalty: number;
        burnRoyalty: number;
        info: {
            creator: `0x${string}`;
            token: `0x${string}`;
            decimals: number;
            symbol: string;
            name: string;
            createdAt: number;
            currentSupply: bigint;
            maxSupply: bigint;
            priceForNextMint: bigint;
            reserveToken: `0x${string}`;
            reserveDecimals: number;
            reserveSymbol: string;
            reserveName: string;
            reserveBalance: bigint;
        };
        steps: readonly {
            rangeTo: bigint;
            price: bigint;
        }[];
    }>;
    getTokenBond(): Promise<{
        creator: `0x${string}`;
        mintRoyalty: number;
        burnRoyalty: number;
        createdAt: number;
        reserveToken: `0x${string}`;
        reserveBalance: bigint;
    }>;
    getSteps(): Promise<readonly {
        rangeTo: bigint;
        price: bigint;
    }[]>;
    getMaxSupply(): Promise<bigint>;
    getPriceForNextMint(): Promise<bigint>;
    getSellEstimation(amount: bigint): Promise<readonly [bigint, bigint]>;
    getBuyEstimation(amount: bigint): Promise<readonly [bigint, bigint]>;
    protected checkAndPrepareCreateArgs(params: (CreateERC20TokenParams | CreateERC1155TokenParams) & Omit<CommonWriteParams, 'value'>): Promise<{
        args: {
            tokenParams: {
                name: string;
                symbol: string;
                agentHash: `0x${string}`;
                uri?: string;
            };
            bondParams: {
                mintRoyalty: number;
                burnRoyalty: number;
                reserveToken: `0x${string}`;
                maxSupply: bigint;
                stepRanges: bigint[];
                stepPrices: bigint[];
            };
        };
        fee: bigint;
    }>;
    buy(params: BuySellCommonParams & {
        allowanceAmount?: bigint;
    }): Promise<viem.TransactionReceipt | undefined>;
    sell(params: BuySellCommonParams & {
        allowanceAmount?: T extends 'ERC20' ? bigint : never;
    }): Promise<viem.TransactionReceipt | undefined>;
    buyWithZap(params: BuySellCommonParams): Promise<viem.TransactionReceipt | undefined>;
    sellWithZap(params: BuySellCommonParams & {
        allowanceAmount?: T extends 'ERC20' ? bigint : never;
    }): Promise<viem.TransactionReceipt | undefined>;
    transfer(params: TransferCommonParams): Promise<viem.TransactionReceipt | undefined>;
    createAirdrop(params: TokenCreateAirdropParams): Promise<viem.TransactionReceipt | undefined>;
}

declare class ERC1155 extends Token<'ERC1155'> {
    constructor(params: Omit<TokenHelperConstructorParams, 'tokenType'>);
    getBalanceOf(walletAddress: `0x${string}`): Promise<bigint>;
    getBalanceOfBatch(walletAddresses: `0x${string}`[]): Promise<readonly bigint[]>;
    getBondAddress(): Promise<`0x${string}`>;
    getContractURI(): Promise<string>;
    getDecimals(): Promise<number>;
    getIsApprovedForAll(params: {
        owner: `0x${string}`;
        spender: `0x${string}`;
    }): Promise<boolean>;
    getName(): Promise<string>;
    getSupportsInterface(interfaceId: `0x${string}`): Promise<boolean>;
    getSymbol(): Promise<string>;
    getTotalSupply(): Promise<bigint>;
    getMetadataUri(): Promise<string>;
    getImageUri(): Promise<any>;
    create(params: CreateERC1155TokenParams & Omit<CommonWriteParams, 'value'>): Promise<viem.TransactionReceipt | undefined>;
    approve(params: {
        spender: `0x${string}`;
        approved: boolean;
    } & CommonWriteParams): Promise<viem.TransactionReceipt | undefined>;
}

declare class ERC20 extends Token<'ERC20'> {
    constructor(params: Omit<TokenHelperConstructorParams, 'tokenType'>);
    getAllowance(params: {
        owner: `0x${string}`;
        spender: `0x${string}`;
    }): Promise<bigint>;
    getBalanceOf(walletAddress: `0x${string}`): Promise<bigint>;
    getBondAddress(): Promise<`0x${string}`>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getSymbol(): Promise<string>;
    getTotalSupply(): Promise<bigint>;
    approve(params: {
        spender: `0x${string}`;
        amount: bigint;
    } & CommonWriteParams): Promise<viem.TransactionReceipt | undefined>;
    create(params: CreateERC20TokenParams & Omit<CommonWriteParams, 'value'>): Promise<viem.TransactionReceipt | undefined>;
}

type CreateLockUpParams = {
    token: `0x${string}`;
    isERC20: boolean;
    amount: bigint;
    unlockTime: number;
    receiver: `0x${string}`;
    title: string;
};

declare class Lockup {
    protected chainId: SdkSupportedChainIds;
    protected version: Version;
    constructor(chainId: SdkSupportedChainIds, version: Version);
    getTotalLockUpCount(): Promise<bigint>;
    getLockUpIdsByReceiver(params: {
        receiver: `0x${string}`;
        start?: number;
        end?: number;
    }): Promise<readonly bigint[]>;
    getLockUpIdsByToken(params: {
        token: `0x${string}`;
        start?: number;
        end?: number;
    }): Promise<readonly bigint[]>;
    getLockUpById(lockUpId: number): Promise<{
        token: `0x${string}`;
        isERC20: boolean;
        unlockTime: number;
        unlocked: boolean;
        amount: bigint;
        receiver: `0x${string}`;
        title: string;
    }>;
    createLockUp(params: CreateLockUpParams & WriteTransactionCallbacks): Promise<viem.TransactionReceipt | undefined>;
    unlock(params: {
        lockUpId: number;
    } & WriteTransactionCallbacks): Promise<viem.TransactionReceipt | undefined>;
}

declare class Utils {
    generateMerkleRoot(wallets: `0x${string}`[]): `0x${string}`;
}

type NetworkReturnType = Omit<Client, '_getPublicClient'> & {
    getPublicClient: () => PublicClient;
    token: (symbolOrAddress: string) => ERC20;
    nft: (symbolOrAddress: string) => ERC1155;
    airdrop: Airdrop;
    lockup: Lockup;
    bond: Bond;
};
declare class BitAgentSDK {
    wallet: Client;
    ipfs: Ipfs;
    utils: Utils;
    network(id: SdkSupportedChainIds | LowerCaseChainNames, version?: Version): NetworkReturnType;
    private withClientHelper;
    withPublicClient(publicClient: PublicClient): BitAgentSDK;
    withWalletClient(walletClient: WalletClient): BitAgentSDK;
}

type AbiType<T extends ContractNames> = T extends 'BOND' ? typeof BOND_ABI : T extends 'ERC20' ? typeof ERC20_ABI : T extends 'ERC1155' ? typeof ERC1155_ABI : T extends 'LOCKER' ? typeof LOCKER_ABI : T extends 'MERKLE' ? typeof MERKLE_ABI : T extends 'ZAP' ? typeof ZAP_ABI : T extends 'ONEINCH' ? typeof ONEINCH_ABI : never;
type SupportedAbiType = typeof BOND_ABI | typeof ERC20_ABI | typeof ERC1155_ABI | typeof LOCKER_ABI | typeof MERKLE_ABI | typeof ZAP_ABI | typeof ONEINCH_ABI;

type GenericLogicConstructorParams<A extends SupportedAbiType = SupportedAbiType, C extends ContractNames = ContractNames, V extends Version = Version> = {
    chainId: SdkSupportedChainIds;
    type: C;
    abi: A;
    version: V;
};
declare class GenericContractLogic<A extends SupportedAbiType = SupportedAbiType, C extends ContractNames = ContractNames, V extends Version = Version> {
    private abi;
    private contractType;
    private chainId;
    private clientHelper;
    private chain;
    private version;
    constructor(params: GenericLogicConstructorParams<A, C, V>);
    read<T extends ContractFunctionName<A, 'view' | 'pure'>, R extends ContractFunctionArgs<A, 'view' | 'pure', T>>(params: TokenContractReadWriteArgs<A, T, R, C>): Promise<ReadContractReturnType<A, T, R>>;
    write<T extends ContractFunctionName<A, 'payable' | 'nonpayable'>, R extends ContractFunctionArgs<A, 'payable' | 'nonpayable', T>>(params: GenericWriteParams<A, T, R, C>): Promise<TransactionReceipt | undefined>;
}

declare global {
    interface Window {
        ethereum: any;
    }
}
declare class GenericContract<T extends ContractNames> {
    private contractType;
    private abi;
    constructor(type: T);
    network(id: SdkSupportedChainIds | LowerCaseChainNames, version: Version): GenericContractLogic<AbiType<T>, T>;
}

declare const bondContract: GenericContract<"BOND">;
declare const erc20Contract: GenericContract<"ERC20">;
declare const erc1155Contract: GenericContract<"ERC1155">;
declare const zapContract: GenericContract<"ZAP">;
declare const airdropContract: GenericContract<"MERKLE">;
declare const lockupContract: GenericContract<"LOCKER">;
declare const oneInchContract: GenericContract<"ONEINCH">;

declare function generateCreateArgs(params: CreateTokenParams & {
    tokenType: 'ERC20' | 'ERC1155';
}): {
    tokenParams: {
        name: string;
        symbol: string;
        agentHash: `0x${string}`;
        uri?: string;
    };
    bondParams: {
        mintRoyalty: number;
        burnRoyalty: number;
        reserveToken: `0x${string}`;
        maxSupply: bigint;
        stepRanges: bigint[];
        stepPrices: bigint[];
    };
};

declare function computeCreate2Address(chainId: number, tokenType: TokenType, tokenSymbol: string, version: Version): `0x${string}`;
declare function createRandomAddress(): `0x${string}`;

declare const enum CurveEnum {
    FLAT = "FLAT",
    LINEAR = "LINEAR",
    EXPONENTIAL = "EXPONENTIAL",
    LOGARITHMIC = "LOGARITHMIC"
}
declare const graphTypes: readonly [CurveEnum.FLAT, CurveEnum.LINEAR, CurveEnum.EXPONENTIAL, CurveEnum.LOGARITHMIC];
declare function formatGraphPoint(value: number, maxDecimalPoints?: number): number;
declare function generateSteps(form: GenerateStepArgs): {
    stepData: {
        rangeTo: number;
        price: number;
    }[];
    mergeCount: number;
};
declare function calculateArea(steps: {
    x: number;
    y: number;
}[], partialIndex?: number): {
    intervalArea: number;
    totalArea: number;
};
type TableData = {
    start: number;
    end: number;
    price: number;
    tvl: number;
};
declare function generateTableData(steps: {
    x: number;
    y: number;
}[]): {
    data: TableData[];
    totalTVL: number;
};

type BondSteps = readonly {
    rangeTo: bigint;
    price: bigint;
}[];
declare function calculateRoyalty(amount: bigint, rate: number): bigint;
declare function binaryReverseMint(params: {
    reserveAmount: bigint;
    bondSteps: BondSteps;
    currentSupply: bigint;
    maxSupply: bigint;
    multiFactor: bigint;
    mintRoyalty: number;
    slippage: number;
}): bigint;
declare function binaryReverseBurn(params: {
    reserveAmount: bigint;
    bondSteps: BondSteps;
    currentSupply: bigint;
    multiFactor: bigint;
    burnRoyalty: number;
    slippage: number;
}): bigint;

declare function truncateString(str: string, length?: number): string;
declare function getSubscriptCharacter(number: number): string;

declare const abis: Record<ContractNames, Abi>;
declare const whitelistedTokens: Record<1 | 10 | 11155420 | 42161 | 43114 | 137 | 56 | 97 | 8453 | 84532 | 11155111 | 81457 | 168587773 | 43113 | 666666666 | 111557560 | 8217 | 7560 | 5112, Record<`0x${string}`, BaseToken>>;
declare const errorMessages: Record<AllContractErrorNames, {
    message: string;
    reportToBugsnag?: boolean;
}>;
declare const supportedChains: readonly ["ethereum", "sepolia", "bnbchain", "polygon", "arbitrum", "optimism", "avalanche", "base", "basesepolia", "kaia", "degen", "ham", "cyber", "cybertestnet"];
declare const supportedChainsMap: Record<LowerCaseChainNames, SdkSupportedChainIds>;

declare const bitagent: BitAgentSDK;

export { BOND_ABI, BOND_ERROR_MESSAGES, type BaseToken, CHAINS, CHAIN_MAP, CHAIN_NAME_ID_MAP, COINGECKO_NETWORK_IDS, CONTRACT_ERROR_MESSAGES, type ChainType, type ContractNames, CurveEnum, DEFAULT_RANK_OPTIONS, ERC1155_ABI, ERC1155_ERROR_MESSAGES, ERC20_ABI, ERC20_ERROR_MESSAGES, LOCKER_ABI, LOCKER_ERROR_MESSAGES, type LowerCaseChainNames, MERKLE_ABI, MERKLE_ERROR_MESSAGES, type MainnetChain, ONEINCH_ABI, type RPCList, RPCS, type SdkSupportedChainIds, TOKENS, type TableData, type TokenChain, type TokenSymbol, type TokenType, type Version, WRAPPED_NATIVE_TOKENS, type WrappedToken, ZAP_ABI, ZAP_ERROR_MESSAGES, abis, airdropContract, applyDecimals, binaryReverseBurn, binaryReverseMint, bitagent, bondContract, calculateArea, calculateRoyalty, chainIdToString, chainIdToViemChain, chainRPCFallbacks, chainStringToId, commify, computeCreate2Address, countDecimals, countLeadingZeros, createRandomAddress, erc1155Contract, erc20Contract, errorMessages, formatGraphPoint, generateCreateArgs, generateSteps, generateTableData, getBitAgentContractAddress, getChain, getSubscriptCharacter, getSubscriptNumber, getValueAfterLeadingZeros, graphTypes, handleScientificNotation, lockupContract, oneInchContract, precisionRound, shortenNumber, supportedChains, supportedChainsMap, toFixed, toNumber, truncateString, uncommify, wei, whitelistedTokens, zapContract };
