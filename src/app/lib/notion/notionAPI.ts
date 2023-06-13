import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NotionBlock } from '@9gustin/react-notion-render';
import { NUMBER_OF_POSTS_PER_PAGE } from '@/app/constants/constants';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function fetchAllInDB() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      }
    ]
  });

  const pageList = response.results;

  return pageList.map((page) => {
    return getPageMetaData(page);
  });
}

const getPageMetaData = (page) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });
    return allTags;
  };

  return {
    id: page.id,
    title: page.properties.Title.title[0].plain_text,
    description: page.properties.Description.rich_text[0].plain_text,
    date: page.properties.Date.date.start,
    slug: page.properties.Slug.rich_text[0].plain_text,
    tags: getTags(page.properties.Tag.multi_select),
  };
};

export async function getBlocks(blockId: string): Promise<NotionBlock[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  // console.log(response.results)

  return response.results as NotionBlock[];
}

export const getSingplePost = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
    page_size: 100,
  });

  const page = response.results[0];
  const blocks = await getBlocks(page.id);
  const metadata = getPageMetaData(page);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  // console.log(mdString.parent)
  // console.log(blocks)

  return {
    metadata,
    markdown: mdString.parent,
  };
};

export const getPostsForTopPage = async (
  pageSize = NUMBER_OF_POSTS_PER_PAGE,
) => {
  const allPosts = fetchAllInDB();
  const fourPosts = (await allPosts).slice(0, pageSize);
  return fourPosts;
};

export const getPostsByPage = async (page: number) => {
  const allPosts = await fetchAllInDB();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};

// 全ての投稿が一覧画面何ページ分か
export const getNumberOfPostsPages = async () => {
  const allPosts = await fetchAllInDB();

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await fetchAllInDB();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName),
  );
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};

export const getNumberOfPagesByTag = async (tagName: string, page: number) => {
  const allPosts = await fetchAllInDB();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName),
  );

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getAllTags = async () => {
  const allPosts = await fetchAllInDB();

  const allTagsDuplicatedList = allPosts.flatMap((post) => post.tags)
  const set = new Set(allTagsDuplicatedList)
  const allTagsList = Array.from(set)
  return allTagsList
}