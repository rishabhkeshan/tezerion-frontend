import { TezosToolkit } from "@taquito/taquito";
import { estimateSwap, findDex, swap, batchify } from "@quipuswap/sdk";

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

  granadaFactories = {
    fa1_2Factory: ["KT1EmfR5bSZN7mWgapE8FZKdbJ3NLjDHGZmd"],
    fa2Factory: ["KT1SZzW5BZ6aLmcK9i3Us36angwFB67HmsYT"],
  };
  constructor() {
    const tezos = new TezosToolkit("https://granadanet.api.tez.ie");
    this.tezos = tezos;
  }

  async getEstimation(amount) {
    const fromAsset = "tez";
    const toAsset = {
      contract: "KT1VKtbg6piYE3GowALFN6P8MFQF3MMZT44j",
      id: 0,
    };
    const dex = await findDex(this.tezos, this.granadaFactories, toAsset);
    console.log("gg", dex);
    const estimatedOutputValue = await estimateSwap(
      this.tezos,
      this.granadaFactories,
      fromAsset,
      toAsset,
      { amount: amount }
    );
    console.log(estimatedOutputValue);
  }

  async swapTokens(amount) {
    try {
      const fromAsset = "tez";
      const toAsset = {
        contract: "KT1RXpLtz22YgX24QQhxKVyKvtKZFaAVtTB9",
        id: 0,
      };
      const inputValue = amount;
      const slippageTolerance = 0.005; // 0.5%

      const swapParams = await swap(
        this.tezos,
        this.factories,
        fromAsset,
        toAsset,
        inputValue,
        slippageTolerance
      );

      const op = await batchify(this.tezos.wallet.batch([]), swapParams).send();

      console.info(op.hash);
      await op.confirmation();
      console.info("Complete");
    } catch (err) {
      console.error(err);
    }
  }
}
