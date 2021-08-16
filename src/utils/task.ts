import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const filterParam = { ...param, name: useDebounce(param?.name, 300) };

  return useQuery<Task[]>(["tasks", filterParam], () =>
    client("tasks", { data: cleanObject(filterParam || {}) })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  // 需要id 以及 可选参数
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: "POST",
        data: cleanObject(params || {}),
      }),
    useAddConfig(queryKey)
  );
};
