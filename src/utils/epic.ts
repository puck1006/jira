import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: cleanObject(param || {}) })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        method: "POST",
        data: cleanObject(params || {}),
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  // 需要id 以及 可选参数
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics/${params.id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
