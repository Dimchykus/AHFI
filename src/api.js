import axios from "axios";
import { toast as notify } from "react-toastify";
export const baseURL = "https://35ec-195-137-226-123.eu.ngrok.io/";

export const toast = (text, type) => {
  return notify(text ?? "Помилка!!!", {
    type: type ?? "error",
    position: "top-center",
  });
};

export const sessionSet = (name, obj) => {
  sessionStorage.setItem(name, JSON.stringify(obj));
};

export const sessionGet = (name) => {
  var obj = JSON.parse(sessionStorage.getItem(name));
  if (obj) return obj;
  return null;
};

export default axios.create({
  baseURL,
  withCredentials: true,
});
