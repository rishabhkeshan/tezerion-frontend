import { TezosToolkit } from "@taquito/taquito";
import { estimateSwap, findDex, swap, batchify } from "@quipuswap/sdk";
import { BigNumber } from "bignumber.js";

export class WalletSwap {
  contracts = [
    {
      contract: "KT1VKtbg6piYE3GowALFN6P8MFQF3MMZT44j",
      symbol: "Kolibri",
    },
    {
      symbol: "XTZ",
      contract: "tez",
    },
  ];
  swaps = ["Kolibri", "XTZ"];
  mainNetfactories = {
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

  data = {
    estimation: 0,
    slippage: 0,
    outputDexContract: "",
    hash: "",
    swapped: false,
  };

  constructor() {
    const tezos = new TezosToolkit("https://granadanet.smartpy.io/");
    this.tezos = tezos;
  }

  getTokenContract(symbol) {
    let results = this.contracts.find((contract) => contract.symbol === symbol);
    return { contract: results.contract };
  }

  async getEstimation(amount, contract) {
    console.log(amount);
    const fromAsset = "tez";
    const toAsset = this.getTokenContract(contract);
    const inputValue = amount;
    const estimatedOutputValue = await estimateSwap(
      this.tezos,
      this.granadaFactories,
      fromAsset,
      toAsset,
      { inputValue }
    );
    console.log(estimatedOutputValue);
    let x = new BigNumber(estimatedOutputValue);
    console.log(x.toString());
    this.data.estimation = x.toString();
    this.data.outputDexContract = toAsset.contract;
    return this.data;
  }

  async swapTokens(amount, contract, slippageTolerence) {
    try {
      const fromAsset = "tez";
      const toAsset = this.getTokenContract(contract);
      const inputValue = amount;
      const slippageTolerance = slippageTolerence ?? 0.005; // 0.5%

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
      this.data.hash = op.hash;
      this.data.swapped = true;
      return this.data;
    } catch (err) {
      this.data.swapped = false;
      console.error(err);
      return this.data;
    }
  }
}
