import { AssignmentUpload } from "@/components/ui/assignment-upload";
import { CustomMDX } from "@/components/ui/mdx-remote";
import { fetchLessons, fetchPageBySlug } from "@/lib/utils/notion";
import { buildTree } from "@/lib/utils/parser";
import type { Page } from "@/lib/utils/types";

export default async function Page({
  params,
}: {
  params: { lesson: string[] };
}) {
  const { markdown, type } = await fetchPageBySlug(
    params.lesson[params.lesson.length - 1],
  );
  return (
    <>
      <div className="w-full max-w-7xl lg:ps-64">
        <div className="prose max-w-none space-y-4 p-4 sm:space-y-6 sm:p-6">
          {type === "assignment" ? (
            <>
              <CustomMDX source={markdown} />
              <AssignmentUpload />
            </>
          ) : (
            <CustomMDX source={markdown} />
          )}
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const notionDB = await fetchLessons();
  const { pages } = buildTree(notionDB.results as Page[]);
  return pages.map((node) => ({
    lesson: node.slug.split("/"),
  }));
}
