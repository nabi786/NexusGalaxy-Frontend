import React from "react";
import styles from "./CollectionCard.module.sass";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CollectionCard = ({ heading, description, avatarImage, coverImage }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        className={styles.collectionCardContainer}
        sx={{
          bgcolor: "background.finestNft",
          color: "text.primary",
          boxShadow: "0 4px 10px -2px gray",
        }}
      >
        <Box className={styles.coverImage}>
          <img src={coverImage} alt="coverimg" />
        </Box>
        <Box className={styles.avatarImage}>
          <img src={avatarImage} alt="avatarimg" />
        </Box>
        <Box className={styles.infoContainer}>
          <Box className={styles.headingContainer}>
            <Typography>{heading}</Typography>
          </Box>
          <Box className={styles.descriptionContainer}>
            <Typography>{description}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CollectionCard;
