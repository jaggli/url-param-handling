import { expect, it, describe } from "vitest";
import {
  diffParams,
  getUrlParams,
  NonNullableUrlParams,
  filterUndefinedParams,
  UrlParams,
} from "./urlParams";

describe("diffParams()", () => {
  it("should return null when both parameters are identical", () => {
    const paramsA: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    const paramsB: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    expect(diffParams(paramsA, paramsB)).toBeNull();
  });

  it("should return the differences between two parameters", () => {
    const paramsA: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    const paramsB: NonNullableUrlParams = {
      a: "1",
      b: "4",
      c: "1",
      d: ["1", "2", "3"],
    };
    expect(diffParams(paramsA, paramsB)).toEqual({ b: "4", c: "1" });
  });

  it("should return the differences when arrays have different lengths", () => {
    const paramsA: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    const paramsB: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3", "4"],
      d: ["1", "2", "3"],
    };
    expect(diffParams(paramsA, paramsB)).toEqual({ c: ["1", "3", "4"] });
  });

  it("should return the differences when arrays have different elements", () => {
    const paramsA: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    const paramsB: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "4"],
      d: ["1", "2", "3"],
    };
    expect(diffParams(paramsA, paramsB)).toEqual({ c: ["1", "4"] });
  });

  it("should return the differences when a parameter is missing", () => {
    const paramsA: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    const paramsB: NonNullableUrlParams = {
      a: "1",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    expect(diffParams(paramsA, paramsB)).toEqual({ b: undefined });
  });

  it("should return the new value when a parameter is added", () => {
    const paramsA: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
    };
    const paramsB: NonNullableUrlParams = {
      a: "1",
      b: "2",
      c: ["1", "3"],
      d: ["1", "2", "3"],
      e: "5",
    };
    expect(diffParams(paramsA, paramsB)).toEqual({ e: "5" });
  });
});

describe("getUrlParams()", () => {
  it("should return an empty object for a path without parameters", () => {
    const path = "/some/routes";
    expect(getUrlParams(path)).toEqual({});
  });

  it("should return an object with parameters for a path with parameters", () => {
    const path = "/some/routes?a=1&b=2";
    const expected: NonNullableUrlParams = { a: "1", b: "2" };
    expect(getUrlParams(path)).toEqual(expected);
  });

  it("should return an object with array of values for parameters with multiple values", () => {
    const path = "/some/routes?a=1&a=2&b=3";
    const expected: NonNullableUrlParams = { a: ["1", "2"], b: "3" };
    expect(getUrlParams(path)).toEqual(expected);
  });

  it("should return an object with empty string for parameters with no value", () => {
    const path = "/some/routes?a=1&b=";
    const expected: NonNullableUrlParams = { a: "1", b: "" };
    expect(getUrlParams(path)).toEqual(expected);
  });
});

describe("filterUndefinedParams()", () => {
  it("should return an empty object when all parameters are undefined or empty arrays", () => {
    const params: UrlParams = { a: undefined, b: [], c: undefined, d: [] };
    expect(filterUndefinedParams(params)).toEqual({});
  });

  it("should return an object with non-empty parameters", () => {
    const params: UrlParams = {
      a: "1",
      b: "2",
      c: undefined,
      d: ["1", "2", "3"],
      e: [],
    };
    const expected: NonNullableUrlParams = {
      a: "1",
      b: "2",
      d: ["1", "2", "3"],
    };
    expect(filterUndefinedParams(params)).toEqual(expected);
  });

  it("should return an object with non-empty arrays", () => {
    const params: UrlParams = { a: "1", b: [], c: ["1", "2"], d: [] };
    const expected: NonNullableUrlParams = { a: "1", c: ["1", "2"] };
    expect(filterUndefinedParams(params)).toEqual(expected);
  });
});
