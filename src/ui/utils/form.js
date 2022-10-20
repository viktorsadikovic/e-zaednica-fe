import debounce from "lodash.debounce";
import { useMemo } from "react";

export const useDebounce = (fn, ms) => {
  const delay = 300;
  const debouncedFn = useMemo(() => debounce(fn, ms || delay), [fn, ms]);

  return debouncedFn;
};
