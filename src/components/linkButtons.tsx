import { useUrlParam, useUrlParams } from "../useUrlParams";
import { RenderCounter } from "./renderCounter";

export const LinkButtons = () => {
  const [search, setSearch] = useUrlParam("search");
  const [urlParams, setUrlParams] = useUrlParams();

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <br />
      <br />
      <button
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          setUrlParams({
            this: "params",
            were: "set",
            by: ["link", "button"],
          });
        }}
      >
        set search to arbitrary value
      </button>
      <br />
      <br />
      <button
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          setUrlParams(urlParams);
        }}
      >
        set query to the same values
      </button>
      <br />
      <br />
      <RenderCounter>LinkButtons</RenderCounter>
    </div>
  );
};
