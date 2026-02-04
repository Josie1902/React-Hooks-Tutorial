"use client";

import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <section className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            React Hooks Tutorial
          </h1>
          <p className="mt-2 text-gray-500">
            Select a hook from the sidebar to get started.
          </p>
        </section>
      </main>
    </div>
  );
}
