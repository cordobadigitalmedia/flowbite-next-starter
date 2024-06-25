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
  const { results, title } = await fetchLessons(params.course);
  const { tree } = buildTree(results.results as Page[], params.course);
  return (
    <>
      <div className="relative mx-auto flex max-w-7xl">
        <div
          className="hs-overlay fixed inset-y-0 top-[58px] hidden w-[300px] min-w-[300px] max-w-[300px] grow -translate-x-full border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
          id="application-sidebar"
        >
          <div className="text-md px-6 py-2 text-slate-400">{title}</div>
          <Sidebar navData={tree} course={params.course} />
        </div>
        <div className="grow pl-[310px]">{children}</div>
      </div>
    </>
  );
}
