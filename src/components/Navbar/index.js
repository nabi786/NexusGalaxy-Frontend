import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.sass";
import Sidebar from "../Sidebar";
import Sidebar2 from "../Sidebar2";
import { FaBars } from "react-icons/fa";
// _____________________________________
import { Avatar, Box } from "@mui/material";
import Box2 from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, IconButton } from "@mui/material";
import List from "@mui/material/List";
import List2 from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItem2 from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import logo from "./Ef_Logo2.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "../../App.css";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Redux/actions";
import MenuIcon from "@mui/icons-material/Menu";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../walletweb3/connectors";
import { ethers } from "ethers";
import { ConnectWalelt } from "../../blockchain/Instances";
import { saveWalletAddressAction } from "../../Redux/actions";
import loginReducer from "../../Redux/reducers/loginReducer";
import { dashUserDataAction } from "../../Redux/actions";
import Tooltip from "@mui/material/Tooltip";
import LogoDark from "./LogoForBlackNavbar.png";
import LogoWhite from "./LogoForWhiteNavbar.png";

export default function Navbar(props) {
  const theme = useTheme();

  const [connectedAccount, setConnectedAccount] = useState("");
  const [CheckProfileDropDown, setProfileDropDown] = useState(false);

  console.log("WalletAddressFetched", connectedAccount);

  const ProfileData = useSelector((state) => state.dashUserDataReducer.users);

  const connectWeb3Wallet = async () => {
    try {
      var result = await ConnectWalelt();
      console.log("this is result", result);
      if (result.success == true) {
        setConnectedAccount();
        setProfileDropDown(true);
        let formData = new FormData();
        let name = "B219zhuakewb";
        if (connectedAccount === ProfileData?.address) {
          formData.append("address", result.accounts);
        } else {
          formData.append("address", result.accounts);
          formData.append("firstName", name);
          formData.append("lastName", "");
          formData.append("description", "");
          formData.append("avatar", "");
          formData.append("background", "");
          formData.append("twitter", "");
          formData.append("facebook", "");
          formData.append("instagram", "");
        }
        dispatch(loginAction(formData));
        dispatch(saveWalletAddressAction(result.accounts));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle ChainID
  window.ethereum.on("accountsChanged", function (accounts) {
    connectWeb3Wallet();
  });

  // detect Network change
  window.ethereum.on("chainChanged", function (networkId) {
    connectWeb3Wallet();
  });

  const disconnectWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setConnectedAccount("");
    setProfileDropDown(false);
  };

  useEffect(() => {
    dispatch(dashUserDataAction());
    connectWeb3Wallet();
    // let formData1 = new FormData();
    // formData1.append("address", ProfileData?.address);
    // dispatch(loginAction({ address: connectedAccount }));
  }, []);

  var inputStyles = {
    // border: '1px solid #cbcbcb',
    color: "darkGray",
  };

  var placeholderStyles = {
    ...inputStyles,
    color: "#999999",
  };

  console.log("ThemeCheck", theme);

  let navigate = useNavigate();

  // ______________________________
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const toggleDrawer2 = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    if (anchor == "left") {
      return (
        <Box
          sx={{
            width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
            backgroundColor: "background.sideBr",
          }}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {["Inbox"].map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} /> */}
                <Sidebar
                  closeBtnClickHandler={() => {
                    setState({ ...state, left: false });
                  }}
                />
              </ListItem>
            ))}
          </List>
          {/* <Divider /> */}
          {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
        </Box>
      );
    }
    if (anchor == "right") {
      return (
        <Box2
          sx={{
            width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
            backgroundColor: "#010613",
          }}
          role="presentation"
        >
          <List2>
            {["Inbox"].map((text, index) => (
              <ListItem2 button key={text}>
                {/* <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
        <ListItemText primary={text} /> */}
                <Sidebar2 />
              </ListItem2>
            ))}
          </List2>
          {/* <Divider /> */}
          {/* <List>
    {["All mail", "Trash", "Spam"].map((text, index) => (
      <ListItem button key={text}>
      <ListItemIcon>
      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
      </ListItemIcon>
      <ListItemText primary={text} />
      </ListItem>
      ))}
    </List> */}
        </Box2>
      );
    }
  };

  // ______________________________
  const [sidebar, setsidebar] = useState(false);
  const [IsActive, setIsActive] = useState(false);
  // handler = () => {
  //   setIsActive(!IsActive);
  // };

  // {
  //   "walletAddress" : "23123123123123123126",
  //   "name" : "NabiBaksh",
  //   "email" : "nabibux2@gmail.com",
  //   "phone" : "03423597786"
  // }

  const handleToggle = () => {
    setIsActive(!IsActive);
  };

  const handleClick = () => {
    setToggleButton(true);
  };

  const body = {
    userName: "Baksh007",
    walletAddress: "0xD420Ad0062D763068203d194A4cE06De7673f3CK",
    description: "",
    twitter: "",
    facebook: "",
    instagram: "",
  };

  let formData = new FormData();
  formData.append("userName", "Baksh007");
  formData.append(
    "walletAddress",
    "0xD420Ad0062D763068203d194A4cE06De7673f3CF"
  );
  // formData.append(body)
  // formData.append()

  const handleApi = () => {
    profileHit(formData);

    // setTimeout(() => {
    //   navigate('/profile');
    // }, 2000);
  };

  const stylingModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.finestNft",
    border: `1px solid ${theme.palette.background.fontClr}`,
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const useStyles = makeStyles({
    button: {
      "&:hover": {
        backgroundColor: "#232121",
        border: "none",
      },
    },
  });

  let dispatch = useDispatch();

  console.log("thisIsProfileRes", ProfileData);

  const [toggleButton, setToggleButton] = useState(true);

  console.log("CheckButtonStatus", toggleButton);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  const handleModalClick = () => {
    connect();
    setTimeout(() => {
      getAccount();
    }, 1000);

    setToggleButton(false);
    handleClose();
  };

  return (
    <>
      <Box
        className={styles.bg}
        sx={{
          bgcolor: "background.navbrclr",
          color: "text.primary",
          boxShadow: "0 4px 10px -2px gray",
        }}
      >
        {/* sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'start'
          }} */}
        <Box>
          {/* <Box>
                  <img src={logo} width='10%' />
              </Box> */}
          <Box>
            <Typography variant="h6" className={styles.heading}>
              {theme.palette.mode === "dark" ? (
                <img src={LogoDark} width="270px" />
              ) : (
                <img src={LogoWhite} width="270px" />
              )}
              <MenuIcon
                onClick={toggleDrawer("left", true)}
                className={styles.ham}
                sx={{
                  color: "background.fontClr",
                }}
              />
            </Typography>
          </Box>
        </Box>
        <Box className={styles.navAside}>
          <Box
            className={styles.search}
            sx={{
              bgcolor: "background.navbrclrIcon",
            }}
          >
            <input
              placeholder="Search Item, collections and accounts"
              type="text"
              style={inputStyles}
              id="inputID"
            />
            {/* <img
              src="./ozean_Images/Icons/Search_Icon.svg"
              alt="cant load image"
            /> */}
            <IconButton>
              <SearchIcon sx={{ color: "background.fontClr" }} />
            </IconButton>
          </Box>
          <Box className={styles.icons}>
            <Tooltip title="Collections">
              <Box
                className={styles.icon}
                sx={{
                  bgcolor: "background.navbrclrIcon",
                }}
                onClick={() => navigate("/Collections")}
              >
                <IconButton aria-label="activity">
                  <LocalActivityIcon sx={{ color: "background.fontClr" }} />
                </IconButton>
              </Box>
            </Tooltip>
            <Box
              className={styles.icon}
              sx={{
                bgcolor: "background.navbrclrIcon",
              }}
            >
              <IconButton aria-label="notification">
                <NotificationsActiveRoundedIcon
                  sx={{ color: "background.fontClr" }}
                />
              </IconButton>
            </Box>
            {/* <Box className={styles.icon}>
              <img src="No _ Circle _ 64px@4x.png" alt="cant load image" />
            </Box> */}
            {/* <Box className={styles.icon}> */}
            {CheckProfileDropDown ? (
              <Box
                className={styles.dropdown}
                sx={{
                  // bgcolor: 'background.finestNft',
                  color: "text.primary",
                }}
              >
                <Avatar
                  alt="Avatar"
                  src={ProfileData?.avatar?.url}
                  className={styles.avatar}
                  onClick={handleToggle}
                />

                {/* <img
                  onClick={handleToggle}
                  src={ProfileData?.avatar?.url}
                  className={styles.avatar}
                /> */}

                <Box
                  className={IsActive ? `${styles.links}` : `${styles.hide}`}
                  sx={{
                    bgcolor: "background.finestNft",
                    color: "text.primary",
                    //  boxShadow:'2px 2px 10px 2px'
                  }}
                >
                  {/* <Link
                  to="/profile"
                  className={styles.link}
                  onClick={handleToggle}
                >
                  My Profile
                </Link> */}
                  <Button
                    sx={{ color: "text.primary", textTransform: "capitalize" }}
                    variant="text"
                    onClick={() => {
                      handleToggle();
                      navigate("/profile");
                    }}
                  >
                    My Profile
                  </Button>

                  {/* <Button
                    sx={{ color: "text.primary", textTransform: "capitalize" }}
                    variant="text"
                    onClick={() => {
                      handleToggle();
                      navigate("./profile");
                    }}
                  >
                    Connect Wallet
                  </Button> */}
                  <Button
                    sx={{ color: "text.primary", textTransform: "capitalize" }}
                    variant="text"
                    onClick={() => {
                      handleClick();
                      handleToggle();
                      navigate("/MyCollections");
                    }}
                  >
                    My Collection
                  </Button>

                  <Button
                    sx={{ color: "text.primary", textTransform: "capitalize" }}
                    variant="text"
                    onClick={() => {
                      handleClick();
                      handleToggle();
                      disconnectWeb3Modal();
                      // navigate("/profile");
                    }}
                  >
                    Log Out
                  </Button>

                  {/* <Link to="#" className={styles.link} onClick={()=> {handleToggle();handleApi()}}>
                  Connect Wallet
                </Link>
                <Link to="#" className={styles.link} onClick={handleToggle}>
                  Log Out
                </Link> */}
                </Box>
              </Box>
            ) : (
              <Box
                className={styles.icon}
                sx={{
                  bgcolor: "background.navbrclrIcon",
                }}
              >
                <IconButton
                  aria-label="connect"
                  onClick={() => {
                    // handleOpen();

                    connectWeb3Wallet();
                  }}
                >
                  <AddIcon sx={{ color: "background.fontClr" }} />
                </IconButton>
              </Box>
            )}

            {/* </Box> */}
            <Box className={styles.icon}>
              <img
                onClick={toggleDrawer("right", true)}
                src="./ozean_Images/Icons/Arrow - Left Circle.svg"
                alt="cant load image"
              />
            </Box>
          </Box>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={stylingModal}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box></Box>
              <Box>
                <IconButton aria-label="connect" onClick={handleClose}>
                  <CloseIcon sx={{ color: "background.fontClr" }} />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ mt: "30px", mb: "30px" }}>
              <Box>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    bgcolor: "background.fontClr",
                    textTransform: "capitalize",
                    color: "#ffff",
                    border: "none",
                    width: "100%",
                  }}
                  className={classes.button}
                  onClick={handleModalClick}
                  startIcon={<img src={"./assets/metamask.png"} width="30px" />}
                >
                  MetaMask
                </Button>
              </Box>
              <Box sx={{ mt: "10px" }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    bgcolor: "background.fontClr",
                    textTransform: "capitalize",
                    color: "#ffff",
                    border: "none",
                    width: "100%",
                  }}
                  className={classes.button}
                >
                  MetaMask
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      {/* ________________________ */}
      <Box>
        {["left", "right"].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}
