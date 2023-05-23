import axios from 'axios';
import queryString from 'query-string';

const baseURL = 'https://funny-memories-pub-api.vercel.app/api/';
// const baseURL = 'http://localhost:5000/api/';

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params),
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
axiosClient.interceptors.request.use(async (config): Promise<any> => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  };
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) return response.data;
    return response;
  },
  err => {
    throw err;
  }
);

export default axiosClient;
