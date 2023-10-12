/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-concat */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    request.headers.authorization = `${"Bearer" + " "}${
      JSON.parse(localStorage.getItem("loginData"))?.token
    }`;
    return request;
  },
  (error) =>
    // Do something with request error

    /* istanbul ignore next */
    Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  /* istanbul ignore next */
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    /* istanbul ignore next */
    if (error.response.status === 401) {
      localStorage.removeItem("loginData");
      window.location.href = "/login";
    }
    /* istanbul ignore next */
    return Promise.reject(error);
  }
);

export default axiosInstance;
