import Web3Modal from "web3modal";
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
});

let signer;

const nexusTokenABI = require("./ABIs/NexusToken.json");
const nexusTokenAddr = process.env.REACT_APP_NEXUSGALAXYADDR;

// const projectID = process.env.REACT_APP_PROJECTID;
// const projectSecret = process.env.REACT_APP_PROJECTSECRETKEY;

// // // // // // // // // / // // // // //
//
//
//       Wallet Connect
//
//
// // // // // // // // // / // / // // //
// function to Connect Wallet
const ConnectWalelt = async () => {
  try {
    const web3Provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(web3Provider);
    var accounts = await library.listAccounts();
    accounts = accounts[0];
    const network = await library.getNetwork();
    signer = library.getSigner(accounts);

    // console.log("this account", accounts[0]);
    // console.log("this account");

    return { success: true, network: network.chainId, accounts };
  } catch (err) {
    console.log("this is an Error", err);
    return { success: false };
  }
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

// // // // // // // // // / // // // // //
//
//
//       Contracts Instances
//
//
// // // // // // // // // / // / // // //

const NexusTokenContract = async () => {
  try {
    var nexusTokenInstance = new ethers.Contract(
      nexusTokenAddr,
      nexusTokenABI,
      signer
    );

    console.log("this is contract", nexusTokenInstance);

    return nexusTokenInstance;
  } catch (err) {
    console.log("this is an Error", err);
  }
};

// // // // // // // // // / // // // // //
//
//
//       IPFS INSTANCE
//
//
// // // // // // // // // / // / // // //

// exporting functions
export { ConnectWalelt, getSigner, NexusTokenContract };
