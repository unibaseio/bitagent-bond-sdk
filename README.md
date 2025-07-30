# BitAgent Bond Contract SDK

## Trade

```js
const Token = bitagent
    .withWalletClient(walletClient)
    .withPublicClient(publicClient)
    .network(
        network as SdkSupportedChainIds,
        fixedVersion(input.version) as Version
    )
    .token(input.token);
const tokenData = await Token.getDetail();

// binaryReverseMint: https://github.com/unibaseio/bitagent-bond-sdk/blob/main/src/utils/trade.ts#L97
const amount =
    input.side === 'buy' ? binaryReverseMint({
            reserveAmount: wei(input.amount),
            bondSteps: tokenData.steps,
            currentSupply: tokenData.info.currentSupply,
            maxSupply: tokenData.info.maxSupply,
            multiFactor: parseEther('1'),
            mintRoyalty: tokenData.mintRoyalty,
            slippage: 0,
          }) : wei(input.amount);
const tradeParams = {
    amount,
    slippage: 0,
    onError: (error: any) => {
        console.error(error);
    },
};
// Buy
await Token.buy(tradeParams);

// Sell
await Token.sell(tradeParams);

```

## Quote

```js
// WBNB --buy--> XTOKEN
// binaryReverseMint: https://github.com/unibaseio/bitagent-bond-sdk/blob/main/src/utils/trade.ts#L97
const tokenData = await Token.getDetail();
const xtokenAmountOut = binaryReverseMint({
  reserveAmount: wei(input.wbnbAmount),
  bondSteps: tokenData.steps,
  currentSupply: tokenData.info.currentSupply,
  maxSupply: tokenData.info.maxSupply,
  multiFactor: parseEther('1'),
  mintRoyalty: tokenData.mintRoyalty,
  slippage: 0,
});

// XTOKEN --sell--> WBNB
const wbnbAmountOut = (await Token.getSellEstimation(wei(input.xtokenAmount)))[0];
```
