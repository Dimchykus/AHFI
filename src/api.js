import axios from "axios";
import { toast as notify } from "react-toastify";
export const baseURL = "http://localhost:5000/";

export const toast = (text, type) => {
  return notify(text ?? "Помилка!!!", {
    type: type ?? "error",
    position: "top-center",
  });
};

export default axios.create({
  baseURL,
  withCredentials: true,
});
