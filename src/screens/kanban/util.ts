import { useMemo } from "react";
import { useLocation } from "react-router";
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
