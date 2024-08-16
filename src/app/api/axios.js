import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    // baseURL:  process.env.REACT_APP_API_URL,
  });
  

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth');
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`, // Add the 'Bearer ' prefix for JWTJWT
          // 'Content-Type': 'application/json',
        };
      }
      return config;
    },
    error => {
      console.log('authonticate error', error);
  
      //  Promise.reject(error);
    },
  );


  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log('error', error);
      if (error.response === undefined) {
        window.location.href = '/';
      }
      if (error.response.status == 403) {
        localStorage.removeItem('auth');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );


export default axiosInstance;
