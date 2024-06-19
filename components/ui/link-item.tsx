"use client";
import type { TreeNode } from "@/lib/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LinkItem({ node }: { node: TreeNode }) {
  const pathname = usePathname();
  return (
    <Link
      className={`flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-neutral-700 hover:bg-gray-100 dark:bg-neutral-700 dark:text-white ${node.slug === pathname.replaceAll("/course/", "") ? ` bg-gray-100` : ``}`}
      href={`/course/${node.slug}`}
    >
      {node.title}
    </Link>
  );
}
