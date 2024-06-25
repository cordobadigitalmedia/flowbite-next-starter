import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  iconOnly?: boolean;
  title?: string;
}

export function Logo({ iconOnly = false, title }: LogoProps) {
  return (
    <Link
      className="flex rounded-xl text-xl font-semibold text-gray-800 focus:opacity-80 focus:outline-none dark:text-gray-200"
      href="/"
      aria-label="Preline"
    >
      {!title && (
        <Image alt="Site logo" height="24" src="/favicon.png" width="24" />
      )}
      {!iconOnly && <span>{title ? title : `Learning Management System`}</span>}
    </Link>
  );
}
