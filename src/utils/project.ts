import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const fetchProject = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject,
    });
  }, [fetchProject, param, run]);

  return result;
};

export const useEditProject = () => {
  // 需要id 以及 可选参数

  const { run, ...restAsync } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: cleanObject(params || {}),
      })
    );
  };

  return {
    mutate,
    restAsync,
  };
};

export const useAddProject = () => {
  // 需要id 以及 可选参数

  const { run, ...restAsync } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "POST",
        data: cleanObject(params || {}),
      })
    );
  };

  return {
    mutate,
    restAsync,
  };
};
