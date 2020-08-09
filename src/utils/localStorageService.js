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
    return JSON.parse(localStorage.getItem(name));
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
