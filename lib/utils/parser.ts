import * as fs from "fs";
import type { BasePage, DataJson, Page, TreeNode } from "./types";

export const buildTree = (
  pages: Page[],
  course_slug: string,
): { tree: TreeNode[]; pages: BasePage[] } => {
  const nodeMap: Record<string, TreeNode> = {};
  const rootNodes: TreeNode[] = [];

  // Create all nodes and store them in a map
  pages.forEach((page) => {
    nodeMap[page.id] = {
      id: page.id,
      title: page.properties.Name.title[0].plain_text,
      slug: page.properties.Slug.formula.string,
      root_slug: course_slug,
      type: page.properties.type.select.name,
      children: [],
    };
  });

  // Build the tree structure
  pages.forEach((page) => {
    const currentNode = nodeMap[page.id];
    if (page.properties["Parent item"].relation.length > 0) {
      const parentId = page.properties["Parent item"].relation[0].id;
      if (nodeMap[parentId]) {
        currentNode.slug = nodeMap[parentId].slug + "/" + currentNode.slug;
        nodeMap[parentId].children.push(currentNode);
      }
    } else {
      rootNodes.push(currentNode);
    }
  });

  const flatpages: BasePage[] = [];

  for (const value of Object.values(nodeMap)) {
    flatpages.push({
      id: value.id,
      title: value.title,
      slug: `${course_slug}/${value.slug}`,
      type: value.type,
    });
  }

  return { tree: rootNodes, pages: flatpages };
};

export function extractBookmarlUrl(markdown: string): string | null {
  const regex = /\[bookmark\]\((https?:\/\/[^\s]+)\)/;
  const match = markdown.match(regex);
  return match ? match[1] : null;
}

export function isYouTubeUrl(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
}

export function transformToEmbedUrl(url: string): string | null {
  if (!isYouTubeUrl(url)) {
    return null;
  }
  const regex = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export const extractIdFromUrl = (url: string): string | null => {
  try {
    // Use URL API to parse the URL
    const parsedUrl = new URL(url);

    // Get the pathname and split by '/'
    const pathSegments = parsedUrl.pathname.split("/");

    // Assuming the ID is between the filename and the previous '/'
    if (pathSegments.length >= 3) {
      // The ID should be the second last segment
      return pathSegments[pathSegments.length - 2];
    }

    return null;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
};

export const checkIdInJson = (
  filePath: string,
  targetId: string,
): undefined | { url: string | undefined; data: unknown } => {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(filePath, "utf8");

    // Parse the JSON data
    const jsonData: DataJson = JSON.parse(data);
    for (const image of jsonData.images) {
      // eslint-disable-next-line no-prototype-builtins
      if (image.hasOwnProperty(targetId)) {
        return { url: image[targetId], data };
      }
    }
    return { url: undefined, data: jsonData };
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    return undefined;
  }
};
