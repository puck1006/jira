import { useEffect, useRef, useState } from "react";
// const isFalsy = (value: unknown) => (value === 0 ? false : !value);
const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const resetRoute = () => (window.location.href = window.location.origin);

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    clear: () => setValue([]),
    removeIndex: (num: number) => {
      setValue(value.filter((_, index) => index !== num));
    },
    add: (project: T) => {
      setValue([...value, project]);
    },
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUomount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUomount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUomount, oldTitle]);
};

export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
