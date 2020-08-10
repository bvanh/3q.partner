const valService = {
  tokenPartner: "tokenPartner",
  accessTokenPartner: "accessTokenPartner",
  isSave: "saveLogin",
};
const { tokenPartner, accessTokenPartner, isSave } = valService;
const localStorageService = {
  setToken: (token, accessToken) => {
    if (token) {
      localStorage.setItem(tokenPartner, JSON.stringify(token));
    }
    localStorage.setItem(accessTokenPartner, JSON.stringify(accessToken));
  },
  saveInfo: (name, info) => {
    localStorage.setItem(name, JSON.stringify(info));
  },
  getLocalInfo: (name) => {
    let json;
    try {
      json = JSON.parse(localStorage.getItem(name));
    } catch (exception) {
      json = localStorage.getItem(name);
    }
    if (json) {
      return json;
    }
  },
  getToken: () => {
    if (localStorage.getItem(tokenPartner)) {
      return JSON.parse(localStorage.getItem(tokenPartner));
    } else {
      return false;
    }
  },
  resetToken: () => {
    localStorage.removeItem(tokenPartner);
    localStorage.removeItem(isSave);
    localStorage.removeItem(accessTokenPartner);
  },
};

export { localStorageService, valService };
