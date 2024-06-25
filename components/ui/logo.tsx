import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      className="flex rounded-xl text-xl font-semibold text-gray-800 focus:opacity-80 focus:outline-none dark:text-gray-200"
      href="/"
      aria-label="LMS"
    >
      <Image alt="Site logo" height="30" src="/favicon.png" width="30" />
    </Link>
  );
}
