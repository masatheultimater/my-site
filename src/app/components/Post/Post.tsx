import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPaginationPage: boolean;
};

const Post = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage } = props;
  return (
    <div>
      {isPaginationPage ? (
        <section className=' bg-sky-800 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all'>
          <div className='lg:flex items-center'>
            <h2 className='text-gray-100 text-2xl font-medium mr-3 mb-2'>
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
          </div>
          <div className='mt-1 mb-2'>
            {tags.map((tag) => (
              <Link href={`/posts/tag/${tag}/page/1`}>
                <span className='text-gray-100 bg-gray-500 rounded-2xl px-2 pb-1 pt-1 font-medium ml-2 mr-2 mb-3'>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <div className='text-gray-400 mr-2 mb-3'>{date}</div>
          <p className='text-gray-100'>{description}</p>
        </section>
      ) : (
        <section className='lg:w-1/2 bg-sky-800 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all'>
          <div className='flex items-center gap-5'>
            <h2 className='text-gray-100 text-2xl font-medium mb-2'>
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className='text-gray-100'>{date}</div>
            {tags.map((tag) => (
              <Link href={`/posts/tag/${tag}/page/1`}>
                <span className='text-gray-100 bg-gray-500 rounded-2xl px-2 pb-1 pt-1 font-medium'>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className='text-gray-100'>{description}</p>
        </section>
      )}
    </div>
  );
};

export default Post;
