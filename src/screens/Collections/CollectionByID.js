import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import styles from "../Profile/Profile.module.sass";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import bgImage from "../Profile/bg.jpg";
import avatarman from "../Profile/avatarMen.png";
import EditIcon from "@mui/icons-material/Edit";
import { dashUserDataAction } from "../../Redux/actions";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import NFTimg from "./NFTImg.avif";
import NFTbg from "./bgNFT.avif";
import { getSingleCollectionAction } from "../../Redux/actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
      </div>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CollectionByID = () => {
  let { id } = useParams();

  console.log("ThisIsParamID", id);

  let dispatch = useDispatch();
  const theme = useTheme();

  const [profileDataState, setProfileDataState] = useState("test");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   useEffect(() => {
  //     if (ProfileData) {
  //       setProfileDataState(ProfileData);
  //     }
  //   });

  //   useEffect(() => {
  //     dispatch(dashUserDataAction());
  //   }, []);

  //   const ProfileData = useSelector((state) => state.dashUserDataReducer.users);
  const ProfileData = "";

  console.log("this is profile dataProfileScrren", ProfileData);

  const useStyles = makeStyles({
    btn: {
      "&:hover": {
        backgroundColor: "#232121",
      },
    },
  });

  const classes = useStyles();

  let navigate = useNavigate();

  const singleCollectionResponse = useSelector(
    (state) => state.singleCollectionReducer.users
  );

  useEffect(() => {
    dispatch(getSingleCollectionAction(id));
  }, []);

  console.log("ThisIsSingleCollectionResByID", singleCollectionResponse);
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />

      <Box
        className={styles.profileContainerWrapper}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Box
          className={styles.profileContainer}
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Box className={styles.bioDataWrapper}>
            <Box
              sx={{
                width: "100%",
                height: "200px",
                backgroundImage:
                  profileDataState === "test"
                    ? `url(${singleCollectionResponse?.data?.background?.url})`
                    : `url(${NFTbg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "18px",
              }}
            ></Box>
            <Box
              sx={{
                width: "180px",
                height: "180px",
                backgroundImage:
                  profileDataState === "test"
                    ? `url(${singleCollectionResponse?.data?.avatar?.url})`
                    : `url(${NFTimg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "start",
                border: `5px solid ${theme.palette.background.fontClr}`,
                borderRadius: "50%",
                margin: "-90px auto 1.2rem",
              }}
            ></Box>
            <Box className={styles.bioDataInfoWrapper}>
              <Typography className={styles.nameText}>
                {profileDataState === "test"
                  ? singleCollectionResponse?.data?.name
                  : "asdsad@_39-89"}
              </Typography>

              <Typography variant="body2" className={styles.descriptionText}>
                {profileDataState === "test"
                  ? singleCollectionResponse?.data?.owner?.address
                  : "0x...jkbcv90"}
              </Typography>

              <Typography className={styles.descriptionText}>
                {profileDataState === "test"
                  ? singleCollectionResponse?.data?.description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu mi, cursus sed ante et, eleifend feugiat diam. Maecenas viverra lectus id odio laoreet, sit amet rhoncus magna volutpat."}
              </Typography>
            </Box>
          </Box>
          {/* <Box className={styles.nftsByCategoriesWrapper}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                sx={{ "& button": { textTransform: "capitalize" } }}
                indicatorColor="inherit"
                textColor="inherit"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
              >
                <Tab label="Collected" {...a11yProps(0)} />
                <Tab label="Created" {...a11yProps(1)} />
                <Tab label="On Sale" {...a11yProps(2)} />
                <Tab label="Offers" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box className={styles.cardContainer}>
                {cardData &&
                  cardData.map((v, i) => {
                    return <NFTCard image={v.img} title={v.title} id={v.id} />;
                  })}
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Create
            </TabPanel>
            <TabPanel value={value} index={2}>
              On Sale
            </TabPanel>
            <TabPanel value={value} index={3}>
              Offers
            </TabPanel>
          </Box> */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default CollectionByID;
