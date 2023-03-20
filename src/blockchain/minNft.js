import { ethers } from "ethers";
import { uploadIMGToPinata } from "./PinataAPI";
import { getSigner, NexusTokenContract } from "./Instances";

// import { create, CID, IPFSHTTPClient } from "ipfs-http-client";

const projectID = process.env.REACT_APP_PROJECTID;
const projectSecret = process.env.REACT_APP_PROJECTSECRETKEY;

// // // // // // // // // / // // // // //
//
//
//       MINT NFT FUNCTION
//
//
// // // // // // // // // / // / // // //
const MintNFTController = async (file, name, description) => {
  var result = await uploadIMGToPinata(file);
};

export { MintNFTController };
