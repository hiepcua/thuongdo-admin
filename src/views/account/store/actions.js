import axios from "axios";
import { SET_ACCOUNT_INFO, REMOVE_ACCOUNT_INFO } from "@/store/mutation-types";

const getAccountInfo = ({ commit }) => {
  axios.get("user/me").then(function (response) {
    switch (response.code) {
      case 200:
        commit(SET_ACCOUNT_INFO, response.data);
        break;
      case 401:
        break;
      default:
        break;
    }
  });
};

const removeAccountInfo = ({ commit }) => {
  commit(REMOVE_ACCOUNT_INFO);
};

export default {
  getAccountInfo,
  removeAccountInfo,
};
