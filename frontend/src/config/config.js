export const ENV = {
    appBaseUrl: process.env.REACT_APP_BASE_URL,
    serverUrl: process.env.REACT_APP_SERVER_URL,
    demo_api_key: process.env.REACT_APP_DEMO_KEY,
    saveItem: function (name, value) {
      localStorage.setItem(`${name}`, JSON.stringify(value));
    },

    encryptUserData: function (token) {
      if (token) {
        localStorage.setItem('token', JSON.stringify(token));
      }
      return true;
    },
    getToken: function () {
      let userData = localStorage.getItem('token');
      if (userData) {
        return userData;
      }
      return {};
    },
    getHeaders: function () {
      let token = JSON.parse(localStorage.getItem('token'));
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
        headers['access-token'] = token;
      }
      return headers;
    },

    objectToQueryString: function (body) {
      const qs = Object.keys(body).map(key => `${key}=${body[key]}`).join('&');
      return qs;
    }
  };
  