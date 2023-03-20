import axios from "axios";
var pinataJWT = process.env.REACT_APP_PINATATOKEN;
const JWT = `Bearer ${pinataJWT}`;

const uploadIMGToPinata = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;  boundary=${formData._boundary}`,
          Authorization: JWT,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export { uploadIMGToPinata };
