import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(() => {
      return keys.reduce((pre, key) => {
        return {
          ...pre,
          [key]: searchParams.get(key),
        };
      }, {} as { [key in K]: string });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]),
    setSearchParams,
  ] as const;
};
