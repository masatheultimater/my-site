import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import {
  fetchAllInDB,
  getPostsByPage,
  getNumberOfPostsPages,
  getAllTags,
} from '@/lib/notion/notionAPI';
import Tag from '@/components/Tag/Tag';

export const revalidate = 1;

const BlogPageList = async ({ params }) => {
  const numOfPages = await getNumberOfPostsPages();
  const postsByPage = await getPostsByPage(params?.page);
  const allTags = await getAllTags();

  return (
    <div className='container h-full w-full mx-auto font-mono'>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>Notion Blog</h1>
        <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
          {postsByPage.map((post) => (
            <div>
              <Post
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination tag={''} numOfPages={numOfPages} />
        <Tag tags={allTags} />
      </main>
    </div>
  );
};

export default BlogPageList;
