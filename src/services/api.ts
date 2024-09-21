// This file talks to the backend server
import axios from "axios";
import { getToken } from "../libs/helpers";
import { FormData } from "../types/authentication";

type FormDataNot = {
  title: string;
  content: string;
};

const BASE_URL = "https://cartle-test-2.onrender.com/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosInstanceWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the bearer token in the header
axiosInstanceWithToken.interceptors.request.use(
  (config) => {
    // Retrieve the token gotten back from the login stored in the local Storage
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// POST Requests
export const loginAdmin = async (data: FormData) => {
  return await axiosInstance.post("merchants/login", data);
};

export const sendNotification = async (data: FormDataNot) => {
  return await axiosInstanceWithToken.post("merchants/notify/", data);
};

// GET Requests
export const getStores = async () => {
  return await axiosInstanceWithToken.get("stores/all");
};

export const getMerchants = async () => {
  return await axiosInstanceWithToken.get("merchants/all");
};

export const getNotification = async () => {
  return await axiosInstanceWithToken.get("merchants/notify/all");
};
