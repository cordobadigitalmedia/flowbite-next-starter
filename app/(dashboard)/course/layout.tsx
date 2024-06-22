import { Logo } from "@/components/ui/logo";
import { Sidebar } from "@/components/ui/sidebar";
import { fetchSiteDB } from "@/lib/utils/notion";
import { buildTree } from "@/lib/utils/parser";
import type { Page } from "@/lib/utils/types";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notionDB = await fetchSiteDB();
  const { tree } = buildTree(notionDB.results as Page[]);
  return (
    <>
      <div
        id="application-sidebar"
        className="hs-overlay fixed inset-y-0 start-0 z-[60] hidden w-[260px] -translate-x-full border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="px-8 pt-4">
          <Logo />
        </div>
        <Sidebar navData={tree} />
      </div>
      {children}
    </>
  );
}
