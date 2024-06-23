import { Client } from "@notionhq/client";
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { put } from "@vercel/blob";
import { NotionToMarkdown } from "notion-to-md";
import type { ContentType, CourseItem } from "./types";

const imgPrefix = `<div class="not-prose flex flex-col justify-center items-center p-0 m-0">`;
const captionPrefix = `<div class="text-sm text-gray-400 pt-2 text-center">`;

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const fetchDBItems = async (id: string) => {
  const results = await notion.databases.query({
    database_id: id,
    filter: {
      property: "Publish",
      checkbox: {
        equals: true,
      },
    },
    sorts: [{ direction: "ascending", property: "Order" }],
  });
  return results;
};

export const fetchLessons = async () => {
  const results = await fetchDBItems(process.env.NOTION_LESSONS as string);
  return results;
};

export const fetchCourses = async () => {
  const { results } = await fetchDBItems(process.env.NOTION_COURSES as string);
  console.log(results);
  let courses: CourseItem[] = [];
  for (const result of results) {
    const { properties } = result as DatabaseObjectResponse;
    const { Image, Name, Description, Slug, Available } = properties;
    let url;
    let title;
    let description;
    let slug;
    let available: boolean = true;
    if (Image.type === "files") {
      url = Image.files[0].file.url;
    }
    if (Name.type === "title") {
      title = Name.title[0].plain_text;
    }
    if (Description.type === "rich_text") {
      description = Description.rich_text[0].plain_text;
    }
    if (Slug.type === "formula") {
      slug = Slug.formula.string;
    }
    console.log(Available);
    if (Available.type === "checkbox") {
      available = Available.checkbox as unknown as boolean;
    }
    courses.push({ image: url, title, description, slug, available });
  }

  return courses;
};

export const fetchPageBySlug = async (slug: string) => {
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
    const pageResp = results.results[0] as PageObjectResponse;
    const { type } = pageResp.properties;
    let cType;
    if (type.type === "select") {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { name } = type.select!;
      cType = name;
    }
    //pass database id to fecthMD
    const pageData = await fetchPageMD(pageid, cType as ContentType);
    return pageData;
  } else {
    return { markdown: "", blocks: "", type: "rich text" };
  }
};

export const fetchPageMD = async (id: string, type: ContentType) => {
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
  n2m.setCustomTransformer("image", async (block) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { image } = block as any;
    const { caption } = image as { caption: { plain_text: string }[] };
    const { type } = image;
    const img_url = image[type].url;
    let captionText = "";
    let returnComp = "";
    if (caption.length > 0) {
      captionText = caption.map((item) => item.plain_text).join("\n");
    }
    if (process.env.ENABLE_UPLOAD === "true") {
      //use database id to check if image was uploaded before
      //Save the image id from the url `/032244c2-cdae-4189-be3d-12360518595e/filename.png/jpg` in string separated by | - compare in future to check if exists
      const imageResponse = await fetch(img_url);
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch image");
      }
      const imageBuffer = await imageResponse.arrayBuffer();
      const blob = await put("lms-image", imageBuffer, {
        access: "public",
      });
      returnComp += `${imgPrefix}<img src="${blob.downloadUrl}" alt="${captionText}"/>${captionPrefix}${captionText}</div></div>`;
    } else {
      returnComp += `${imgPrefix}<img src="${img_url}" alt="${captionText}"/>${captionPrefix}${captionText}</div></div>`;
    }
    //after successful upload, set checkbox for database row to checked
    return returnComp;
  });
  const mdblocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdblocks);
  return { markdown: mdString.parent, blocks: mdblocks, type };
};
