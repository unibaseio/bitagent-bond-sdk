# BitAgent Bond Contract SDK

## getAmountOut
```js
  const getAmountOut = async (input: TradeArgs) => {
    const publicClient = createPublicClient({
      chain: extractChain({
        chains,
        id: input.chainId as SupportedChainIds,
      }),
      transport: http(),
    });
    const Token = bitagent
      .withPublicClient(publicClient)
      .network(
        input.chainId as SupportedChainIds,
        fixedVersion(input.version) as Version
      )
      .token(input.token, input.creator);
    const tokenData = await Token.getDetail();
    const multiFactor = parseEther('1');
    const amount =
      input.side === 'buy'
        ? binaryReverseMint({
            reserveAmount: wei(input.amount),
            bondSteps: tokenData.steps,
            currentSupply: tokenData.info.currentSupply,
            maxSupply: tokenData.info.maxSupply,
            multiFactor,
            mintRoyalty: tokenData.mintRoyalty,
            slippage: 0,
          })
        : (await Token.getSellEstimation(wei(input.amount)))[0];
    return amount;
  };
```

## getAmountIn
```js
  const getAmountIn = async (input: TradeArgs) => {
    const publicClient = createPublicClient({
      chain: extractChain({
        chains,
        id: input.chainId as SupportedChainIds,
      }),
      transport: http(),
    });
    const Token = bitagent
      .withPublicClient(publicClient)
      .network(
        input.chainId as SupportedChainIds,
        fixedVersion(input.version) as Version
      )
      .token(input.token, input.creator);
    const tokenData = await Token.getDetail();
    const multiFactor = parseEther('1');
    const amount =
      input.side === 'buy'
        ? (await Token.getBuyEstimation(wei(input.amount)))[0]
        : binaryReverseBurn({
            reserveAmount: wei(input.amount),
            bondSteps: tokenData.steps,
            currentSupply: tokenData.info.currentSupply,
            multiFactor,
            burnRoyalty: tokenData.mintRoyalty,
            slippage: 0,
          });
    return amount;
  };
```
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
