import { useSetUrlSearchParam, useUrlQueryParams } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "utils/project";

export const useProjectSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["name", "personId"]);
  return [
    useMemo(() => {
      return { ...params, personId: Number(params.personId) || undefined };
    }, [params]),
    setParams,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(+editingProjectId);
  const setSearchParams = useSetUrlSearchParam();
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setSearchParams({ projectCreate: undefined, editingProjectId: undefined });
  };

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    editingProject,
    isLoading,
    startEdit,
  };
};
