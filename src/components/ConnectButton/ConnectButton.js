import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { useSnackbar } from "notistack";

const Tezos = new TezosToolkit("https://testnet-tezos.giganode.io");

const ConnectButton = ({}) => {
  const [wallet, setWallet] = useState(new BeaconWallet(options));
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [beaconConnection, setBeaconConnection] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    name: "Tezerion",
    preferredNetwork: "granadanet",
    PERMISSION_REQUEST_SUCCESS: {
      handler: async (data) => {
        console.log("Wallet is connected:", data);
      },
    },
    OPERATION_REQUEST_SENT: {
      handler: async (data) => {
        console.log("Request sent:", data);
      },
    },
    OPERATION_REQUEST_SUCCESS: {
      handler: async (data) => {
        console.log("Request successful:", data);
        enqueueSnackbar("Request successful!");
      },
    },
    OPERATION_REQUEST_ERROR: {
      handler: async (data) => {
        console.log("Request error:", data);
        enqueueSnackbar("Request error!");
      },
    },
  };
  const setup = async (userAddress) => {
    setUserAddress(userAddress);
    // updates balance
    console.log(userAddress);
    const balance = await Tezos.tz.getBalance(userAddress);
    setUserBalance(balance.toNumber());
    console.log(balance.toNumber());
    Tezos.setWalletProvider(wallet);
  };

  const connectWallet = async () => {
    try {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        Tezos.setWalletProvider(wallet);
        setUserAddress(activeAccount.address);
      }
      await wallet.requestPermissions({ network: { type: "granadanet" } });
      // gets user's address
      const userAddress = await wallet.getPKH();
      await setup(userAddress);
      setBeaconConnection(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="buttons" onClick={connectWallet}>
      {userAddress ? userAddress : "Connect Wallet"}
    </div>
  );
};

export default ConnectButton;
