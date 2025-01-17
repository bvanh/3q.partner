import { actions } from "../action_types/index";
import store from "../store/index";



const setPartner = payload => {
  return {
    type: actions.SET_PARTNER,
    payload
  };
};
const setPartnerInHistory = payload => {
  return {
    type: actions.SET_PARTNER_LOGO,
    payload
  };
};
const setListPartner = payload => {
  return {
    type: actions.SET_LISTPARTNER,
    payload
  };
};
const resetLogout = payload => {
  return {
    type: actions.RESET_LOGOUT,
    payload
  };
};
function dispatchSetPartner(data) {
  store.dispatch(setPartner(data));
}
function dispatchSetListPartner(data) {
  store.dispatch(setListPartner(data));
}
function dispatchSetPartnerLogo(data) {
  store.dispatch(setPartnerInHistory(data));
}
function dispatchResetLogout(data) {
  store.dispatch(resetLogout(data));
}
export {
  dispatchSetPartner,
  dispatchSetListPartner,
  dispatchSetPartnerLogo,
  dispatchResetLogout
};
