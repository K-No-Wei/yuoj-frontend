/* eslint-disable prettier/prettier */
import { UserControllerService } from "../../generated";
import accessEnum from "@/access/accessEnum";

const state = () => ({
  loginUser: {
    userName: "未登入",
  },
});

const getters = {};

const actions = {
  async getLoginUser({ commit, state }: any, playload: any) {
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      commit("updateUser", res.data);
    } else {
      commit("updateUser", {
        ...state.loginUser,
        userRole: accessEnum.NOT_LOGIN,
      });
    }
    //远程登入
  },
};

const mutations = {
  updateUser(state: { loginUser: any }, playload: any) {
    state.loginUser = playload;
    console.log(state.loginUser);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
