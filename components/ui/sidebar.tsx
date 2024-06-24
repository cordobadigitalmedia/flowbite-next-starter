import type { TreeNode } from "@/lib/utils/types";
import { NavItem } from "./nav-item";

export function Sidebar({
  navData,
  course,
}: {
  navData: TreeNode[];
  course: string;
}) {
  return (
    <nav className="hs-accordion-group flex w-full flex-col flex-wrap p-6">
      <ul className="space-y-1.5">
        {navData.map((node) => (
          <NavItem node={node} key={node.id} course={course} />
        ))}
      </ul>
    </nav>
  );
}
