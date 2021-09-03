import "./Header.scss";
import TezerionLogo from "../../assets/TezerionLogo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const Tezos = new TezosToolkit("https://testnet-tezos.giganode.io");
function Header({ hiddenNav }) {
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
  const [wallet, setWallet] = useState(new BeaconWallet(options));
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [beaconConnection, setBeaconConnection] = useState(null);

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
    <header className={`header z-40 ${"border-b border-dark-200 "}`}>
      <a href="/">
        <div>
          <img
            className={`header_logo`}
            src={TezerionLogo}
            alt="Tezerion logo"
          />
        </div>
      </a>
      {!hiddenNav && (
        <div className="header_navbar">
          { (
            <>
              {" "}
              <div className="header_navbar_text">Swap</div>
              <div className="header_navbar_gap"></div>
            </>
          )}
          {userAddress ? (
            <div className="header_navbar_logoutbutton">
              <div className="header_navbar_logoutbutton_text">
                {" "}
                {`${userAddress.substr(0, 6)}...${userAddress.substr(-4)}`}
              </div>
              <img
                className="header_navbar_logoutbutton_icon"
                onClick={console.log("Hello")}
                src={LogoutIcon}
                alt="logout icon"
              />
            </div>
          ) : (
            <div className="header_navbar_button">
              <div
                onClick={connectWallet}
                className="header_navbar_button_text"
              >
                Connect Wallet
              </div>
            </div>
          )}
        </div>
      )}{" "}
    </header>
  );
}

export default Header;
