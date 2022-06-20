import axios from "axios";
// import baseUrl from "./setBaseUrl";
// axios.defaults.baseURL = '192.168.1.53:8081';
axios.defaults.baseURL = "http://localhost:8080"
const Http = {
  get: function (url, data) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: data })
        .then(function (res) {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.warn("Http error Info ", res.data);
            reject(res.data);
          }
        })
        .catch(function (err) {
          console.warn("Http error Info ", err);
        });
    }).catch(function (err) {
    });
  },
  post: function (url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(function (res) {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.warn("Http error Info ", res.data);
            reject(res.data);
          }
        })
        .catch(function (err) {
          console.warn("Http error", err);
        });
    }).catch(function (err) {
      console.warn("Http error", err);
    });
  },
  put: function (url, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then(function (res) {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.warn("Http error Info ", res.data);
            reject(res.data);
          }
        })
        .catch(function (err) {
          console.warn("Http error: ", err);
        });
    }).catch(function (err) {
      console.warn("Http error: ", err);
    });
  },
  delete: function (url, data) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, data)
        .then(function (res) {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.warn("Http error Info ", res.data);
            reject(res.data);
          }
        })
        .catch(function (err) {
          console.warn("Http error", err);
        });
    }).catch(function (err) {
      console.warn("Http error", err);
    });
  }
};
export default Http;