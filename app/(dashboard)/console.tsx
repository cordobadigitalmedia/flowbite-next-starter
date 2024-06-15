"use client";
export function Console({ obj }: { obj: unknown }) {
  console.log(obj);
  return <div>Hello world</div>;
}
