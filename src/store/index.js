import Vue from "vue";
import Vuex from "vuex";

/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading vuex modules
 * -----------------------------------------------------------------------------------------------------------
 */
import account from "@/views/account/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    path: "",
    full_path: "",
    email_reset_password: "",
  },
  getters: {
    path: (state) => state.path,
    full_path: (state) => state.full_path,
    email_reset_password: (state) => state.email_reset_password,
  },
  mutations: {
    setPath(state, path) {
      state.path = path;
    },
    setFullPath(state, full_path) {
      state.full_path = full_path;
    },
    setEmailResetPassword(state, email_reset_password) {
      state.email_reset_password = email_reset_password;
    },
  },
  actions: {
    setPath({ commit }, path) {
      commit("setPath", path);
    },
    setFullPath({ commit }, full_path) {
      commit("setFullPath", full_path);
    },
    setEmailResetPassword({ commit }, email_reset_password) {
      commit("setEmailResetPassword", email_reset_password);
    },
  },
  modules: {
    account,
  },
});
