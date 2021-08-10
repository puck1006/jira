import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "success" | "loading" | "error";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwSyncError: false,
};

export const useSafeDispatch = <T>(dispatch: (arg: T) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (arg: T) => (mountedRef.current ? dispatch(arg) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const [retry, setRetry] = useState(() => () => {});

  const safeDisPath = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => {
      safeDisPath({
        data,
        error: null,
        stat: "success",
      });
    },
    [safeDisPath]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDisPath({
        data: null,
        stat: "error",
        error,
      }),
    [safeDisPath]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      safeDisPath({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwSyncError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwSyncError, safeDisPath, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
    retry,
  };
};
