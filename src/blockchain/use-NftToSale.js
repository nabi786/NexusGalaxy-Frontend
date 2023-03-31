import React from "react";
import { useSate, useEffect } from "react";
import { ethers } from "ethers";
import { getSigner, NexusTokenContract, getChainID } from "./use-Instances";

// // // // // // // // // // // // // /
//
//
//  send nft to Sale
//
//
// // // // // // // // // // // // // /
const sendNftTOSale = () => {
  const nftToSale = async (price, tokenID) => {
    try {
      var tokenInstance = await NexusTokenContract();

      console.log("this is nft Price", price);
      console.log("this is nft tokenID", tokenID);
      console.log("this is nft tokenInstance", tokenInstance);

      const EtherToWei = ethers.utils.parseUnits(price, "ether").toString();
      console.log("this is price Ether ToWei", EtherToWei);
      tokenInstance.listItem(tokenID, EtherToWei);

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  return { nftToSale };
};

export { sendNftTOSale };
