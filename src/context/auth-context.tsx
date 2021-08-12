import React, { ReactNode, useContext } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { http } from "utils/http";
import * as auth from "../auth-provider";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullPageLoading } from "../component/lib";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "store/auth";
import * as authSlice from "store/auth";

export interface AuthForm {
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
  const { isLoading, isError, isIdle, run, error } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(authSlice.bootstrap()));
  });

  if (isLoading || isIdle) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const user = useSelector(userState);
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const login = (form: AuthForm) => dispatch(authSlice.login(form));
  const register = (form: AuthForm) => dispatch(authSlice.register(form));
  const logout = () => dispatch(authSlice.logout());

  return {
    user,
    login,
    register,
    logout,
  };
};
