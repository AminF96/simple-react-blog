import axios from "axios";

export class HttpCilent {
  constructor(config = {}) {
    this.service = axios.create({
      ...config,
      baseURL: config.baseURL || process.env.REACT_APP_BASE_URL,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  }

  get(url, config = {}) {
    return new Promise((resolve, reject) => {
      this.service
        .get(url, config)
        .then((resposne) => resolve(resposne.data))
        .catch((error) => reject(error));
    });
  }

  post(url, payload, config) {
    return new Promise((resolve, reject) => {
      this.service
        .post(url, payload, config)
        .then((resposne) => resolve(resposne.data))
        .catch((error) => reject(error));
    });
  }

  delete(url, config = {}) {
    return new Promise((resolve, reject) => {
      this.service
        .delete(url, config)
        .then((resposne) => resolve(resposne.data))
        .catch((error) => reject(error));
    });
  }

  put(url, payload, config) {
    return new Promise((resolve, reject) => {
      this.service
        .put(url, payload, config)
        .then((resposne) => resolve(resposne.data))
        .catch((error) => reject(error));
    });
  }
}
