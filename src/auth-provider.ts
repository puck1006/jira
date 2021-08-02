import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

const handleResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (params: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    if (res.ok) {
      return handleResponse(await res.json());
    } else {
      return Promise.reject("请求失败");
    }
  });
};

export const register = (params: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    if (res.ok) {
      return handleResponse(await res.json());
    } else {
      return Promise.reject("请求失败");
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
