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
const setIsHistory = payload => {
  return {
    type: actions.SET_IS_HISTORY_BACK,
    payload
  };
};
function dispatchSetPartner(data) {
  store.dispatch(setPartner(data));
}
function dispatchSetIsHistory(data) {
  store.dispatch(setIsHistory(data));
}
function dispatchSetPartnerLogo(data) {
  store.dispatch(setPartnerInHistory(data));
}

export {
  dispatchSetPartner,
  dispatchSetIsHistory,
  dispatchSetPartnerLogo
};
