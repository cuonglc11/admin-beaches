import api from "./api";

export const login = (data) => api.post("login", data);
export const region = () => api.get("admin/region");
export const searchRegion = (keyword) =>
  api.get("admin/region?search=" + keyword);
export const searchBeaches = (keyword) =>
  api.get("admin/beaches?search=" + keyword);
export const searchAccount = (keyword) =>
  api.get("admin/account-list?search=" + keyword);

export const addRegion = (data) => api.post("admin/region", data);
export const updateRegion = (data, id) => api.post("admin/region/" + id, data);
export const deleteRegion = (id) => api.delete("admin/region/" + id);
export const beaches = () => api.get("admin/beaches");
export const addBeaches = (data) =>
  api.post("admin/beaches", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateBeaches = (data, id) =>
  api.post("admin/beaches/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteBeache = (id) => api.delete("admin/beaches/" + id);
export const url = process.env.REACT_APP_API_URL;
export const loginAccout = (data) => api.post("login-account", data);
export const accounts = () => api.get("admin/account-list");
export const accountsStatus = (data) => api.post("admin/account-list", data);

export const sentOtpPass = (data) => api.post("customer/sent-otp", data);
export const vefifyOtp = (data) => api.post("customer/change-otp", data);
export const vefifyPass = (data) => api.post("customer/change-password", data);
export const registerAccount = (data) => api.post("account/change-otp", data);
export const vefifyAccount = (data) => api.post("account/verify-account", data);
