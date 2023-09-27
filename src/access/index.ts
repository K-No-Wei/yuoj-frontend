/* eslint-disable prettier/prettier */
import router from "@/router";
import store from "@/store";
import accessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loginUserw = store.state.user.loginUser;
  if (!loginUserw || !loginUserw.userRole) {
    // await 等待用户登入成功后执行后面的代码
    await store.dispatch("user/getLoginUser");
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loginUser = store.state.user.loginUser;

  const needAccess = (to.meta?.access as string) ?? accessEnum.NOT_LOGIN;

  if (needAccess !== accessEnum.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      console.log(!loginUser || !loginUser.userRole);
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
