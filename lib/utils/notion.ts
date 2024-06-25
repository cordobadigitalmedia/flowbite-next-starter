import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { buildTree, uploadImage } from "./parser";
import type { ContentType, CourseItem, CoursePaths, Page } from "./types";

const imgPrefix = `<div className="not-prose flex flex-col justify-center items-center p-0 m-0">`;
const captionPrefix = `<div className="text-sm text-gray-400 pt-2 text-center">`;

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

export const fetchLessons = async (slug: string) => {
  const database_id = await getCourseDatabaseID(slug);
  const results = await fetchDBItems(database_id as string);
  return results;
};

export const fetchCourses = async () => {
  const { results } = await fetchDBItems(process.env.NOTION_COURSES as string);
  const courses: CourseItem[] = [];
  for (const result of results) {
    const { properties } = result as PageObjectResponse;
    const { Image, Name, Description, Slug, Available, Database } = properties;
    let url;
    let title;
    let description;
    let slug;
    let available: boolean = true;
    let database_id;
    if (Image.type === "files") {
      if (Image.files[0].type === "file") {
        const img_url = Image.files[0].file.url;
        url = await uploadImage(img_url, "root");
      }
    }
    if (Name.type === "title") {
      title = Name.title[0].plain_text;
    }
    if (Description.type === "rich_text") {
      description = Description.rich_text[0].plain_text;
    }
    if (Slug.type === "formula") {
      if (Slug.formula.type === "string") {
        slug = Slug.formula.string;
      }
    }
    if (Available.type === "checkbox") {
      available = Available.checkbox as unknown as boolean;
    }
    if (Database.type === "rich_text") {
      database_id = Database.rich_text[0].plain_text;
    }
    courses.push({
      image: url as string,
      title: title as string,
      description: description as string,
      slug: slug as string,
      available,
      database_id: database_id as string,
    });
  }

  return courses;
};

const getCourseDatabaseID = async (slug: string) => {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_COURSES as string,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  let databaseID;
  if (results.length > 0) {
    const { properties } = results[0] as PageObjectResponse;
    const { Database } = properties;
    if (Database.type === "rich_text") {
      databaseID = Database.rich_text[0].plain_text;
    }
  }
  return databaseID;
};

export const fetchPageBySlug = async (slug: string, course_slug: string) => {
  const database_id = await getCourseDatabaseID(course_slug);
  const results = await notion.databases.query({
    database_id: database_id as string,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const log_slug = `${course_slug}_${slug.replaceAll("/", "_")}`;
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
    const pageData = await fetchPageMD(pageid, cType as ContentType, log_slug);
    return pageData;
  } else {
    return { markdown: "", blocks: "", type: "rich text" };
  }
};

export const fetchPageMD = async (
  id: string,
  type: ContentType,
  log_file: string,
) => {
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
    const uploadedURL = await uploadImage(img_url, log_file);
    returnComp += `${imgPrefix}<img src="${uploadedURL}" alt="${captionText}"/>${captionPrefix}${captionText}</div></div>`;
    return returnComp;
  });
  const mdblocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdblocks);
  return { markdown: mdString.parent, blocks: mdblocks, type };
};

export const fetchSlugs = async () => {
  const courses = await fetchCourses();
  const slugs: CoursePaths[] = [];
  for (const course of courses) {
    if (course.available) {
      const notionDB = await fetchLessons(course.slug);
      const { pages } = buildTree(notionDB.results as Page[], course.slug);
      for (const page of pages) {
        slugs.push({ course: course.slug, lesson: page.slug.split("/") });
      }
    } else {
      slugs.push({ course: course.slug });
    }
  }
  return slugs;
};
