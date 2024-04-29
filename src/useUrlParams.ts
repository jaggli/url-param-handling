import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";

import {
  NonNullableUrlParam,
  NonNullableUrlParams,
  UrlParams,
  diffParams,
  filterUndefinedParams,
  getUrlParams,
} from "./urlParams";
import { useUpdateRouterParams } from "./useUpdateRouterParams";

type SetUrlParams = (params: UrlParams, addHistoryEntry?: boolean) => void;

export const useUrlParams = (): [NonNullableUrlParams, SetUrlParams] => {
  const { asPath: routerPath } = useRouter();
  const { pushRouteParams, replaceRouteParams } = useUpdateRouterParams();
  const [urlParams, setUrlParams] = useState<NonNullableUrlParams>(
    filterUndefinedParams(getUrlParams(routerPath))
  );

  console.log("useUrlParams", urlParams, routerPath);

  const setValues: SetUrlParams = useCallback(
    (params, addHistoryEntry) => {
      const diff = diffParams(urlParams, params);
      if (!diff) {
        return;
      }

      const filteredParams = filterUndefinedParams(params);

      console.log("set value diff", filteredParams);

      // update state
      setUrlParams(() => filteredParams);

      const updateMethod = addHistoryEntry
        ? pushRouteParams
        : replaceRouteParams;

      // intentionally fire and forget (not awaiting the promise)
      updateMethod(filteredParams);
    },
    [pushRouteParams, replaceRouteParams, urlParams]
  );

  return [urlParams, setValues];
};

export const useUrlParam = (
  paramName: string
): [NonNullableUrlParam, (value: string) => void] => {
  const [urlParams, setUrlParams] = useUrlParams();

  const value = urlParams[paramName] || "";
  const setValue = (newValue: string, addHistoryEntry?: boolean) => {
    setUrlParams({ ...urlParams, [paramName]: newValue }, addHistoryEntry);
  };

  return [value, setValue];
};
