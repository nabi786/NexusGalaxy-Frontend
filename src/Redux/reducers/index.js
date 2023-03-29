import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import UpdateProfileReducer from "./UpdateProfileReducer";
import saveWalletAddressReducer from "./saveWalletAddressReducer";
import createNFTReducer from "./createNFTReducer";
import createCollectionReducer from "./createCollectionReducer";
import dashUserDataReducer from "./dashUserDataReducer";
import getAllCollectionReducer from "./getAllCollectionReducer";
import singleCollectionReducer from "./singleCollectionReducer";
import collectionByAddressReducer from "./collectionByAddressReducer";
import deleteCollectionReducer from "./deleteCollectionReducer";
import getAllCategoriesReducer from "./getAllCategoriesReducer";
import updateCollectionReducer from "./updateCollectionReducer";

const rootReducer = combineReducers({
  loginReducer,
  UpdateProfileReducer,
  saveWalletAddressReducer,
  dashUserDataReducer,
  createNFTReducer,
  createCollectionReducer,
  getAllCollectionReducer,
  singleCollectionReducer,
  collectionByAddressReducer,
  deleteCollectionReducer,
  getAllCategoriesReducer,
  updateCollectionReducer,
});

export default rootReducer;
