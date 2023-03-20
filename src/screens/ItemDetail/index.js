import React, { useState } from "react";
import styles from "./ItemDetail.module.sass";
import Layout from "../../components/Layout";
import { Box, Typography, Button } from "@mui/material";
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
      img: "ozean_Images/Images/Background (1).png",
    },
    {
      img: "ozean_Images/Images/Background (2).png",
    },
    {
      img: "ozean_Images/Images/Background (3).png",
    },
  ];
  const onClickhandler = (index) => () => {
    setActive(index);
  };
  // const { search: query } = useLocation();
  // const history = useHistory();
  // const activeIndex = parseInt(new URLSearchParams(query).get("index") || 0);
  return (
    <>
      <Layout>
        <Box className={styles.upperSection}>
          <Box className={styles.left}>
            <img src="./ozean_Images/Images/Background (3).png" />
          </Box>
          <Box className={styles.right}>
            <Box className={styles.name}>
              <Typography sx={{ color: "background.fontClr" }}>
                Crypto Hero Marce
              </Typography>
              <Typography sx={{ color: "background.fontClr" }}>
                Crypto Hero Marce
              </Typography>
              <Typography>
                Owned by{""}{" "}
                <Box component="span" sx={{ color: "background.fontClr" }}>
                  Anmutigstudio
                </Box>
              </Typography>
            </Box>
            <Box className={styles.price}>
              <Typography sx={{ color: "background.fontClr" }}>
                Current price
              </Typography>
              <Typography sx={{ color: "background.fontClr" }}>
                0.2($697.38)
              </Typography>
              <Box className={styles.btnContainer}>
                <Button
                  className={styles.btn}
                  variant="contained"
                  sx={{
                    backgroundColor: "background.fontClr",
                    textTransform: "capitalize",
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  className={styles.btn}
                  variant="text"
                  sx={{
                    color: "background.fontClr",
                    textTransform: "capitalize",
                  }}
                >
                  Make Offer
                </Button>
              </Box>
              <p>Sale ends February 21, 2022</p>
            </Box>
            <Box
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
            </Box>
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
                  Now you can swap which image displays as your NFB! Each NFB
                  now includes an original gif, a glitched gif, and
                  PFP(anmutig)! A few other NFBs have even more like the
                  destination gif & Skullrivative gifs!
                  https://www.instagram.com/anmutig_studio
                  <br />
                  <br />
                  First of its kind animated & swappable displayed image NFT
                  series It includes 10,005 randomly generated NFTs that rest in
                  peace on the ETH Blockchain. 59 unique animations (587
                  colorways each)85121 total
                  <br />
                  <br />
                  <Box component="span">
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
                  </Link>
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
            {/* <Slider className={styles.cardContainer} {...settings}> */}
            {card.map((v, i) => {
              return (
                <Box className={styles.cardd}>
                  <NFTCard image={v.img} />
                </Box>
              );
            })}
            {/* </Slider> */}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
