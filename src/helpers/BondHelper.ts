import { SdkSupportedChainIds, Version } from '../constants/contracts';
import { bondContract } from '../contracts';

export class Bond {
  protected chainId: SdkSupportedChainIds;
  protected version: Version;
  constructor(chainId: SdkSupportedChainIds, version: Version) {
    this.chainId = chainId;
    this.version = version;
  }

  public getCreationFee() {
    return bondContract.network(this.chainId, this.version).read({
      functionName: 'creationFee',
    });
  }

  public getTokensByReserveToken(params: { reserveToken: `0x${string}`; start?: number; end?: number }) {
    const { reserveToken, start = 0, end = 1000 } = params;
    return bondContract.network(this.chainId, this.version).read({
      functionName: 'getTokensByReserveToken',
      args: [reserveToken, BigInt(start), BigInt(end)],
    });
  }

  public getTokensByCreator(params: { creator: `0x${string}`; start?: number; end?: number }) {
    const { creator, start = 0, end = 1000 } = params;
    return bondContract.network(this.chainId, this.version).read({
      functionName: 'getTokensByCreator',
      args: [creator, BigInt(start), BigInt(end)],
    });
  }
}
