import axios from "axios";

export const recommendPolicy = (form) => {
  return axios.post("http://127.0.0.1:8000/recommend", form);
};

