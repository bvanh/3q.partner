import API from "../../api/apiAll";

// doi mat khau
function changePassword(userAccessToken, oldPassword, newPassword) {
  const mes = fetch(API.ROOT_URL + API.CHANGEPASSWORD_PATHNAME, {
    headers: {
      Authorization: `Bearer ${JSON.parse(userAccessToken)}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: `oldPassword=${oldPassword}&newPassword=${newPassword}`
  })
    .then(response => response.json())
    .then(result => result)
    .catch(function(error) {
      console.log("Request failed", error);
    });
  return mes;
}

export default changePassword;
