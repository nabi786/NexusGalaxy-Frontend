import React, { useMemo, useRef, useState } from "react";
import { MintNFTController } from "../../blockchain/minNft";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import Layout from "../../components/Layout";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { createNft } from "../../schemas/createNft";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TextInputField from "../../components/TextInputField";
import PreviewImage from "../../components/PreviewImage";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { createNftAction } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import imageBg from "./bg.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMoreRounded } from "@material-ui/icons";
import Slider from "@mui/material/Slider";

const initialValues = {
  name: "",
  description: "",
  externalLink: "",
  tokenAddress: "0xa22D41a5C6C81cF2d20DB8FCE23b44D0Abc5Ee4c",
  address: "0x420cA0aDe0f455870c2B80A4b93E1A7ae90d7b77",
  tokenId: "140",
  selectedCat: "",
  tokenUri: "",
  chainId: "97",
  royality: "",
  image: null,
};

const Createnft = () => {
  const theme = useTheme();
  let dispatch = useDispatch();
  const avatarFileRef = useRef(null);
  let navigate = useNavigate();
  //   const coverImageFileRef = useRef(null);
  // const [image, setImage] = useState("");

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: createNft,
    onSubmit: (values, action) => {
      // action.resetForm();
    },
  });

  const handleSubmitValue = async () => {
    var file = values.image;
    var name = values.name;
    var desc = values.description;
    var result = await MintNFTController(file, name, desc);

    // console.log("ValueAppended", values);
    // let formDataNFT = new FormData();
    // Object.keys(values).map((keys) => {
    //   formDataNFT.append(keys, values[keys]);
    //   console.log("check_KeysCreatNFT", formDataNFT.get(keys));
    // });
    // setTimeout(() => {
    //   dispatch(createNftAction(formDataNFT));
    //   setTimeout(() => {
    //     navigate("/profile");
    //   }, 500);
    // }, 1000);
  };

  const useStyles = makeStyles(() => ({
    formControl: {
      width: "100%",
      "& .MuiInputBase-root:hover": {
        border: "none",
      },
      "& .MuiInputBase-root": {
        color: "#827D9D",
        borderColor: theme.palette.background.fontClr,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "100px",
        width: "100%",
        justifyContent: "center",
      },
      "& .MuiSelect-select.MuiSelect-select": {
        paddingRight: "0px",
      },
    },
    select: {
      width: "100%",
      fontSize: "auto",
      "&:focus": {
        backgroundColor: "transparent",
        borderColor: theme.palette.background.fontClr,
      },
    },
    selectIcon: {
      // position: "relative",
      color: theme.palette.background.fontClr,
      fontSize: "20px",
    },
    paper: {
      borderRadius: 12,
      marginTop: 8,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      "& li": {
        fontWeight: 200,
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: "auto",
      },
      "& li.Mui-selected": {
        width: "100%",
        color: "#fffff",
        backgroundColor: theme.palette.background.fontClr,
      },
      "& li.Mui-selected:hover": {
        backgroundColor: theme.palette.background.fontClr,
      },
    },
  }));

  const classes = useStyles();

  const menuProps = {
    // width: "100%",
    classes: {
      list: classes.list,
      paper: classes.paper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    getContentAnchorEl: null,
  };
  const [sliderVal, setSliderVal] = useState("");

  console.log("SliderValueIs=", sliderVal);

  return (
    <Box>
      <Layout>
        <Box sx={{ m: "20px" }}>
          <Box>
            <Typography
              sx={{
                color: "text.primary",
                fontWeight: 800,
                fontSize: "35px",
                mb: "20px",
              }}
            >
              Create NFT
            </Typography>
          </Box>
          <Box>
            <Box autoComplete="off" sx={{ mt: "20px" }}>
              <Box>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                    mb: "20px",
                    fontSize: "17px",
                  }}
                >
                  Upload File
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "90%" }}>
                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        setFieldValue("image", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <Box
                            {...getRootProps()}
                            sx={{
                              width: "98%",
                              border: `2px dashed ${theme.palette.background.fontClr}`,
                              borderRadius: "12px",
                              p: "20px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              height: "250px",
                            }}
                          >
                            <input {...getInputProps()} />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <InsertPhotoIcon sx={{ fontSize: "90px" }} />
                              <Typography variant="body2">
                                Drop your image here, or{" "}
                                <span
                                  style={{
                                    color: `${theme.palette.background.fontClr}`,
                                  }}
                                >
                                  browse
                                </span>
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#c3c5c9", fontSize: "12px" }}
                              >
                                Supports: JPG, JPEG, PNG
                              </Typography>
                            </Box>
                          </Box>
                        </section>
                      )}
                    </Dropzone>
                  </Box>
                  <Box sx={{ width: "90%" }}>
                    <Box
                      sx={{
                        width: "98%",
                        borderRadius: "12px",
                        height: "253px",
                      }}
                    >
                      {values.image ? (
                        <PreviewImage
                          file={values?.image}
                          alt="avatar_img"
                          style={{
                            borderRadius: "12px",
                            width: "100%",
                            height: "253px",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      ) : (
                        <img
                          src={imageBg}
                          style={{
                            borderRadius: "12px",
                            width: "100%",
                            height: "253px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: "20px" }}>
                <TextInputField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  placeholder="John _doe"
                  errors={errors.name}
                  touched={touched.name}
                />
              </Box>
              {/* <Box>
                <TextInputField
                  label="Price"
                  name="price"
                  value={values.price}
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  placeholder="Price"
                  errors={errors.price}
                  touched={touched.price}
                />
              </Box> */}
              <Box>
                <TextInputField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  placeholder="Description"
                  errors={errors.description}
                  touched={touched.description}
                  rows={7}
                  multiline
                />
              </Box>
              <Box sx={{ mb: "10px" }}>
                <InputLabel
                  sx={{ color: theme.palette.background.fontClr, mb: "10px" }}
                >
                  category
                </InputLabel>
                <FormControl
                  //   sx={{ m: 1, minWidth: 120 }}
                  className={classes.formControl}
                >
                  <Select
                    value={values.selectedCat}
                    name="selectedCat"
                    variant="outlined"
                    onChange={handleChange}
                    displayEmpty
                    MenuProps={menuProps}
                    inputProps={{ "aria-label": "Without label" }}
                    // className={classes.select}
                    classes={{
                      select: classes.select,
                      icon: classes.selectIcon,
                    }}
                    IconComponent={ExpandMoreRounded}
                  >
                    <MenuItem value="" sx={{ color: "white" }}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10} sx={{ color: "white" }}>
                      Arts
                    </MenuItem>
                    <MenuItem value={20} sx={{ color: "white" }}>
                      Fashion
                    </MenuItem>
                    <MenuItem value={30} sx={{ color: "white" }}>
                      Sports
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "100%", mt: "10px" }}>
                <InputLabel
                  sx={{ color: theme.palette.background.fontClr, mb: "10px" }}
                >
                  Royality
                </InputLabel>
                <Slider
                  defaultValue={0}
                  name="royality"
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  max={10}
                  value={values.royality}
                  onChange={handleChange}
                  sx={{
                    color: theme.palette.background.fontClr,
                  }}
                />
              </Box>
              <Box>
                <TextInputField
                  label="External Link"
                  name="externalLink"
                  value={values.externalLink}
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  placeholder="External Link"
                  errors={errors.externalLink}
                  touched={touched.externalLink}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => {
                    handleSubmitValue();
                  }}
                  sx={{
                    backgroundColor: "background.fontClr",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </Box>
  );
};

export default Createnft;
