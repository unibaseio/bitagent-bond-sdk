import { Address, PublicClient, WalletClient } from 'viem';
import { InvalidClientError } from './errors/sdk.errors';
import { LowerCaseChainNames, SdkSupportedChainIds, Version, chainStringToId } from './exports';
import { Bond } from './helpers/BondHelper';
import { Client } from './helpers/ClientHelper';
import { ERC1155 } from './helpers/ERC1155Helper';
import { ERC20 } from './helpers/ERC20Helper';
import { Ipfs } from './helpers/IpfsHelper';
import { Airdrop } from './helpers/AirdropHelper';
import { Lockup } from './helpers/LockupHelper';
import { Utils } from './helpers/UtilsHelper';

type NetworkReturnType = Omit<Client, '_getPublicClient'> & {
  getPublicClient: () => PublicClient;
  token: (symbolOrAddress: string, creator: Address) => ERC20;
  nft: (symbolOrAddress: string, creator: Address) => ERC1155;
  airdrop: Airdrop;
  lockup: Lockup;
  bond: Bond;
};

export class BitAgentSDK {
  // chain agnostic
  public wallet = new Client();
  public ipfs = new Ipfs();
  public utils = new Utils();

  public network(id: SdkSupportedChainIds | LowerCaseChainNames, version: Version = '0.1.0'): NetworkReturnType {
    let chainId: SdkSupportedChainIds;

    if (typeof id === 'string') {
      chainId = chainStringToId(id);
    } else {
      chainId = id;
    }

    return this.withClientHelper(this.wallet, chainId, version);
  }

  private withClientHelper(clientHelper: Client, chainId: SdkSupportedChainIds, version: Version) {
    return Object.assign(clientHelper, {
      getPublicClient(): PublicClient {
        return clientHelper._getPublicClient(chainId);
      },

      token: (symbolOrAddress: string, creator: Address) => {
        return new ERC20({
          symbolOrAddress,
          chainId,
          version,
          creator,
        });
      },

      nft: (symbolOrAddress: string, creator: Address) => {
        return new ERC1155({
          symbolOrAddress,
          chainId,
          version,
          creator,
        });
      },

      airdrop: new Airdrop(chainId, version),
      lockup: new Lockup(chainId, version),
      bond: new Bond(chainId, version),
    });
  }

  public withPublicClient(publicClient: PublicClient): BitAgentSDK {
    const chainId = publicClient.chain?.id;
    if (chainId === undefined) throw new InvalidClientError();
    this.wallet = this.wallet.withPublicClient(publicClient);
    return this;
  }

  public withWalletClient(walletClient: WalletClient): BitAgentSDK {
    const chainId = walletClient.chain?.id;
    if (chainId === undefined) throw new InvalidClientError();
    if (walletClient.chain?.id === undefined) throw new InvalidClientError();
    this.wallet = this.wallet.withWalletClient(walletClient);
    return this;
  }
}
