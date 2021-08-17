import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useTask } from "utils/kanban";
import { useProject } from "utils/project";
import { useUrlQueryParams } from "utils/url";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();

  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [params] = useUrlQueryParams(["name", "processodId", "typeId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(() => {
    return {
      projectId,
      name: params.name || undefined,
      processodId: Number(params.processodId) || undefined,
      typeId: Number(params.typeId) || undefined,
    };
  }, [params, projectId]);
};

export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParams([
    "editingTaskId",
  ]);

  const { data: editingTask, isLoading: editingTaskLoading } = useTask(
    Number(editingTaskId)
  );

  const startEdit = useCallback(
    (id: number) => setEditingTaskId({ editingTaskId: id }),
    [setEditingTaskId]
  );

  const close = useCallback(
    () => setEditingTaskId({ editingTaskId: "" }),
    [setEditingTaskId]
  );

  return {
    editingTask,
    editingTaskId,
    editingTaskLoading,
    startEdit,
    close,
  };
};
