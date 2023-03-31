import { ethers } from "ethers";
import { uploadIMGToPinata, uploadJSONTOPinata } from "./PinataAPI";
import { getSigner, NexusTokenContract, getChainID } from "./use-Instances";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNftAction } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
// // // // // // // // // / // // // // //
//
//
//       MINT NFT FUNCTION
//
//
// // // // // // // // // / // / // // //

// this is test functions
const MintNFTController = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [tokenID, setTokenID] = useState();

  const mintNFT = async (
    file,
    name,
    desc,
    externalLink,
    royality,
    CollectionID,
    setLoading
  ) => {
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

          await NexusTokenContractInstance.on(
            "MarketItemCreated",
            (tokenId, sender, timestamp) => {
              var info = {
                tokenId,
                sender,
                timestamp,
              };

              var tokenID = info.tokenId.toString();

              let formDataNFT = {
                name: name,
                description: desc,
                externalLink: externalLink,
                tokenAddress: process.env.REACT_APP_NEXUSGALAXYADDR,
                address: userAddr,
                tokenId: tokenID,
                CollectionID: CollectionID,
                tokenUri: tokenURI,
                chainId: chainID,
                royality: parseInt(royality) * 100,
                image: imgURL,
              };

              setTimeout(() => {
                dispatch(createNftAction(formDataNFT));
                setTimeout(() => {
                  setLoading(false);
                  navigate("/profile");
                }, 500);
              }, 1000);
            }
          );
        }
      }
    } catch (err) {
      return { success: false };
    }
  };

  return { mintNFT };
};

export { MintNFTController };
