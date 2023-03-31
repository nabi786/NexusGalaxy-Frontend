import React, { useEffect, useState } from "react";
import styles from "./ItemDetail.module.sass";
import Layout from "../../components/Layout";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import { style } from "@mui/system";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import NFTCard from "../../components/NFTCard";
import { useTheme } from "@mui/material/styles";
import bgNFT from "./Background (3).png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleNFTAction } from "../../Redux/actions";
import { phpAPiGET } from "../../Redux/actions";
import ScreenLoading from "../../components/Loading/ScreenLoading";
import RelatedCollectionCard from "../../components/RelatedCollectionCard";
import img from "./Background (1).png";
import img1 from "./Background (2).png";
import img2 from "./Background (3).png";
import img3 from "./Background (4).png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TextInputField from "../../components/TextInputField";
import { putNftOnSaleAction } from "../../Redux/actions";
import { sendNftTOSale } from "../../blockchain/use-NftToSale";
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

export default function ItemDetail() {
  let obj = useParams();

  let dispatch = useDispatch();

  console.log("ThisIsParamsObj", obj);
  const [active, setActive] = useState(0);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const navLinks = [
    {
      text: "Desscription",
      // Icon: <BiAperture size={18} />
    },
    {
      text: "Properties",
      // Icon: <BiFootball size={18} />,
    },
    {
      text: "About Us",
      // Icon: <BiMusic size={18} />,
    },
    {
      text: "Details",
      // Icon: <BiGrid size={18} />,
    },
  ];
  const card = [
    {
      img: img,
    },
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
  ];
  const onClickhandler = (index) => () => {
    setActive(index);
  };

  useEffect(() => {
    dispatch(getSingleNFTAction(obj.tokenId, obj.tokenAddress));
    // dispatch(phpAPiGET());
  }, []);

  const getSingleNFTRes = useSelector(
    (state) => state.getSingleNFTReducer.users
  );

  // const PHPGetAPIRes = useSelector((state) => state.phpAPIReducer.users);

  console.log("ThisIsNFTRes", getSingleNFTRes);
  // console.log("ThisIsPHPApiRes", PHPGetAPIRes);

  // const ApiHandleFunc = () => {
  //   PHPGetAPIRes?.project_users &&
  //     PHPGetAPIRes?.project_users?.map((v, i) => {
  //       v &&
  //         v?.map((val, ind) => {
  //           console.log("ThisIsPhpMapData", val);
  //         });
  //     });
  // };
  // const { search: query } = useLocation();
  // const history = useHistory();
  // const activeIndex = parseInt(new URLSearchParams(query).get("index") || 0);

  const Modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: 400, md: 400, sm: 350, xs: 300 },
    bgcolor: "background.default",
    color: "text.primary",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };
  const [newPrice, setNewPrice] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { nftToSale } = sendNftTOSale();
  const hanldeputNftOnSale = async () => {
    var tokenID = obj.tokenId;
    var result = await nftToSale(newPrice, tokenID);
    if (result.success == true) {
      dispatch(putNftOnSaleAction(getSingleNFTRes?.data?._id, newPrice));
    }
  };

  return (
    <>
      {getSingleNFTRes?.data ? (
        <Layout>
          <Box className={styles.upperSection}>
            <Box className={styles.left}>
              <img src={getSingleNFTRes?.data?.image} />
            </Box>
            <Box className={styles.right}>
              <Box className={styles.name}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "background.fontClr",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    {getSingleNFTRes?.data?.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                    }}
                  >
                    <Box>
                      <VisibilityIcon />
                    </Box>
                    <Box sx={{ ml: "7px" }}>0 Views</Box>
                  </Box>
                </Box>
                {/* <Typography sx={{ color: "background.fontClr" }}>
                Crypto Hero Marce
              </Typography> */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    mt: "10px",
                  }}
                >
                  <Box>
                    <Avatar
                      alt="Not Found"
                      src={getSingleNFTRes?.data?.owner?.avatar?.url}
                      sx={{ width: "60px", height: "60px" }}
                    />
                  </Box>
                  <Box sx={{ ml: "10px" }}>
                    <Typography>
                      Owned by{""}{" "}
                      <Box
                        component="span"
                        sx={{ color: "background.fontClr" }}
                      >
                        {getSingleNFTRes?.data?.owner?.firstName}{" "}
                        {getSingleNFTRes?.data?.owner?.lastName}
                      </Box>
                    </Typography>
                    <Box>
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          onClick={() =>
                            window.open("https://www.instagram.com/", "_blank")
                          }
                        >
                          <InstagramIcon />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            window.open("https://www.facebook.com/", "_blank")
                          }
                        >
                          <FacebookIcon />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            window.open("https://twitter.com/", "_blank")
                          }
                        >
                          <TwitterIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
                {/* <Box>
                  <Stack direction="row" spacing={2}>
                    <IconButton>
                      <InstagramIcon />
                    </IconButton>
                    <IconButton>
                      <FacebookIcon />
                    </IconButton>
                    <IconButton>
                      <TwitterIcon />
                    </IconButton>
                  </Stack>
                </Box> */}
              </Box>
              <Box className={styles.price}>
                {/* <Typography sx={{ color: "background.fontClr" }}>
                Current price
              </Typography>
              <Typography sx={{ color: "background.fontClr" }}>
                0.2($697.38)
              </Typography> */}
                <Box className={styles.btnContainer}>
                  <Button
                    className={styles.btn}
                    variant="contained"
                    sx={{
                      backgroundColor: "background.fontClr",
                      textTransform: "capitalize",
                      width: "45%",
                    }}
                    onClick={handleOpenModal}
                  >
                    Sell
                  </Button>
                  <Button
                    className={styles.btn}
                    variant="contained"
                    sx={{
                      backgroundColor: "background.fontClr",
                      textTransform: "capitalize",
                      width: "45%",
                      ml: "10px",
                    }}
                  >
                    Transfer
                  </Button>
                </Box>
                {/* <p>Sale ends February 21, 2022</p> */}
              </Box>
              {/* <Box
              className={styles.reportCard}
              sx={{
                bgcolor: "background.finestNft",
              }}
            >
              <Box className={styles.top}>
                <Box className={styles.average}>
                  <Typography sx={{ color: "text.primary" }}>
                    All Time Average price
                  </Typography>
                  <Typography sx={{ color: "text.primary" }}>0.2556</Typography>
                  <Typography>Last updated 1 hour ago</Typography>
                </Box>
                <Box className={styles.button}>
                  <Button
                    className={styles.btn}
                    variant="contained"
                    sx={{
                      backgroundColor: "background.fontClr",
                      textTransform: "capitalize",
                    }}
                  >
                    View Report
                  </Button>
                </Box>
              </Box>
              <Box className={styles.bottom}>
                <img src="ozean_Images/Images/Graph.png" />
              </Box>
            </Box> */}
            </Box>
          </Box>
          <Box
            className={styles.middleSection}
            sx={{
              color: "text.primary",
            }}
          >
            <Box>
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
                  <Tab label="Desscription" {...a11yProps(0)} />
                  <Tab label="Properties" {...a11yProps(1)} />
                  <Tab label="About Us" {...a11yProps(2)} />
                  <Tab label="Details" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Box className={styles.navContent}>
                  <Typography sx={{ color: "text.primary" }}>
                    {getSingleNFTRes?.data?.description}
                    {/* <Box component="span">
                    <Typography sx={{ color: "background.fontClr" }}>
                      767 Unbroken
                      <br /> 21 OG Rare
                      <br /> 10 Infinity Rare
                      <br /> 3 Cr8zy Rare
                    </Typography>
                  </Box>
                  <br />
                  <br />
                  Created by Trevor Van Meter and pals
                  <br />
                  <Link to="/" className={styles.link}>
                    <Typography sx={{ color: "text.primary" }}>
                      https://www.instagram.com/anmutig_studio
                    </Typography>
                  </Link>
                  <br />
                  <Link to="/" className={styles.link}>
                    <Typography sx={{ color: "text.primary" }}>
                      https://www.instagram.com/anmutig_studio
                    </Typography>
                  </Link> */}
                  </Typography>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                No Property
              </TabPanel>
              <TabPanel value={value} index={2}>
                About us
              </TabPanel>
              <TabPanel value={value} index={3}>
                Details
              </TabPanel>
            </Box>
          </Box>
          <Box className={styles.bottomSection}>
            <Typography
              sx={{ fontSize: "25px", fontWeight: 800, color: "text.primary" }}
            >
              More Collections
            </Typography>
            <Box className={styles.cardContainer}>
              {card.map((v, i) => {
                return (
                  <Box className={styles.cardd}>
                    <RelatedCollectionCard
                      coverImage={v?.img}
                      avatarImage={img}
                      description="This is Collection"
                      heading={`Collection${i}`}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={Modalstyle}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "17px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    Put on sale
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={handleCloseModal}>
                    <CloseIcon
                      sx={{ color: "text.primary", fontWeight: "bold" }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alginItems: "center",
                }}
              >
                <Box>
                  <MonetizationOnIcon
                    sx={{ color: "background.fontClr", fontSize: "80px" }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Instant sale price
                  </Typography>
                  <Typography variant="body2">
                    Enter the price for which the item will be instantly sold
                  </Typography>
                </Box>
              </Box>
              <Box>
                <TextInputField
                  type="number"
                  placeholder="Enter Your Price"
                  value={newPrice}
                  onChangeHandler={(e) => setNewPrice(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alginItems: "center",
                  justifyContent: "space-between",
                  mt: "15px",
                }}
              >
                <Box>
                  <Typography>Service Fee</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>2%</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alginItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography>Price in USD</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${newPrice ? newPrice : 0}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: "20px" }}>
                <Button
                  className={styles.btn}
                  variant="contained"
                  sx={{
                    backgroundColor: "background.fontClr",
                    textTransform: "capitalize",
                    width: "100%",
                    borderRadius: "30px",
                    "&:hover": {
                      backgroundColor: "#69686d",
                    },
                  }}
                  onClick={hanldeputNftOnSale}
                >
                  List
                </Button>
                <Button
                  className={styles.btn}
                  variant="outlined"
                  sx={{
                    mt: "10px",
                    borderColor: "background.fontClr",
                    textTransform: "capitalize",
                    width: "100%",
                    borderRadius: "30px",
                    color: "text.primary",
                    "&:hover": {
                      borderColor: "#69686d",
                    },
                  }}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </Layout>
      ) : (
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            width: "100%",
            height: "100vh",
          }}
        >
          <ScreenLoading />
        </Box>
      )}
    </>
  );
}
