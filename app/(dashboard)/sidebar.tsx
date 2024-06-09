import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { FaBrain, FaCompass, FaPeopleArrows, FaTools } from "react-icons/fa";
import { HiUser } from "react-icons/hi";

/**
 *
 * @returns
 *         "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
 */

export const DashboardSidebar: FC = function () {
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      id="sidebar"
      className="hidden sm:block"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/orientation" icon={FaCompass}>
            Orientation
          </Sidebar.Item>
          <Sidebar.Collapse icon={FaBrain} label="Concepts">
            <Sidebar.Item href="#" className="text-wrap">
              Analysis Framework
            </Sidebar.Item>
            <Sidebar.Item href="#" className="text-wrap">
              State of Prisons in Canada
            </Sidebar.Item>
            <Sidebar.Item href="#">Concept of Isolation</Sidebar.Item>
            <Sidebar.Item href="#">Rooted in Islamic Tradition</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={FaTools}>
            Tools & Resources
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Prison Visits
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaPeopleArrows}>
            Community
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
