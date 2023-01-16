import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import { userServices } from "../../services";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await userServices.getAllCode("GENDER");
      if (res && res.errorCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getAllCode("ROLE");

      if (res && res.errorCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getAllCode("POSITION");
      if (res && res.errorCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRequiredDoctorInforStart = () => {
  return async (dispatch, getState) => {
    try {
      let price = await userServices.getAllCode("PRICE");
      let payment = await userServices.getAllCode("PAYMENT");
      let province = await userServices.getAllCode("PROVINCE");
      let resSpecialty = await userServices.getAllSpecialty();
      let resClinic = await userServices.getAllClinic();
      if (
        price &&
        price.errorCode === 0 &&
        payment &&
        payment.errorCode === 0 &&
        province &&
        province.errorCode === 0 &&
        resSpecialty &&
        resSpecialty.errorCode === 0 &&
        resClinic &&
        resClinic.errorCode === 0
      ) {
        let data = {
          price: price.data,
          payment: payment.data,
          province: province.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log(e);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: data,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

export const fetchScheduleHourStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getAllCode("TIME");
      if (res && res.errorCode === 0) {
        dispatch(fetchScheduleHourSuccess(res.data));
      } else {
        dispatch(fetchScheduleHourFailed());
      }
    } catch (e) {
      dispatch(fetchScheduleHourFailed());
      console.log(e);
    }
  };
};

export const fetchScheduleHourSuccess = (scheduleData) => ({
  type: actionTypes.FETCH_SCHEDULE_HOUR_SUCCESS,
  data: scheduleData,
});

export const fetchScheduleHourFailed = () => ({
  type: actionTypes.FETCH_SCHEDULE_HOUR_FAILED,
});

export const createUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getPostNewUser(data);
      if (res && res.errorCode === 0) {
        dispatch(createUserSuccess());
        dispatch(fetchUsersStart());
        toast.success("Create a new user success!");
      } else {
        dispatch(createUserFailed());
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log(e);
    }
  };
};

export const createUserSuccess = () => {
  console.log("Create user success");
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
  };
};

export const createUserFailed = () => {
  console.log("Create user failed");
  return {
    type: actionTypes.CREATE_USER_FAILED,
  };
};

export const fetchUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getAllUsers("ALL");
      if (res && res.errorCode === 0) {
        dispatch(fetchUsersSuccess(res.users));
      } else {
        dispatch(fetchUsersFailed());
      }
    } catch (e) {
      dispatch(fetchUsersFailed());
      console.log(e);
    }
  };
};

export const fetchUsersSuccess = (data) => {
  console.log("Fetch Users Success");
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: data,
  };
};

export const fetchUsersFailed = () => {
  console.log("Fetch Users Failed");
  return {
    type: actionTypes.FETCH_USERS_FAILED,
  };
};

export const deleteUserStart = (inputId) => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.deleteUser(inputId);
      if (res && res.errorCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchUsersStart());
        toast.error("Delete the user success!");
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};

export const deleteUserSuccess = () => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
  };
};

export const deleteUserFailed = () => {
  return {
    type: actionTypes.DELETE_USER_FAILED,
  };
};

export const editUserStart = (inputUser) => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.editUser(inputUser);
      if (res && res.errorCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchUsersStart());
        toast.success("Edit the user success!");
      } else {
        dispatch(editUserFailed());
      }
    } catch (e) {
      dispatch(editUserFailed());
      console.log(e);
    }
  };
};

export const editUserSuccess = () => {
  console.log("edit user success");
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
  };
};

export const editUserFailed = () => {
  console.log("edit user failed");
  return {
    type: actionTypes.EDIT_USER_FAILED,
  };
};

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getTopDoctorHome("8");
      if (res && res.errorCode === 0) {
        dispatch(fetchDoctorsSuccess(res.doctors));
      } else {
        dispatch(fetchUsersFailed());
      }
    } catch (e) {
      dispatch(fetchUsersFailed());
      console.log(e);
    }
  };
};

export const fetchDoctorsSuccess = (data) => {
  console.log("Fetch Doctors Success");
  return {
    type: actionTypes.FETCH_DOCTORS_SUCCESS,
    doctors: data,
  };
};

export const fetchDoctorsFailed = () => {
  console.log("Fetch Doctors Failed");
  return {
    type: actionTypes.FETCH_DOCTORS_FAILED,
  };
};

export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getAllDoctor();
      if (res && res.errorCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.doctors));
      } else {
        dispatch(fetchAllDoctorsFailed());
      }
    } catch (e) {
      dispatch(fetchAllDoctorsFailed());
      console.log(e);
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => {
  console.log("Fetch All Doctors Success");
  return {
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataDr: data,
  };
};

export const fetchAllDoctorsFailed = () => {
  console.log("Fetch All Doctors Failed");
  return {
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
  };
};

export const saveDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.saveDetailDoctor(data);
      if (res && res.errorCode === 0) {
        dispatch(saveDetailDoctorSuccess());
      } else {
        console.log(res);
        dispatch(saveDetailDoctorFailed());
      }
    } catch (e) {
      dispatch(saveDetailDoctorFailed());
      console.log(e);
    }
  };
};

export const saveDetailDoctorSuccess = () => {
  toast.success("Save Infor Detail Doctor Succeed!");
  console.log("Save Detail Doctor Success");
  return {
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
  };
};

export const saveDetailDoctorFailed = () => {
  toast.error("Save Infor Detail Doctor Failed!");
  console.log("Save Detail Doctor Failed");
  return {
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
  };
};
