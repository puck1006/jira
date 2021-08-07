import { useUrlQueryParams } from "../../utils/url";
import { useMemo } from "react";

export const useProjectSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["name", "personId"]);
  return [
    useMemo(() => {
      return { ...params, personId: Number(params.personId) || undefined };
    }, [params]),
    setParams,
  ] as const;
};
