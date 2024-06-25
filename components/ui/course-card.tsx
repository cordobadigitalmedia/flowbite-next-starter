import type { CourseItem } from "@/lib/utils/types";
import Image from "next/image";
import Link from "next/link";

export function Card({ item }: { item: CourseItem }) {
  return (
    <div className="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70">
      <Image
        alt={item.title}
        className="h-[150px] w-full rounded-t-lg object-cover sm:h-[250px]"
        height={300}
        src={item.image}
        style={{
          aspectRatio: "400/300",
          objectFit: "cover",
        }}
        width={400}
      />
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {item.title}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {item.description}
        </p>
        {item.available ? (
          <Link href={`/${item.slug}/`}>
            <button className="mt-2 inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50">
              Go to Course
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="mt-2 inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
          >
            Not available
          </button>
        )}
      </div>
    </div>
  );
}
