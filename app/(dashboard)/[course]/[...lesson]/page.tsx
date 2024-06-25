import { AssignmentUpload } from "@/components/ui/assignment-upload";
import { CustomMDX } from "@/components/ui/mdx-remote";
import { fetchPageBySlug, fetchSlugs } from "@/lib/utils/notion";

export const dynamic = "force-static";

export default async function Page({
  params,
}: {
  params: { lesson: string[]; course: string };
}) {
  const { markdown, type } = await fetchPageBySlug(
    params.lesson[params.lesson.length - 1],
    params.course,
  );
  return (
    <>
      <div className="w-full">
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
  const pageSlugs = await fetchSlugs();
  return pageSlugs;
}
