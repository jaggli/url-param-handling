import { FakeLink } from '@/src/fakeLink';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <h1>This is Search</h1>
      <pre>{router.asPath}</pre>
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
      <br />
      <Link href="/?one=two">home</Link>
      <br />
      <br />
      <FakeLink />
    </div>
  );
}
