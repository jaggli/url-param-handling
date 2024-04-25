import { FakeLink } from '@/src/fakeLink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const lastRouter = useRef<typeof router>();
  console.log(router);

  return (
    <div>
      <h1>This is Home</h1>
      <pre>{router.asPath}</pre>
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
      <br />
      <Link href="/search?whatever=what&whatever=whatever&one=two&three=">
        search
      </Link>
      <br />
      <br />
      <Link href="/">home</Link>
      <br />
      <br />
      <FakeLink />
    </div>
  );
}
