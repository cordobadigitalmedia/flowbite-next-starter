import { Logo } from "@/components/ui/logo";
import { Sidebar } from "@/components/ui/sidebar";
import { fetchLessons } from "@/lib/utils/notion";
import { buildTree } from "@/lib/utils/parser";
import type { Page } from "@/lib/utils/types";

export const dynamic = "force-static";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { course: string };
}) {
  const notionDB = await fetchLessons(params.course);
  const { tree } = buildTree(notionDB.results as Page[], params.course);
  return (
    <>
      <div
        id="application-sidebar"
        className="hs-overlay fixed inset-y-0 start-0 z-[60] hidden w-[260px] -translate-x-full border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="px-8 pt-4">
          <Logo />
        </div>
        <Sidebar navData={tree} course={params.course} />
      </div>
      {children}
    </>
  );
}
