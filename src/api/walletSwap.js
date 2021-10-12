import { TezosToolkit } from "@taquito/taquito";
import { estimateSwap, findDex } from "@quipuswap/sdk";

export class WalletSwap {
  factories = {
    fa1_2Factory: [
      "KT1FWHLMk5tHbwuSsp31S4Jum4dTVmkXpfJw",
      "KT1Lw8hCoaBrHeTeMXbqHPG4sS4K1xn7yKcD",
    ],
    fa2Factory: [
      "KT1PvEyN1xCFCgorN92QCfYjw3axS6jawCiJ",
      "KT1SwH9P1Tx8a58Mm6qBExQFTcy2rwZyZiXS",
    ],
  };
  constructor() {
    const tezos = new TezosToolkit("https://mainnet-node.madfish.solutions");
    this.tezos = tezos;
  }

  async getEstimation(amount) {
    const fromAsset = "tez";
    const toAsset = {
      contract: "KT1RsfuBee5o7GtYrdB7bzQ1M6oVgyBnxY4S",
      id: 0,
    };
    const dex = await findDex(this.tezos, this.factories, toAsset);
    console.log("gg", dex);
    // const estimatedOutputValue = await estimateSwap(
    //   this.tezos,
    //   this.factories,
    //   fromAsset,
    //   toAsset,
    //   { amount: amount }
    // );
    // console.log(estimatedOutputValue);
  }
}
