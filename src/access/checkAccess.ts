/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */

import accessEnum from "./accessEnum";

/**
 *
 * 判断用户是否有某个权限
 * @param loginUser
 * @param needAccess
 */
const checkAccess = (loginUser: any, needAccess = accessEnum.NOT_LOGIN) => {
  // console.log(loginUser);
  const loginUserAccess = loginUser?.userRole ?? accessEnum.NOT_LOGIN;

  if (needAccess == accessEnum.NOT_LOGIN) {
    return true;
  }

  if (needAccess === accessEnum.USER) {
    if (loginUserAccess === accessEnum.NOT_LOGIN) {
      return false;
    }
  }

  if (needAccess === accessEnum.ADMIN) {
    if (loginUserAccess !== accessEnum.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkAccess;
