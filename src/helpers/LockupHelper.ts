import { lockupContract } from '../contracts';
import { SdkSupportedChainIds, Version } from '../exports';
import { CreateLockUpParams } from '../types/lockup.types';
import { WriteTransactionCallbacks } from '../types/transactions.types';

export class Lockup {
  protected chainId: SdkSupportedChainIds;
  protected version: Version;
  constructor(chainId: SdkSupportedChainIds, version: Version) {
    this.chainId = chainId;
    this.version = version;
  }

  public getTotalLockUpCount() {
    return lockupContract.network(this.chainId, this.version).read({
      functionName: 'lockUpCount',
    });
  }

  public getLockUpIdsByReceiver(params: { receiver: `0x${string}`; start?: number; end?: number }) {
    const { receiver, start = 0, end = 1000 } = params;
    return lockupContract.network(this.chainId, this.version).read({
      functionName: 'getLockUpIdsByReceiver',
      args: [receiver, BigInt(start), BigInt(end)],
    });
  }

  public getLockUpIdsByToken(params: { token: `0x${string}`; start?: number; end?: number }) {
    const { token, start = 0, end = 1000 } = params;
    return lockupContract.network(this.chainId, this.version).read({
      functionName: 'getLockUpIdsByToken',
      args: [token, BigInt(start), BigInt(end)],
    });
  }

  public async getLockUpById(lockUpId: number) {
    const [token, isERC20, unlockTime, unlocked, amount, receiver, title] = await lockupContract
      .network(this.chainId, this.version)
      .read({
        functionName: 'lockUps',
        args: [BigInt(lockUpId)],
      });

    return {
      token,
      isERC20,
      unlockTime,
      unlocked,
      amount,
      receiver,
      title,
    };
  }

  public createLockUp(params: CreateLockUpParams & WriteTransactionCallbacks) {
    const { token, isERC20, amount, unlockTime, receiver, title } = params;

    return lockupContract.network(this.chainId, this.version).write({
      ...params,
      functionName: 'createLockUp',
      args: [token, isERC20, amount, unlockTime, receiver, title],
    });
  }

  public unlock(
    params: {
      lockUpId: number;
    } & WriteTransactionCallbacks,
  ) {
    const { lockUpId } = params;
    return lockupContract.network(this.chainId, this.version).write({
      ...params,
      functionName: 'unlock',
      args: [BigInt(lockUpId)],
    });
  }
}
