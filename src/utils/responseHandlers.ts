import { refreshAccessToken } from "../api/auth";
import { getCookie, setCookie } from "./cookieHandler";

export async function checkResponse(response: Response) {
  if (!response.ok) {
    const err = await response.json();
    console.error(err);
    return Promise.reject(err);
  }
  // setAccessToken(response);
  // const refreshToken = localStorage.getItem('refreshToken');
  // if (!getCookie('accessToken') && refreshToken) {
  //   await refreshAccessToken(refreshToken).then(setAccessToken);
  // }
  return response.json();
}

// export function setAccessToken (response: Response) {
//   let accessToken = '';
//   response.headers.forEach(h => {
//     if (h.includes('Bearer')) {
//       accessToken = h.split('Bearer ')[1];
//     }
//   })
//   setCookie('accessToken', accessToken);
// }