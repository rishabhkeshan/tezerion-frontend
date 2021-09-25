import { TezosToolkit } from "@taquito/taquito";
import { estimateSwap } from "@quipuswap/sdk";

export class WalletSwap {
  factories = {
    fa1_2Factory: "KT1WkKiDSsDttdWrfZgcQ6Z9e3Cp4unHP2CP",
    fa2Factory: "KT1Bps1VtszT2T3Yvxm5PJ6Rx2nk1FykWPdU",
  };
  constructor() {
    const tezos = new TezosToolkit("https://mainnet-node.madfish.solutions");
    this.tezos = tezos;
  }

  async getEstimation(amount) {
    const fromAsset = "tez";
    const toAsset = {
      contract: "KT1RX7AdYr9hFZPQTZw5Fu8KkMwVtobHpTp6",
      id: 0,
    };
    const estimatedOutputValue = await estimateSwap(
      this.tezos,
      this.factories,
      fromAsset,
      toAsset,
      { amount: amount }
    );
    console.log(estimatedOutputValue);
  }
}
