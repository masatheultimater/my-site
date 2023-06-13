import Link from 'next/link';
import Post from './components/Post/Post';
import { fetchAllInDB, getAllTags, getPostsForTopPage } from './lib/notion/notionAPI';
import Tag from './components/Tag/Tag';

export const revalidate = 1;

export default async function Home() {
  const fourPosts = await getPostsForTopPage();
  const allTags = await getAllTags();
  // console.log('All Posts Page IDs:');
  // console.log(allPosts);

  return (
    <div className='container h-full w-full mx-auto font-mono'>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>Notion Blog</h1>
        {fourPosts.map((post) => (
          <Post
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
            isPaginationPage={false}
          />
        ))}
        <Link
          href='/posts/page/1'
          className='mb-6 lg:w-1/2 mx-auto rounded-md px-5 block text-center'
        >
          もっと見る
        </Link>
        <Tag tags={allTags}/>
      </main>
    </div>
  );
}
