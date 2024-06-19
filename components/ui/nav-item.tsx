"use client";
import type { TreeNode } from "@/lib/utils/types";
import { usePathname } from "next/navigation";
import { LinkItem } from "./link-item";

export function NavItem({ node }: { node: TreeNode }) {
  const pathname = usePathname();
  return (
    <>
      {node.children.length > 0 ? (
        <li
          className={`hs-accordion ${pathname.includes(node.slug) ? `active` : ``}`}
          id={`${node.slug}-accordion`}
        >
          <button
            type="button"
            className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-neutral-700 hover:bg-gray-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white"
          >
            {node.title}
            <svg
              className="ms-auto hidden size-4 hs-accordion-active:block"
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
              <path d="m18 15-6-6-6 6" />
            </svg>
            <svg
              className="ms-auto block size-4 hs-accordion-active:hidden"
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div
            id={`${node.slug}-accordion-child`}
            className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${pathname.includes(node.slug) ? `` : `hidden`}`}
          >
            <ul className="hs-accordion-group ps-3 pt-2">
              <>
                {node.children.map((childNode) => (
                  <NavItem node={childNode} key={childNode.id} />
                ))}
              </>
            </ul>
          </div>
        </li>
      ) : (
        <li key={node.slug}>
          <LinkItem node={node} />
        </li>
      )}
    </>
  );
}
