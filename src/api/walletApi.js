import axios from "axios";

export class InternalWalletApi {
  tezToolsUrl = "https://api.teztools.io/v1";
  betterCallDevUrl = "https://api.better-call.dev/v1";
  tzktUrl = "https://api.tzkt.io/v1/accounts";
  pairs;
  data = {
    xtzToUsd: 0,
    portfolioValue: 0,
    tokens: [
      {
        symbol: "XTZ",
        balance: 0,
        price: 0,
        usdValue: 0,
        contractAddress: "",
      },
    ],
  };

  constructor(walletId, network) {
    this.walletId = walletId;
    this.network = network;
  }

  async getTezPrice() {
    let res = await axios.get(`${this.tezToolsUrl}/xtz-price`);
    let price = res.data.price;
    console.log(price);
    return price;
  }

  async getTokensPrices() {
    let res = await axios.get(`${this.tezToolsUrl}/prices`);
    let price = res.data.xtzusdValue;
    console.log(price);
    this.data.xtzToUsd = price;
    return res.data.contracts;
  }

  async getWalletBalance() {
    let res = await axios.get(`${this.tzktUrl}/${this.walletId}`);
    let balance = res.data.balance;
    console.log(balance);
    return balance;
  }

  async getWalletTokens() {
    let res = await axios.get(
      `${this.betterCallDevUrl}/account/${this.network}/${this.walletId}/token_balances`
    );
    let balances = res.data.balances;
    this.getTokensPrices().then((tokens) => {
      tokens.forEach((token) => {
        let tokenBalance = balances.find(
          (balance) => balance.contract === token.address
        );
        if (tokenBalance) {
          this.data.tokens.push({
            symbol: token.symbol,
            balance: tokenBalance.balance,
            price: token.currentPrice,
            usdValue: token.currentPrice * tokenBalance.balance,
            contractAddress: token.address,
          });
        }
      });
      console.log("yolo", this.data);
      return this.data;
    });
  }
}
