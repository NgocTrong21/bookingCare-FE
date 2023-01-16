import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  doctors: [],
  allDoctors: [],
  scheduleHours: [],
  requiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = state;
      copyState.genders = action.data;
      state.isLoading = false;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      console.log("fetch gender failed");
      state.isLoading = false;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      let copyStateRole = state;
      copyStateRole.roles = action.data;
      return {
        ...copyStateRole,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      console.log("fetch role failed");
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      let copyStatePosition = state;
      console.log("fetch position succeed");
      copyStatePosition.positions = action.data;
      return {
        ...copyStatePosition,
      };

    case actionTypes.FETCH_POSITION_FAILED:
      console.log("fetch position failed");
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      let copyStateDoctorInfor = state;
      console.log("fetch required doctor infor succeed");
      copyStateDoctorInfor.requiredDoctorInfor = action.data;
      return {
        ...copyStateDoctorInfor,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      console.log("fetch required doctor infor failed");
      return {
        ...state,
      };

    case actionTypes.FETCH_SCHEDULE_HOUR_SUCCESS:
      let copyStateScheduleHour = state;
      console.log("fetch schedule hours succeed");
      copyStateScheduleHour.scheduleHours = action.data;
      return {
        ...copyStateScheduleHour,
      };

    case actionTypes.FETCH_SCHEDULE_HOUR_FAILED:
      console.log("fetch schedule hours failed");
      return {
        ...state,
      };

    case actionTypes.FETCH_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTORS_SUCCESS:
      state.doctors = action.doctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTORS_FAILED:
      state.doctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
      return {
        ...state,
      };

    case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
