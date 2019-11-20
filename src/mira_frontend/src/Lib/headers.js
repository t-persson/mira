import { getAccessToken, getRefreshToken } from "./token";


export const accessHeader = () => {
  return 'Bearer ' + getAccessToken();
}

export const refreshHeader = () => {
  return 'Bearer ' + getRefreshToken();
}
