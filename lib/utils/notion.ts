import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import React from "react";
import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const fetchSiteDB = React.cache(async () => {
  const results = await notion.databases.query({
    database_id: process.env.NOTION_ROOT_PAGE as string,
    filter: {
      property: "Publish",
      checkbox: {
        equals: true,
      },
    },
    sorts: [{ direction: "ascending", property: "Order" }],
  });
  return results;
});

export const fetchPageBySlug = React.cache(async (slug: string) => {
  const results = await notion.databases.query({
    database_id: process.env.NOTION_ROOT_PAGE as string,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  if (results.results.length > 0) {
    const pageid = results.results[0].id;
    const pageData = fetchPageMD(pageid);
    return pageData;
  } else {
    return { markdown: "", blocks: "" };
  }
});

export const fetchPageMD = async (id: string) => {
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
  const mdblocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdblocks);
  return { markdown: mdString.parent, blocks: mdblocks };
};
