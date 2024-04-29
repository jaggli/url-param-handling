export type UrlParam = string | string[] | undefined;
export type UrlParams = Record<string, UrlParam>;
export type NonNullableUrlParam = Exclude<UrlParam, undefined>;
export type NonNullableUrlParams = Record<string, NonNullableUrlParam>;

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
    ...new URL(path, "https://a.b").searchParams.entries(),
  ].reduce<NonNullableUrlParams>((acc, [name, value]) => {
    if (acc[name]) {
      const oldValue = acc[name];
      if (typeof oldValue === "string") {
        acc[name] = [oldValue, value];
      } else {
        oldValue.push(value);
      }
    } else {
      acc[name] = value;
    }
    return acc;
  }, {});

/**
 * Compare two non-nullable url params objects and return the differences
 * between them as a NonNullableUrlParams object. The result will contain
 * the keys that are present in the first object but not in the second, or
 * the keys that are present in both objects but with different values.
 *
 * If there is no difference, the result is null.
 *
 * @example
 * ```ts
 * const paramsA = { a: "1", b: "2", c: ["1", "3"]: d: [ "1", "2", "3" ] };
 * const paramsB = { a: "1", b: "4", c: "1": d: [ "1", "2", "3" ] };
 * const diff = diffParams(paramsA, paramsB);
 * // -> { b: "4", c: "1" }
 * ```
 */
export const diffParams = (
  paramsA: Readonly<NonNullableUrlParams>,
  paramsB: Readonly<UrlParams>
) => {
  const diff: UrlParams = {};
  for (const key in paramsA) {
    const valueA = paramsA[key];
    const valueB = paramsB[key];

    // If the key is not present in the second object, add it to the diff as undefined
    if (!(key in paramsB)) {
      diff[key] = undefined;
    }
    // If both values are arrays, compare them element by element
    else if (Array.isArray(valueA) && Array.isArray(valueB)) {
      if (valueA.length !== valueB.length) {
        diff[key] = valueB;
      } else {
        for (let i = 0; i < valueA.length; i++) {
          if (valueA[i] !== valueB[i]) {
            diff[key] = valueB;
            break;
          }
        }
      }

      // Compare values, if at least one is not an array
    } else if (valueA !== valueB) {
      diff[key] = valueB;
    }
  }

  // add all keys that are present in the second object but not in the first
  for (const key in paramsB) {
    if (!(key in paramsA)) {
      diff[key] = paramsB[key];
    }
  }

  return Object.keys(diff).length ? diff : null;
};

/**
 * Remove empty parameters from a UrlParams object.
 * An empty parameter is a parameter with a value of undefined.
 * If a parameter is an array, it will be removed if all its elements are
 * undefined.
 *
 * @example
 * ```ts
 * const params = { a: "1", b: "2", c: undefined, d: [ "1", "2", "3" ], e: null, f: []};
 * const result = filterUndefinedParams(params);
 * // -> { a: "1", b: "2", d: [ "1", "2", "3" ] }
 */

export const filterUndefinedParams = (params: UrlParams) => {
  const result: NonNullableUrlParams = {};
  for (const key in params) {
    const param = params[key];
    if (
      typeof param === "undefined" ||
      (Array.isArray(param) && param.length === 0)
    ) {
      continue;
    }
    result[key] = param;
  }
  return result;
};
