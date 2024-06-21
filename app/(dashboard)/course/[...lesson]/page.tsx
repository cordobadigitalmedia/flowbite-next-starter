import { Header } from "@/components/ui/header";
import { Logo } from "@/components/ui/logo";
import { Sidebar } from "@/components/ui/sidebar";
import { fetchPageBySlug, fetchSiteDB } from "@/lib/utils/notion";
import { buildTree } from "@/lib/utils/parser";
import type { Page } from "@/lib/utils/types";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Page({
  params,
}: {
  params: { lesson: string[] };
}) {
  const notionDB = await fetchSiteDB();
  const { tree } = buildTree(notionDB.results as Page[]);
  const { markdown } = await fetchPageBySlug(
    params.lesson[params.lesson.length - 1],
  );
  return (
    <div>
      <Header />
      <div className="sticky inset-x-0 top-0 z-20 border-y bg-white px-4 sm:px-6 md:px-8 lg:hidden dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center justify-between py-2">
          <ol className="ms-3 flex items-center whitespace-nowrap">
            <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
              Application Layout
              <svg
                className="mx-3 size-2.5 shrink-0 overflow-visible text-gray-400 dark:text-neutral-500"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </li>
            <li
              className="truncate text-sm font-semibold text-gray-800 dark:text-neutral-400"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          <button
            type="button"
            className="flex items-center justify-center gap-x-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:text-gray-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Sidebar"
          >
            <svg
              className="size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
            </svg>
            <span className="sr-only">Sidebar</span>
          </button>
        </div>
      </div>
      <div
        id="application-sidebar"
        className="hs-overlay fixed inset-y-0 start-0 z-[60] hidden w-[260px] -translate-x-full border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="px-8 pt-4">
          <Logo />
        </div>
        <Sidebar navData={tree} />
      </div>

      <div className="w-full max-w-7xl lg:ps-64">
        <div className="prose max-w-none space-y-4 p-4 sm:space-y-6 sm:p-6">
          <MDXRemote source={markdown} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const notionDB = await fetchSiteDB();
  const { pages } = buildTree(notionDB.results as Page[]);
  return pages.map((node) => ({
    lesson: node.slug.split("/"),
  }));
}
