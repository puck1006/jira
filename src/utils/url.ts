import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "utils";

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setUrlSearchParam = useSetUrlSearchParam();
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
    (params: Partial<{ [key in K]: unknown }>) => {
      setUrlSearchParam(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    setSearchParams(o);
  };
};
