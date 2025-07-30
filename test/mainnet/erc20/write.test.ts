import { privateKeyToAccount } from 'viem/accounts';
import { bitagent, toNumber } from '../../../src';
import { wei } from '../../utils';
import { createWalletClient, http } from 'viem';
import { base, cyber, cyberTestnet, mainnet } from 'viem/chains';
import dotenv from 'dotenv';

dotenv.config();

globalThis.window = {};

const wallet = privateKeyToAccount(process.env.PKEY);

const walletClient = createWalletClient({
  transport: http(),
  chain: cyberTestnet,
  account: wallet,
});

// const detail = await bitagent.network('cybertestnet').token('rrr').getDetail();
// console.log({ detail, steps: detail.steps });
// console.log(toNumber(10000000000000000n, 18));

await bitagent
  .withWalletClient(walletClient as any)
  .network('cybertestnet')
  .token('rrr')
  .buyWithZap({
    amount: 1n,
    onSuccess: (data) => {
      console.log(data);
    },
    debug: (args) => {
      console.log(args);
    },
    onError: (error) => {
      console.log(error);
    },
  });

process.exit(0);

// console.log(wei(1, 18));
