import { useHttp } from "./http";
import { cleanObject } from "./index";
import { User } from "../screens/project-list/search-panel";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: cleanObject(param || {}) })
  );
};
