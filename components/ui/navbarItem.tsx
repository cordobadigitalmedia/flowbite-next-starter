"use client";
import { Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";

export function NavbarItem({
  item,
}: {
  item: { href: string; name: string };
}): JSX.Element {
  const pathname = usePathname();
  return (
    <Navbar.Link
      href={item.href}
      key={item.name}
      active={pathname === item.href ? true : false}
    >
      {item.name}
    </Navbar.Link>
  );
}
