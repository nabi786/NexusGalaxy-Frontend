import Web3Modal from "web3modal";
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
});

let signer;
let chainID;
let provider;
let web3Provider;

const nexusTokenABI = require("./ABIs/NexusToken.json");
const nexusTokenAddr = process.env.REACT_APP_NEXUSGALAXYADDR;

// // // // // // // // // / // // // // //
//
//
//       Wallet Connect
//
//
// // // // // // // // // / // / // // //
// function to Connect Wallet
const ConnectWalelt = () => {
  const connect = async () => {
    try {
      web3Provider = await web3Modal.connect();
      provider = new ethers.providers.Web3Provider(web3Provider);
      var accounts = await provider.listAccounts();
      accounts = accounts[0];
      const network = await provider.getNetwork();
      chainID = network.chainId;
      signer = provider.getSigner(accounts);

      console.log("this account", signer);
      // console.log("this account");

      return { success: true, network: network.chainId, accounts };
    } catch (err) {
      console.log("this is an Error", err);
      return { success: false };
    }
  };

  return { connect };
};

// // // // // // // // // / // // // // //
//
//
//       Signer function
//
//
// // // // // // // // // / // / // // //

const getSigner = () => {
  return signer;
};
const getChainID = () => {
  return chainID;
};

// // // // // // // // // / // // // // //
//
//
//       lOGOUT
//
//
// // // // // // // // // / // / // // //

const logoutWeb3Modal = async () => {
  try {
    // console.log('y')
    console.log("you want to logout the dapp", provider);
    await web3Modal.clearCachedProvider();
    await provider.close();
    provider = null;
    signer = null;
  } catch (err) {
    console.log("this is an err", err);
  }
};

// // // // // // // // // / // // // // //
//
//
//       NEXUS CONTRACT
//
//
// // // // // // // // // / // / // // //
const NexusTokenContract = async () => {
  try {
    console.log(nexusTokenAddr);
    var nexusTokenInstance = new ethers.Contract(
      nexusTokenAddr,
      nexusTokenABI,
      signer
    );

    return nexusTokenInstance;
  } catch (err) {
    console.log("this is an Error", err);
  }
};

// exporting functions
export {
  ConnectWalelt,
  getSigner,
  NexusTokenContract,
  getChainID,
  logoutWeb3Modal,
};
