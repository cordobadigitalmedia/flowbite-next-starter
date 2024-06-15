import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  iconOnly?: boolean;
}

export function Logo({ iconOnly = false }: LogoProps) {
  return (
    <Link
      className="flex rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
      href="../templates/admin/index.html"
      aria-label="Preline"
    >
      <Image
        alt="Site logo"
        height="24"
        src="/lawh-logo-square.png"
        width="24"
      />
      {!iconOnly && <span>LMS</span>}
    </Link>
  );
}
