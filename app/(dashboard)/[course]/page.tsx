import { CustomMDX } from "@/components/ui/mdx-remote";
import { fetchPageBySlug } from "@/lib/utils/notion";

export const dynamic = "force-static";

export default async function Page({ params }: { params: { course: string } }) {
  const { markdown } = await fetchPageBySlug("welcome", params.course);
  return (
    <>
      <div className="w-full">
        <div className="prose max-w-none space-y-4 p-4 sm:space-y-6 sm:p-6">
          <CustomMDX source={markdown} />
        </div>
      </div>
    </>
  );
}
