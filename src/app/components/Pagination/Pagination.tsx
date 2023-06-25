import { getPageLink } from '@/lib/blog-helper';
import Link from 'next/link';
import React from 'react';

type Props = {
  tag: string;
  numOfPages: number;
}

function Pagination(props: Props) {
  const {tag, numOfPages} = props;

  let pages = [];
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }
  // console.log(pages);

  return (
    <section className='mb-8 lg:w-1/2 mx-auto rounded-md p-5'>
      <ul className='flex items-center justify-center gap-4'>
        {pages.map((page) => (
          <li className='bg-sky-900 rounded-lg w-6 h-8 relative' key={page}>
            <Link
              href={getPageLink(tag, page)}
              className='text-gray-900 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Pagination;
