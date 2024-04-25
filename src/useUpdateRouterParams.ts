import { useRouter } from "next/router";
import { useCallback } from "react";
import { NonNullableUrlParams, diffParams, getUrlParams } from "./urlParams";

export type UpdateRouterOptions = {
  /** If true, rerun getStaticProps, getServerSideProps or getInitialProps. Default: false */
  nonShallow?: boolean;
  /** Prevent scrolling to the top of the page after navigation. Default: false*/
  noScroll?: boolean;
};

type UpdateRouterInternal = (
  routerMethod: "push" | "replace",
  params: NonNullableUrlParams,
  options?: UpdateRouterOptions
) => Promise<boolean>;

export type UpdateRouter = (
  params: NonNullableUrlParams,
  options?: UpdateRouterOptions
) => Promise<boolean>;

export const useUpdateRouterParams = () => {
  const router = useRouter();

  const updateRouterParam = useCallback<UpdateRouterInternal>(
    (routerMethod, params, options = {}) => {
      const currentParams = getUrlParams(router.asPath);

      // if there is no difference between the current params and the new params
      // we don't need to update the router
      if (!diffParams(currentParams, params)) {
        return Promise.resolve(false);
      }

      // execute the router method with the new params
      return router[routerMethod]({ query: params }, undefined, {
        shallow: !options.nonShallow,
        scroll: !options.noScroll,
      });
    },
    [router]
  );

  const replaceRouteParams = useCallback<UpdateRouter>(
    (params, options) => updateRouterParam("replace", params, options),
    [updateRouterParam]
  );

  const pushRouteParams = useCallback<UpdateRouter>(
    (params, options) => updateRouterParam("push", params, options),
    [updateRouterParam]
  );

  return {
    replaceRouteParams,
    pushRouteParams,
  };
};
