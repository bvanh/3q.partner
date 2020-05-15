const API = {
  // ROOT API
  ROOT_URL: "https://api.partner.clappigames.com",
  // API history page
  HISTORY_PATHNAME: "/charges/list",
  HISTORY_PATHSEARCH_NODATE:
    "?currentPage=1&pageSize=10&search=&type=0",
  // API charts page
  CHARTS_PATHNAME: "/stats/revenue/date",
  CHARTS_PATHSEARCH_TYPE: "?type=0",
  // API chart hour
  CHARTS_PATH_HOUR: "/stats/revenue/hour?type=0",
  // url change password page
  CHANGEPASSWORD_PATHNAME: "/partner/password/update",
  //   REFRESH TOKEN & LOGIN
  REFRESHTOKEN_PATHNAME: "/auth/renew/token/access",
  LOGIN_PATHNAME: "/auth/login",
  //
  PARTNER_INFO: "/partner/info"
};
export default API;
