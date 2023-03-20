import React from "react";
import styles from "./Card.module.sass";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function NFTCard({ image, title, id, style }) {
  const theme = useTheme();

  let navigate = useNavigate();

  return (
    <>
      <Box
        className={styles.container}
        sx={{
          bgcolor: "background.finestNft",
          color: "text.primary",
          boxShadow: "0 4px 10px -2px gray",
        }}
      >
        <Box className={styles.img}>
          <img src={image} alt="cant load image" />
        </Box>
        <Box className={styles.lowerCard}>
          <Box className={styles.upper}>
            <Box className={styles.name}>
              <Typography sx={{ color: "background.fontClr" }}>
                {title}
              </Typography>
              <Typography sx={{ color: "text.primary" }}>
                Crypto Hero Marc
              </Typography>
            </Box>
            <Box className={styles.price}>
              <Typography>Price</Typography>
              <Typography sx={{ color: "text.primary" }}>$66567</Typography>
            </Box>
          </Box>
          <Box
            className={styles.buy}
            style={style}
            sx={{ color: "text.primary" }}
          >
            {/* <Link
              to={`/item-details`}
              style={{
                color: 'text.primary',
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Buy Now
            </Link> */}
            <Button
              variant="text"
              onClick={() => navigate("/item-details")}
              size="small"
              sx={{
                color: "text.primary",
                textTransform: "capitalize",
                p: "0px",
                m: "0px",
              }}
            >
              Buy Now
            </Button>
            {/* <button>Buy Now</button> */}
            <Typography>2 days left</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
