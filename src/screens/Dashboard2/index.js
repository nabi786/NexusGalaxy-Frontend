import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import styles from "./Dashboard2.module.sass";
import NFTCard from "../../components/NFTCard";
import Navbar from "../../components/Navbar";
import { Grid } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SnackbarContent from "@mui/material/SnackbarContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Dashboard2 = () => {
  const card = [
    {
      img: "ozean_Images/Images/Background (1).png",
    },
    {
      img: "ozean_Images/Images/Background (2).png",
    },
    {
      img: "ozean_Images/Images/Background (3).png",
    },
    {
      img: "ozean_Images/Images/Background (4).png",
    },
    {
      img: "ozean_Images/Images/Background (5).png",
    },
    {
      img: "ozean_Images/Images/Background (6).png",
    },
  ];

  const theme = useTheme();

  const [dispSnakbr, setdispSnakbr] = useState("block");

  const handleSnakbar = () => {
    setdispSnakbr("none");
  };

  const action = (
    // <Button
    //   size="small"
    //   variant="text"
    //   onClick={handleSnakbar}
    //   sx={{ m: "0px", p: "0px" }}
    //   endIcon={
    //     <CloseIcon
    //       sx={{ color: theme.palette.mode === "light" ? "#fff" : "#04131c" }}
    //       onClick={handleSnakbar}
    //     />
    //   }
    // />
    <IconButton aria-label="close" sx={{ fontSize: "10px" }}>
      <CloseIcon
        sx={{
          color: theme.palette.mode === "light" ? "#fff" : "#04131c",
          fontSize: "18px",
        }}
        onClick={handleSnakbar}
      />
    </IconButton>
  );

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.snakbarClr",
          color: "text.primary",
          display: `${dispSnakbr}`,
        }}
      >
        <SnackbarContent
          message="Nexus Galaxy is under deveploment phase"
          sx={{ bgcolor: "background.snakbarClr" }}
          action={action}
        />
      </Box>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Navbar />
        <Box
          className={styles.upper}
          sx={{
            bgcolor: "background.finestNft",
            color: "text.primary",
          }}
        >
          <Box className={styles.left}>
            <Typography
              sx={{ color: "text.primary", textAlign: "center" }}
              variant="h5"
            >
              The Most Finest NFTs in the World.
            </Typography>
            <Box className={styles.btnContainer}>
              <Typography variant="body2">NFT are all the hype now</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "background.fontClr",
                  textTransform: "capitalize",
                }}
              >
                Buy now
              </Button>
            </Box>
          </Box>
          {/* className={styles.right} */}
          <Box
            sx={{
              width: { lg: "60%", md: "80%", sm: "100%", xs: "100%" },
              display: "flex",
              flexDirection: "row",
              justifyContent: {
                lg: "space-between",
                md: "space-between",
                sm: "space-between",
                xs: "center",
              },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "background.finestNft",
                color: "text.primary",
              }}
            >
              <NFTCard
                title="Crypto Hero Marc"
                image={"ozean_Images/Images/Background (6).png"}
                style={{ display: "none" }}
              />
            </Box>
            <Box
              sx={{
                display: { lg: "block", md: "block", sm: "block", xs: "none" },
              }}
            >
              <NFTCard
                title="Crypto Hero Marc"
                image={"ozean_Images/Images/Background (2).png"}
                style={{ display: "none" }}
              />
            </Box>
            <Box
              sx={{
                display: { lg: "block", md: "block", sm: "none", xs: "none" },
              }}
            >
              <NFTCard
                title="Crypto Hero Marc"
                image={"ozean_Images/Images/Background (3).png"}
                style={{ display: "none" }}
              />
            </Box>
            {/* <Box className={styles.card}>
              <NFTCard
                title="Crypto Hero Marc"
                image={"ozean_Images/Images/Background (5).png"}
                style={{ display: "none" }}
              />
            </Box> */}
          </Box>
        </Box>
        <Box className={styles.lower}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Explore NFTs
          </Typography>
          <Box className={styles.cardContainer}>
            {card.map((v, i) => {
              return (
                <>
                  <NFTCard title="Crypto Hero Marc" image={v.img} />
                </>
              );
            })}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Dashboard2;
