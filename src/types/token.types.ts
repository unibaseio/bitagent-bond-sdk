import { SdkSupportedChainIds, TokenType, Version } from '../exports';
import { WriteTransactionCallbacks } from './transactions.types';

export type TokenHelperConstructorParams = {
  symbolOrAddress: string;
  chainId: SdkSupportedChainIds;
  tokenType: TokenType;
  version: Version
};

export type TokenCreateAirdropParams = {
  title: string;
  wallets: `0x${string}`[];
  amountPerClaim: number;
  startTime?: Date;
  endTime: Date;
  filebaseApiKey: string;
} & WriteTransactionCallbacks;
