const API = {
  // ROOT API
  ROOT_URL: "https://api.partner.clappigames.com",
  // API history page
  HISTORY_PATHNAME: "/charges/list",
  HISTORY_DETAIL_PATHNAME: "/charges/detail",
  HISTORY_PATHSEARCH_DEFAULT:
    "?currentPage=1&pageSize=10&search=&type=1&fromDate=2019-10-1&toDate=2019-12-30",
  // API charts page
  CHARTS_PATHNAME: "/stats/revenue/date",
  CHARTS_PATHSEARCH_TYPE: "?type=1",
  CHARTS_PATHSEARCH_DATE: "&fromDate=2019-10-17&toDate=2019-10-25",
  // url change password page
  CHANGEPASSWORD_PATHNAME: "/partner/password/update",
  //   REFRESH TOKEN & LOGIN
  REFRESHTOKEN_PATHNAME: "/auth/renew/token/access",
  LOGIN_PATHNAME: "/auth/login",
  // 
  PARTNER_INFO:'/partner/info'
};
export default API;
