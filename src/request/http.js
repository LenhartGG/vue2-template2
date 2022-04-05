import axios from "axios";
// import baseUrl from "./setBaseUrl";
axios.defaults.baseURL = '192.168.1.53:8081';
if (localStorage.token) {
  axios.defaults.headers.common["x-token"] = localStorage.token;
}
const Http = {
  get: function (url, data) {
    if (localStorage.token) {
      axios.defaults.headers.common["x-token"] = localStorage.token;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: data })
        .then(function (res) {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            console.warn("Http error Info ", res.data);
            reject(res.data.message);
          }
        })
        .catch(function (err) {
          console.warn("Http error Info ", err);
        });
    }).catch(function (err) {
    });
  },
  post: function (url, data) {
    if (localStorage.token) {
      axios.defaults.headers.common["x-token"] = localStorage.token;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(function (res) {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            reject(res.data.message);
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
    if (localStorage.token) {
      axios.defaults.headers.common["x-token"] = localStorage.token;
    }
    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then(function (res) {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            reject(res.data.message);
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
    if (localStorage.token) {
      axios.defaults.headers.common["x-token"] = localStorage.token;
    }
    return new Promise((resolve, reject) => {
      axios
        .delete(url, data)
        .then(function (res) {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            reject(res.data.message);
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