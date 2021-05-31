/*
 * action types
 */

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

/*
 * action creators
 */

export function loginApp(payload) {
  return {
    type: LOGIN,
    payload
  };
}

export function logoutApp(payload) {
  return {
    type: LOGOUT,
    payload
  };
}
