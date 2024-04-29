import { LinkButtons } from "@/src/components/linkButtons";
import { RenderCounter } from "@/src/components/renderCounter";
import { useUrlParams } from "@/src/useUrlParams";
import { GetServerSideProps } from "next";
import Link from "next/link";

export default function Search() {
  const [urlParams] = useUrlParams();

  return (
    <div>
      <h1>This is Search</h1>
      <RenderCounter>Search</RenderCounter>
      <pre>{JSON.stringify(urlParams, null, 2)}</pre>
      <br />
      <Link href="/?one=two">home</Link>
      <br />
      <br />
      <LinkButtons />
      <br />
    </div>
  );
}
export const getServerSideProps = (async ({ resolvedUrl: path }) => ({
  props: { path },
})) satisfies GetServerSideProps<{ path: string }>;
