import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env["REACT_APP_API_URL "];

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endPoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${apiUrl}/${endPoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject("请重新登录");
    }

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// type Person = {
//   name: string;
//   age: number;
// };

// const xiaoming: Partial<Person> = {};
// console.log(xiaoming);

// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// type PersonKeys = keyof Person;

// type age = Exclude<PersonKeys, "name">;
