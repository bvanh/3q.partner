import { actions } from "../action_types/index";

const initialState = {
  listPartner: [],
  partnerId: "1BA3F861-D4F2-4D97-9F78-38633155EC27",
  isHistoryBack: true,
  logoPartner: "https://cms.cubegame.vn/static/uploads/games/1576737204.png"
};

export default (state = initialState, action) => {

  switch (action.type) {
    case actions.SET_PARTNER:
      return {
        ...state,
        partnerId: action.payload
      }
    case actions.SET_PARTNER_LOGO:
      return {
        ...state,
        logoPartner: action.payload
      }
    case actions.SET_LISTPARTNER:
      return {
        ...state,
        listPartner: action.payload
      }
    default:
      return state;
  }
};
