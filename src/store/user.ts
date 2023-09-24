/* eslint-disable prettier/prettier */
const state = () => ({
  loginUser: {
    userName: "未登入",
    role: 'admin'
  },
});

const getters = {};

const actions = {
  getLoginUser({ commit, state }: any, playload: any) {
    //远程登入
    commit("updateUser", { userName: "kno" });
  },
};

const mutations = {
  updateUser(state: { loginUser: any; }, playload: any) {
    state.loginUser = playload;
  },
};


export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}