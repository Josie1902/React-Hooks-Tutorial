"use client";

import Sidebar from "@/components/Sidebar";

type Section = {
  label: string;
  href: string;
};

export default function TutorialLayout({
  title,
  sections,
  children,
}: {
  title: string;
  sections: Section[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-7xl">
      {/* Sidebar */}
      <Sidebar sections={sections} />

      {/* Main content */}
      <main className="flex-1 p-10 space-y-10 ml-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h1>

        {children}
      </main>
    </div>
  );
}
