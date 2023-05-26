"use client";

import Projects from "./components/projects/projects";

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <Projects />
    </main>
  );
}
