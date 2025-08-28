// services/api/beachApi.js
import axios from "axios";

const API_BASE = "http://localhost/php_code/backend_beaches";

// Lấy danh sách tất cả bãi biển
export const getBeaches = async () => {
  const res = await axios.get(`${API_BASE}/getBeaches.php`);
  return res.data;
};

// Lấy chi tiết 1 bãi biển (bao gồm ảnh)
export const getBeachById = async (id) => {
  const res = await axios.get(`${API_BASE}/getBeachById.php?id=${id}`);
  return res.data;
};

export const getRegions = async () => {
  try {
    const response = await axios.get(`${API_BASE}/getRegion.php`);
    return response.data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
};
