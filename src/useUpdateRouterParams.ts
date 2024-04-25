import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { NonNullableUrlParams, getUrlParams } from './urlParams';

export type UpdateRouterOptions = {
  /** If true, rerun getStaticProps, getServerSideProps or getInitialProps. Default: false */
  nonShallow?: boolean;
  /** Prevent scrolling to the top of the page after navigation. Default: false*/
  noScroll?: boolean;
};
export type UpdateRouter = (
  routerMethod: 'push' | 'replace',
  params: NonNullableUrlParams,
  options?: UpdateRouterOptions
) => Promise<boolean>;

export type UpdateRouterExplicit = (
  params: NonNullableUrlParams,
  options?: UpdateRouterOptions
) => Promise<boolean>;

export const useUpdateRouterParams = () => {
  const router = useRouter();

  const updateRouterParam = useCallback<UpdateRouter>(
    (routerMethod, params, options = {}) => {
      const routerParams = getUrlParams(router.asPath);

      const queryString = stringify(
        {
          ...query,
          ...params,
        },
        { skipNull: true }
      );

      return router[routerMethod](
        {
          query: '',
        },
        undefined,
        {
          shallow: !options.nonShallow,
          scroll: !options.noScroll,
        }
      );
    },
    [router]
  );

  const replaceRouteParams = useCallback<UpdateRouterExplicit>(
    (params, options) => updateRouterParam('replace', params, options),
    [router]
  );

  const pushRouteParams = useCallback<UpdateRouterExplicit>(
    (params, options) => updateRouterParam('push', params, options),
    [router]
  );

  return {
    replaceRouteParams,
    pushRouteParams,
  };
};
