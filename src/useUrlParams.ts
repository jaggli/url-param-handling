import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  NonNullableUrlParams,
  UrlParams,
  diffParams,
  filterUndefinedParams,
  getUrlParams,
} from "./urlParams";

type SetUrlParams = (params: UrlParams, addHistoryEntry: boolean) => void;

export const useUrlParams = (): [NonNullableUrlParams, SetUrlParams] => {
  const { asPath: routerPath } = useRouter();
  const urlParams = useRef<UrlParams>(getUrlParams(routerPath));
  const cleanUrlParams = useRef<NonNullableUrlParams>(
    filterUndefinedParams(urlParams.current)
  );

  // manual render controll to update the urlParams
  const [, setTick] = useState(0);
  const triggerRender = () => setTick((tick) => tick + 1);

  const setValues: SetUrlParams = (params, addHistoryEntry) => {
    const diff = diffParams(cleanUrlParams.current, params);
  };

  return [cleanUrlParams.current, setValues] as const;
};
