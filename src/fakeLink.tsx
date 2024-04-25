import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export const FakeLink = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('query reference changed');
  }, [router.query]);

  return (
    <>
      <div
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        onClick={() => {
          router.push({
            query: {
              this: 'params',
              were: 'set',
              by: ['fake', 'link']
            },
          });
        }}
      >
        {' '}
        set query to arbitrary values{' '}
      </div>
      <div
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        onClick={() => {
          router.push({
            query: {
              ...router.query,
            },
          });
        }}
      >
        {' '}
        set query to the same values{' '}
      </div>
    </>
  );
};
