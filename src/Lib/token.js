export function checkLoggedIn() {
  if (localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
    return true;
  } else {
    return false
  }
}

export function getAccessToken() {
  return localStorage.getItem("accessToken")
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken")
}

export function setAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);  // DONT USE LOCAL STORAGE.
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);  // DONT USE LOCAL STORAGE.
}

export function deleteAccessToken() {
  localStorage.removeItem("accessToken");
}

export function deleteRefreshToken() {
  localStorage.removeItem("refreshToken");
}
