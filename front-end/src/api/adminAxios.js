import axios from "axios";
import Swal from 'sweetalert2'

const adminAxios = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        // Accept: "*/*",
        // "Content-Type": "text/html; charset=UTF-8",
        // "Content-Type": "multipart/form-data; boundary=something",
    },
});
adminAxios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = localStorage.getItem('token');
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

adminAxios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.log(error.response.status);

        if (error.response.status  === 401) {
            localStorage.clear()
            Swal.fire({
                title: ' Phiên đăng nhập hết hạn!',
                text: 'Tài khoản của bạn đã hết hạn!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                icon: 'error',
                confirmButtonText: 'OK'
              }).then((confirm) => {
                window.location.href = "http://localhost:3000/sign-in";
              })

       }
        throw error;
    }
);

export default adminAxios;
