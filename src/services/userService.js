import axios from "../axios";

export const handleLoginApi = (email, password) => {
  console.log();
  return axios.post("/api/login", { email, password });
};

export const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const getPostNewUser = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

export const deleteUser = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};

export const editUser = (userData) => {
  return axios.put(`api/edit-user`, userData);
};

export const getAllCode = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

//doctor
export const getTopDoctorHome = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export const getAllDoctor = () => {
  return axios.get(`api/get-all-doctors`);
};

export const saveDetailDoctor = (data) => {
  return axios.post(`/api/save-infor-doctor`, data);
};

export const getDetailDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

export const createSchedule = (inputData) => {
  return axios.post("/api/create-schedule", inputData);
};

export const getScheduleByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-doctor-schedule-by-date?doctorId=${doctorId}&date=${date}`
  );
};

export const getExtraDoctorInforById = (doctorId) => {
  return axios.get(`/api/get-extra-doctor-infor-by-id?doctorId=${doctorId}`);
};

export const postBookAppointment = (data) => {
  return axios.post(`/api/patient-booking-appointment`, data);
};

export const postVerifyAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

export const getListPatientForDoctor = (inputId, date) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${inputId}&date=${date}`
  );
};

export const confirmRemedy = (inputData) => {
  return axios.post(`/api/confirm-remedy`, inputData);
};

//specialty
export const postSpecialty = (data) => {
  return axios.post(`/api/post-specialty`, data);
};

export const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

export const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

//clinic
export const postClinic = (data) => {
  return axios.post(`/api/post-clinic`, data);
};

export const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};

export const getDetailClinicById = (inputId) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${inputId}`);
};
