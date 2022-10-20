import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = (initialState) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const uncontrolledQueryParams = useMemo(() => ({}), []);

  searchParams.forEach((value, key) => {
    if (!Object.prototype.hasOwnProperty.call(initialState, key)) {
      uncontrolledQueryParams[key] = value;
    }
  });

  const queryParamState = useMemo(
    () =>
      Object.entries(initialState).reduce(
        (state, entry) => {
          const [key, val] = entry;

          if (searchParams.get(key) || val) {
            state[key] = searchParams.get(key) || val;
          }

          return state;
        },
        { ...uncontrolledQueryParams }
      ),
    [initialState, searchParams, uncontrolledQueryParams]
  );

  const setQueryParams = useCallback(
    (pairs) => {
      const urlSearchParams = new URLSearchParams();

      Object.entries(pairs).forEach(
        ([key, value]) => value !== undefined && urlSearchParams.set(key, value)
      );

      setSearchParams(urlSearchParams);
    },
    [setSearchParams]
  );

  return [queryParamState, setQueryParams];
};
