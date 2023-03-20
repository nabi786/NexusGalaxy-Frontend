import { ethers } from "ethers";
import { uploadIMGToPinata, uploadJSONTOPinata } from "./PinataAPI";
import { getSigner, NexusTokenContract } from "./Instances";

// // // // // // // // // / // // // // //
//
//
//       MINT NFT FUNCTION
//
//
// // // // // // // // // / // / // // //
const MintNFTController = async (file, name, desc, externalLink, royality) => {
  try {
    var NexusTokenContractInstance = await NexusTokenContract();
    var signer = await getSigner();
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

        await new Promise((resolve) => {
          return setTimeout(resolve, 15000);
        });
        return { success: true, tokenID, tokenURI, imgURL, userAddr };
      }
    }
  } catch (err) {
    return { success: false };
  }
};

export { MintNFTController };
