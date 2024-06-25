import { Card } from "@/components/ui/course-card";
import { fetchCourses } from "@/lib/utils/notion";

export default async function Page() {
  const courses = await fetchCourses();
  return (
    <>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 p-3 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((item) => (
            <Card item={item} key={item.slug} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-3">
          No Courses Available
        </div>
      )}
    </>
  );
}
