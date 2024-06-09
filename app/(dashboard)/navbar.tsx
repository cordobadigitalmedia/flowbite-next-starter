import { NavbarItem } from "@/components/ui/navbarItem";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import navigation from "@data/navigation.json";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

export const DashboardNavbar: FC<Record<string, never>> = function () {
  /**
  const { isCollapsed: isSidebarCollapsed, setCollapsed: setSidebarCollapsed } =
    useSidebarContext();
     */
  const { headerLinks } = navigation;
  return (
    <div className="fixed top-0 z-30 w-full bg-white dark:bg-gray-800">
      <header className="container mx-auto max-w-7xl">
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="/">
            <Image
              alt="Site logo"
              height="24"
              src="/lawh-logo-square.png"
              width="24"
            />
            <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
              CDM Learning
            </span>
          </Navbar.Brand>
          <div className="flex gap-2 md:order-2">
            <DarkThemeToggle />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            {headerLinks.map((item) => (
              <NavbarItem item={item} key={item.name} />
            ))}
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  );
};
