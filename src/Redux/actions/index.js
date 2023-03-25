import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../config";

//---------------Login profile / Create Profile Action start here-----------------

export const loginAction = (formData) => async (dispatch) => {
  axios({
    method: "post",
    url: `${BASE_URL}api/auth/profile/create`,
    // data: {
    //   address: walletadress,
    //   firstName: "",
    //   lastName: "",
    //   description: "",
    //   // avatar: "",
    //   // background: "",
    //   twitter: "",
    //   facebook: "",
    //   instagram: "",
    // },
    data: formData,
  }).then((response) => {
    console.log("resLoginData", response.data.data.token);

    const retrnObj = { type: "loginByAddress", payload: response.data };
    console.log("ObjectReturn", retrnObj);
    dispatch(retrnObj);
    localStorage.setItem("authToken", response.data.data.token);
  });
};

// ---------Login profile / Create Profile  action ends here----------------

// ---------------profileUpdateAction Starts from here-----------------

export const profileUpdateAction = (formData) => async (dispatch) => {
  const accessToken = localStorage?.getItem("authToken");
  console.log("checkUpdateToken", accessToken);
  fetch(`${BASE_URL}api/auth/profile/update`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((Data) => {
      console.log("UpdateProfileResAction", Data);
      const retrnObj = { type: "UpdateProfile", payload: Data };
      console.log("ObjectReturn", retrnObj);
      dispatch(retrnObj);
    });
};

// ---------------profileUpdateAction Ends here-----------------

// -------------Save Wallet Address Action starts here ---------------

export const saveWalletAddressAction = (wallet) => async (dispatch) => {
  let newAddress = wallet.toLowerCase();
  const retrnObj = { type: "SaveWallet", payload: newAddress };
  console.log("ObjectReturnWalletAddress", retrnObj);
  dispatch(retrnObj);
};

// -------------Save Wallet Address Action ends here ---------------

// -------------- createNFT Action starts here --------------

export const createNftAction = (formDataNFT) => async (dispatch) => {
  const accessToken = localStorage?.getItem("authToken");

  fetch(`${BASE_URL}api/nft/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formDataNFT),
  }).then((response) => {
    console.log("CeateNFT", response);
    if (response.status === 200) {
      Swal.fire("Success", "Sucessfully created", "success", {
        buttons: false,
        timer: 2000,
      });
    }
    if (response.status === 500) {
      Swal.fire(
        "Failed",
        response.status,
        "error",

        {
          buttons: false,
          timer: 2000,
        }
      );
    }

    const retrnObj = { type: "CreateNFT", payload: response };
    console.log("ObjectReturn", retrnObj);
    dispatch(retrnObj);
  });
};

// --------------- createNFT Action ends here -------------

// CreateCollection action start from here

export const createCollectionAction = (formData) => async (dispatch) => {
  const accessToken = localStorage?.getItem("authToken");
  console.log("CheckingFormData", formData);
  fetch(`${BASE_URL}api/collection/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.status === 200) {
        Swal.fire("Success", "Sucessfully created", "success", {
          buttons: false,
          timer: 2000,
        });
      }
      console.log("CreateCollectionResponseAction", response);
      const retrnObj = { type: "CreateCollection", payload: response };
      console.log("ObjectReturn", retrnObj);
      dispatch(retrnObj);
    })
    .catch((err) => {
      console.log("ThisIsError", err);
    });
};

// CreatCollection action ends here

// UserData action starts here

export const dashUserDataAction = () => async (dispatch) => {
  const accessToken = localStorage?.getItem("authToken");
  fetch(`${BASE_URL}api/auth/dash`, {
    method: "GET",
    // url: `${BASE_URL}api/auth/dash`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((Data) => {
      console.log("DashActionREs", Data);

      const retrnObj = { type: "DashUserData", payload: Data.data };
      console.log("ObjectReturnDashProfile", retrnObj);
      dispatch(retrnObj);
    });
};

// Userdata action ends here

// ------------ GetAllCollections Action starts from here ------------

export const AllCollectionAction = (pageCount) => async (dispatch) => {
  console.log("PageFromAction", pageCount);
  axios({
    method: "post",
    url: `${BASE_URL}api/collection/getAllCollections`,
    data: {
      size: 6,
      page: pageCount,
    },
  }).then((response) => {
    console.log("AllCollectionResponse", response);
    const retrnObj = { type: "AllCollection", payload: response.data };
    dispatch(retrnObj);
  });
};

// ------------ GetAllCollections Action ends here ------------

// ----------- GetSingleCollectionById Action start from here --------

export const getSingleCollectionAction = (id) => async (dispatch) => {
  axios({
    method: "post",
    url: `${BASE_URL}api/collection/single`,
    data: {
      id: id,
    },
  }).then((response) => {
    console.log("SingleCollectionRes", response);
    const retrnObj = { type: "SingleCollection", payload: response.data };
    dispatch(retrnObj);
  });
};

// ----------- GetSingleCollectionById Action ends here --------

// ------------ GetCollectionByWalletAdress Action starts from here  --------------

export const getCollectionByAddressAction =
  (pageCount, walletAddressGet) => async (dispatch) => {
    axios({
      method: "post",
      url: `${BASE_URL}api/collection/CollectionByAddress`,
      data: {
        address: walletAddressGet,
        page: pageCount,
        size: 6,
      },
    }).then((response) => {
      console.log("CollectionByAddress", response);
      const retrnObj = { type: "CollectionByAddress", payload: response.data };
      dispatch(retrnObj);
    });
  };

// ------------ GetCollectionByWalletAdress Action ends here  ---------------------

// ------------- DeleteMyCollection Action start from here -------------------------

export const deleteCollectionAction = (id) => async (dispatch) => {
  const accessToken = localStorage?.getItem("authToken");
  axios({
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    url: `${BASE_URL}api/collection/delete`,
    data: {
      id: id,
    },
  })
    .then((response) => {
      console.log("DeleteCollection", response);

      const retrnObj = { type: "DeleteCollection", payload: response.data };
      dispatch(retrnObj);
      if (response?.data?.status === true) {
        Swal.fire("Success", response?.data?.message, "success", {
          buttons: false,
          timer: 2000,
        });
      }
    })
    .catch((error) => {
      Swal.fire("Failed", error?.message, "error", {
        buttons: false,
        timer: 2000,
      });
    });
};

// ------------- DeleteMyCollection Action ends here -------------------------

// -------------- GetAllCategories Action starts from here -------------------
export const getAllCategoriesAction = () => async (dispatch) => {
  // fetch(`${BASE_URL}api/category/getAllCategories`, { method: "GET" })
  // .then((response) => response.json())
  axios({
    method: "GET",
    url: `${BASE_URL}api/category/getAllCategories`,
  }).then((Data) => {
    console.log("GetAllCategoriesREs", Data);
    const retrnObj = { type: "GetAllCategories", payload: Data.data };
    console.log("GetAllCategoriesObj", retrnObj);
    dispatch(retrnObj);
  });
};

// -------------- GetAllCategories Action ends here -------------------
