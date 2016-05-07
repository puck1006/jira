import React, { ReactNode, useContext } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { http } from "utils/http";
import * as auth from "../auth-provider";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullPageLoading } from "../component/lib";

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

console.log("outDate commit");

AuthContext.displayName = "AutuContext";

interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;

  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isLoading,
    isError,
    isIdle,
    run,
    setData: setUser,
    error,
  } = useAsync<User | null>();
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isLoading || isIdle) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context 必须在 AuthProvider 中使用 ");
  }

  return context;
};
