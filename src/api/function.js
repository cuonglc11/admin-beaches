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
export const updateBeaches = (data , id) =>
  api.post("admin/beaches/"  + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteBeache = (id) => api.delete("admin/beaches/" + id);
export const url = "http://127.0.0.1:8000";
