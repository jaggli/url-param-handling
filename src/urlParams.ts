export type UrlParam = string | string[] | undefined;
export type UrlParams = Record<string, UrlParam>;
export type NonNullableUrlParams = Record<string, Exclude<UrlParam, undefined>>;

/**
 * Get search params from a router path (e.g. router.asPath)
 * from it.
 * - Multiple ocurences of the same parameter result in a string[]
 * - Empty params results in empty strings
 *
 * @example
 * ```ts
 * const params = getUrlParams(
 *   "/some/routes?a=1&a=2&b=3&c="
 * ) // -> { a: ["1", "2"], b: "3", c: "" }
 * ```
 */
export const getUrlParams = (path: string) =>
  [
    ...new URL(path, 'https://a.b').searchParams.entries(),
  ].reduce<NonNullableUrlParams>((acc, [name, value]) => {
    if (!value) {
      return acc;
    }
    if (acc[name]) {
      const oldValue = acc[name];
      if (typeof oldValue === 'string') {
        acc[name] = [oldValue, value];
      } else {
        oldValue.push(value);
      }
    } else {
      acc[name] = value;
    }
    return acc;
  }, {});

export const diffParams = (
  paramsA: NonNullableUrlParams,
  paramsB: NonNullableUrlParams
) => {
  const entriesA = 
};
