import { ethers } from "ethers";
import { uploadIMGToPinata, uploadJSONTOPinata } from "./PinataAPI";
import React, { useEffect, useState } from "react";
import { getSigner, NexusTokenContract, getChainID } from "./Instances";

// // // // // // // // // / // // // // //
//
//
//       MINT NFT FUNCTION
//
//
// // // // // // // // // / // / // // //

const useMintNFT = async (file, name, desc, externalLink, royality) => {
  try {
    var NexusTokenContractInstance = await NexusTokenContract();
    var signer = await getSigner();
    var chainID = await getChainID();
    console.log("this is chainID", chainID);
    var userAddr = signer._address;
    console.log("this is signer", userAddr);

    var result = await uploadIMGToPinata(file);

    var royality = parseInt(royality) * 100;

    if (result.success == true) {
      var imgURL = result.imgURL;
      var jsonUploaded = await uploadJSONTOPinata(
        imgURL,
        name,
        desc,
        externalLink
      );

      // if token URI Created
      if (jsonUploaded.success == true) {
        var tokenURI = jsonUploaded.tokenURI;

        var tx = await NexusTokenContractInstance.createItem(
          tokenURI,
          royality.toString()
        );

        // event MarketItemCreated(uint256 tokenId, address sender, uint256 timestamp);
        var tokenID = "";

        await NexusTokenContractInstance.on(
          "MarketItemCreated",
          (tokenId, sender, timestamp) => {
            var info = {
              tokenId,
              sender,
              timestamp,
            };

            tokenID = info.tokenId.toString();
          }
        );

        // await new Promise((resolve) => {
        //   return setTimeout(resolve, 20000);
        // });

        // useEffect(() => {
        //   function checkIfWorking() {
        //     console.log("hurry, its working perfectly");
        //   }

        //   checkIfWorking();
        // }, []);
        return {
          success: true,
          tokenID,
          tokenURI,
          imgURL,
          userAddr,
          chainID,
        };
      }
    }
  } catch (err) {
    console.log("this is err", err);
    return { success: false };
  }
};

export { useMintNFT };
