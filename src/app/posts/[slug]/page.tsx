import { getSingplePost } from '@/lib/notion/notionAPI';
import React from 'react';
import PostContent from '@/components/Post/PostContent';
import Link from 'next/link';

export const revalidate = 1;

export default async function Post({ params }) {
  const post = await getSingplePost(params.slug);
  return (
    <section className='container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20'>
      <h2 className='w-full text-2xl font-medium'>{post.metadata.title}</h2>
      <div className='border-b-2 w-1/3 mt-1 border-sky-900'></div>
      <span className='text-gray-500'> posted at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string) => (
        <Link href={`/posts/tag/${tag}/page/1`}>
          <p className='text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2'>
            {tag}
          </p>
        </Link>
      ))}
      <PostContent post={post.markdown}/>
      <Link href="/">
        <span className="pb-20 block mt-3 text-sky-900">ホームに戻る</span>
      </Link>
    </section>
  );
}
