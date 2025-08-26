import { data } from "react-router-dom";
import api from "./api";

export const login = (data) => api.post("login", data);
export const region = () => api.get("admin/region");
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
export const url = "http://127.0.0.1:8000";
export const loginAccout = (data) => api.post("login-account", data);
export const accounts = () => api.get("admin/account-list");
export const accountsStatus = (data) => api.post("admin/account-list" , data);

export const sentOtpPass = (data) => api.post("customer/sent-otp", data);
export const vefifyOtp = (data) => api.post("customer/change-otp", data);
export const vefifyPass = (data) => api.post("customer/change-password", data);
export const registerAccount = (data) => api.post("account/change-otp", data);
export const vefifyAccount = (data) => api.post("account/verify-account", data);


