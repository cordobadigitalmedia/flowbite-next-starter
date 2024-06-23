import { CustomMDX } from "@/components/ui/mdx-remote";
import { fetchPageBySlug } from "@/lib/utils/notion";

export default async function Page({ params }: { params: { course: string } }) {
  const { markdown, type } = await fetchPageBySlug("welcome", params.course);
  return (
    <>
      <div className="w-full max-w-7xl lg:ps-64">
        <div className="prose max-w-none space-y-4 p-4 sm:space-y-6 sm:p-6">
          <CustomMDX source={markdown} />
        </div>
      </div>
    </>
  );
}
