import React from "react";
import styles from "./Wallet.module.sass";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

export default function WalletHolder() {
  const theme = useTheme();

  return (
    <>
      <Box
        className={styles.bg}
        sx={{
          bgcolor: "background.walletHolder",
          color: "text.primary",
        }}
      >
        <img src="./ozean_Images/Images/BG.svg" />
        <Box className={styles.text}>
          <Typography
            className={styles.heading}
            sx={{ color: "background.fontClr" }}
          >
            Wallet Holder
          </Typography>
          <Box className={styles.wallet}>
            {/* <img src="./ozean_Images/Icons/Wallet.svg" /> */}
            <AccountBalanceWalletRoundedIcon
              sx={{ color: "background.fontClr" }}
            />
            <Typography sx={{ color: "text.primary" }}>$98001</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
