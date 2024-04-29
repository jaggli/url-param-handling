import { LinkButtons } from "@/src/components/linkButtons";
import { RenderCounter } from "@/src/components/renderCounter";
import { useUrlParams } from "@/src/useUrlParams";
import { GetServerSideProps } from "next";
import Link from "next/link";

export default function Home() {
  const [urlParams] = useUrlParams();

  console.log("render Home", urlParams);

  return (
    <div>
      <h1>This is Home</h1>
      <RenderCounter>Home</RenderCounter>
      <pre>{JSON.stringify(urlParams, null, 2)}</pre>
      <br />
      <Link href="/search?whatever=what&whatever=whatever&one=two&three=">
        search
      </Link>
      <br />
      <br />
      <Link href="/">home</Link>
      <br />
      <br />
      <LinkButtons />
    </div>
  );
}
export const getServerSideProps = (async ({ resolvedUrl: path }) => ({
  props: { path },
})) satisfies GetServerSideProps<{ path: string }>;
