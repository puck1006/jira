import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderConfig,
} from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: cleanObject(param || {}) })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: cleanObject(params || {}),
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  // 需要id 以及 可选参数
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`Tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  // 需要id 以及 可选参数
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans/${params.id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useRecordKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", { data: params, method: "POST" });
  }, useReorderConfig(queryKey));
};
