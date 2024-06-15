import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const fetchPageMD = async () => {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  n2m.setCustomTransformer("video", async (block) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { video } = block as any;
    const { type } = video;
    const video_url = video[type].url;
    return `
        <iframe src="${video_url}" frameborder="0" allowfullscreen/>
    `;
  });
  const mdblocks = await n2m.pageToMarkdown("19e772c9f4784533bfbd9c9eed3a5614");
  const mdString = n2m.toMarkdownString(mdblocks);
  return { markdown: mdString.parent, blocks: mdblocks };
};
