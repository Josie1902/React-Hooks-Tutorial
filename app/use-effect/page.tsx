"use client";

import TutorialLayout from "@/components/Tutorial";
import { useEffect, useState } from "react";

export default function UseEffectPage() {

  const [resourceType, setResourceType] = useState("posts")
  const [data, setData] = useState<any[]>([])

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const sections = [
    { label: "Objective 1", href: "#objective1" },
    { label: "Explanation 1", href: "#explanation1" },
    { label: "Objective 2", href: "#objective2" },
    { label: "Explanation 2", href: "#explanation2" },
    { label: "References", href: "#references" },
  ];

  // When page is rendered, fetch data from endpoint based on resourceType
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then(response => response.json())
      .then(json => setData(json.slice(0, 3)))
  }, [resourceType]) // Whenever resourceType changes, refetch data
  // If the dependency array is empty, the effect runs only once on mount

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  // Track window width and update state on resize
  useEffect(() => {
    // This is considered the next side effect
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove event listener on unmount last time
    // This function runs first before the next effect is executed
    return () =>{
      window.removeEventListener("resize", handleResize);
    }
  },[])

  return(
    <TutorialLayout title="useEffect Tutorial" sections={sections}>
      {/* Objective 1 */}
      <section id="objective1" className="space-y-2 mb-6">
        <h2 className="text-2xl font-semibold">Objective 1</h2>
        <p>Create buttons that queries endpoint and returns back a json format when resource type is changed</p>
      </section>
      
      {/* Resource Type Selector */}
      <section className="rounded-lg border bg-muted/40 p-4 mb-6 max-w-2xl">
        <div className="inline-flex rounded-lg border bg-muted/60 p-1 mb-3">
          {["posts", "users", "comments"].map(type => (
            <button
              key={type}
              onClick={() => setResourceType(type)}
              className={`
                px-4 py-1.5 text-sm font-medium rounded-md transition
                ${
                  resourceType === type
                    ? "bg-background border border-border shadow-sm text-foreground"
                    : "bg-background/70 text-muted-foreground hover:text-foreground hover:bg-background"
                }
              `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Current resource:{" "}
          <span className="font-medium text-foreground">{resourceType}</span>
        </p>

        {data.length > 0 && data.map((item) => (
          <pre key={item.id} className="bg-muted/50 p-2 rounded-md text-xs mt-2 overflow-x-auto">
            {JSON.stringify(item, null, 2)}
          </pre>
        ))}
      </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>When resource type is changed, fetch data from endpoint</li>
          <li>If resource type remains the same, do not refetch data</li>
        </ol>
      </section>

      {/* Explanation */}
      <section id="explanation1" className="space-y-2 mb-6">
        <h2 className="text-2xl font-semibold">What is Happening Here</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`useEffect(() => {
  fetch(\`https://jsonplaceholder.typicode.com/\${resourceType}\`)
    .then(response => response.json())
    .then(json => setData(json.slice(0, 3)))
}, [resourceType])`}
            </code>
        </pre>
        <p>[] Represents the dependency array</p>
        <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300">
          <li>If the dependency array is empty, the effect runs only once after initial render</li>
          <li>If the dependency array contains values, the effect runs when any of those values change</li>
        </ul>
      </section>

      {/* Objective 2 */}
      <section id="objective2" className="space-y-2 mb-6">
        <h2 className="text-2xl font-semibold">Objective 2</h2>
        <p>Resize window to update window width state</p>
      </section>

      {/* Window Width Tracker */}
      <section className="rounded-lg border bg-muted/40 p-4">
        <p className="text-sm text-muted-foreground">
          Current window width
        </p>
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          {windowWidth}
          <span className="ml-1 text-base font-medium text-muted-foreground">
            px
          </span>
        </p>
      </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>When window is resized, update window width state</li>
        </ol>
      </section>

      {/* Explanation 2*/}
      <section id="explanation2" className="space-y-2 mb-6">
        <h2 className="text-2xl font-semibold">What is Happening Here</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () =>{
      window.removeEventListener("resize", handleResize);
    }
  },[])`}
            </code>
        </pre>
        <p>Return is used within a useEffect hook to define a clean up function</p>
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>When component is mounted, the effect runs and sets up the event listener</li>
          <li>When component is unmounted, the cleanup function runs and removes the event listener</li>
          <li>This prevents memory leaks by ensuring event listeners are properly cleaned up</li>
        </ol>
      </section>

      {/* References */}
        <section id="references" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">References</h2>

          {/* Video Reference */}
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=0ZJgIjIuY7U&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 React Hooks Tutorial on YouTube
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Beginner-friendly walkthrough of the <code>useEffect</code> hook in React, showing how to handle side effects and clean up.
            </p>
          </div>

          {/* Official Docs */}
          <div className="space-y-2">
            <a
              href="https://react.dev/reference/react/useEffect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📘 React Official Docs — useEffect Reference
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Official documentation on how <code>useEffect</code> works.
            </p>
          </div>
        </section>

    </TutorialLayout>
  );
}
