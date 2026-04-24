import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://aarogyaaid-insurance-platform.onrender.com";

export const recommendPolicy = (form) => {
  return axios.post(`${BASE_URL}/recommend`, form);
};