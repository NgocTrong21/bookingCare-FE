import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => {
    return state.user.isLoggedIn && state.user.userInfo.user.roleId === "R1";
  },
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: "/login",
});

export const doctorIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => {
    return (
      state.user &&
      state.user.isLoggedIn &&
      (state.user.userInfo.user.roleId === "R1" ||
        state.user.userInfo.user.roleId === "R2")
    );
  },
  wrapperDisplayName: "",
  redirectPath: "/login",
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state) => !state.user.isLoggedIn,
  wrapperDisplayName: "UserIsNotAuthenticated",
  redirectPath: (state, ownProps) => {
    if (
      state &&
      state.user &&
      state.user.userInfo &&
      state.user.userInfo.user.roleId === "R1"
    ) {
      return "/system/user-redux";
    } else if (
      state &&
      state.user &&
      state.user.userInfo &&
      state.user.userInfo.user.roleId === "R2"
    ) {
      return "/doctor/manage-schedule";
    }
  },
  allowRedirectBack: false,
});
