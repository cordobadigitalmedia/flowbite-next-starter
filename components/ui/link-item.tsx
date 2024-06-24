"use client";
import type { TreeNode } from "@/lib/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsJournals } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { GoCommentDiscussion } from "react-icons/go";
import { MdOutlinePermMedia, MdOutlineQuiz } from "react-icons/md";

export function LinkItem({ node, course }: { node: TreeNode; course: string }) {
  const pathname = usePathname();
  return (
    <Link
      className={`my-1 flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-neutral-700 hover:bg-gray-100  dark:text-white dark:hover:bg-gray-600 ${node.slug === pathname.replaceAll(`/${course}/`, "") ? ` bg-gray-100  dark:bg-neutral-700` : ``}`}
      href={`/${node.root_slug}/${node.slug}`}
      prefetch={false}
    >
      {node.type === "assignment" && <FaUpload className="w-5" />}
      {node.type === "rich media" && <MdOutlinePermMedia className="w-5" />}
      {node.type === "video" && <FaVideo className="w-5" />}
      {node.type === "discussion" && <GoCommentDiscussion className="w-5" />}
      {node.type === "journal" && <BsJournals className="w-5" />}
      {node.type === "mp quiz" && <MdOutlineQuiz className="w-5" />}
      {node.type === "text quiz" && <MdOutlineQuiz className="w-5" />}
      {node.title}
    </Link>
  );
}
