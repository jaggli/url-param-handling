import { useRouter } from 'next/router';
import { useCallback, useState, useTransition } from 'react';
import { useUpdateRouterParams } from './useUpdateRouterParams';

// internal hook to set a single url parameter
const useInternalSetParam = () => {
  const { replaceRouteParams, pushRouteParams } = useUpdateRouterParams();

  const [queryValue, setQueryValue] = useState<UrlParam | null>();

  const [, startTransition] = useTransition();

  // Custom implementation for useOptimistic
  const setUrlParams = useCallback(
    // Named parameters
    (name: string, value: UrlParam, addHistoryEntry = false) => {
      setQueryValue(value);
      startTransition(() => {
        (addHistoryEntry ? pushRouteParams : replaceRouteParams)({
          [name]: value,
        }).finally(() => {
          setQueryValue(null);
        });
      });
    },
    [replaceRouteParams, pushRouteParams, name]
  );

  return setUrlParams;
};

type SetUrlParams = (params: UrlParams, addHistoryEntry: boolean) => void;

export const useUrlParams = (): [NonNullableUrlParams, SetUrlParams] => {
  const { query: queryParams } = useRouter();

  // Need fix: should not create new object every render
  const [queryValues, setQueryValues] = useState<UrlParams>(() => {
    // initially read from the url and set everything to state

    const nonNullQueryParams: UrlParams = {};
    Object.entries(queryParams).forEach(([name, value]) => {
      if (value === null) {
        value = undefined;
      }
      nonNullQueryParams[name] = value;
    });
    return nonNullQueryParams;
  });

  const setValue = useInternalSetParam();

  const setValues: SetUrlParams = (params, addHistoryEntry) => {
    Object.entries(params).forEach(([name, value]) => {
      if (queryValues[name] === value) {
        return;
      }

      setValue(name, value, addHistoryEntry);
    });
  };

  return [queryValues, setValues] as const;
};
