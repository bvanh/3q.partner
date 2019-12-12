import fetch from "isomorphic-unfetch";
import { url } from "../api";

const getToken = () => {
  let userToken = localStorage.getItem("userToken");
  if (userToken === null) {
    return false;
  } else
    fetch(url + `/auth/renew/token/access`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: `refreshToken=${JSON.parse(userToken).refreshToken}`
    })
      .then(response => response.json())
      .then(result => localStorage.setItem("user", JSON.stringify(result)))
      .catch(function(error) {
        console.log("Request failed", error);
      });
};
export default getToken;
