"use client";

import TutorialLayout from "@/components/Tutorial";
import React, { useState, useEffect, useCallback } from "react";

// List component that receives a function to get items
function List({ getItems }: { getItems: () => number[] }) {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    setItems(getItems());
    console.log("Items updated");
  }, [getItems]);

  return (
    <ul>
      {items.map((item) => ( 
        <li key={item} className="p-2 border border-gray-300 rounded mb-2">
          Item: {item}
        </li>
      ))}
    </ul>
  );
}

export default function UseCallbackPage() {
  const sections = [
      { label: "Objective", href: "#objective" },
      { label: "Explanation", href: "#explanation" },
      { label: "Differences between UseMemo and UseCallback", href: "#differences" },
      { label: "References", href: "#reference" },
    ];
  
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const getItems = useCallback(() => {
    return [number, number + 1, number + 2];
}, [number]);
  
  return (
    <TutorialLayout title="useCallback Tutorial" sections={sections}>
      {/* Objective */}
      <section id="objective" className="space-y-2 mb-6">
        <h2 className="h2">Objective</h2>
        <p>Use useCallback to memoize functions and prevent unnecessary re-renders in child components.</p>
      </section>

      {/* Theme and Number Input */}
      <section className="space-y-4">
        <div className="flex items-center gap-4">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setDark(prev => !prev)}
          className={`btn btn-active`}
        >
          Toggle Theme
        </button>
      </div>
      <div
      className={`p-4 rounded shadow text-center ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
      >
        <List getItems={getItems} />
      </div>
      </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="ol">
          <li>Use useCallback to memoize the getItems function.</li>
          <li>Input field to enter a number.</li>
          <li>Button to toggle between light and dark themes.</li>
          <li>Display a list of items based on the input number.</li>
        </ol>
      </section>

      {/* Explanation */}
      <section id="explanation" className="space-y-2 mb-6">
        <h2 className="text-2xl font-semibold">What is Happening Here</h2>
        <p>When the theme is toggled, the List component re-renders because it receives a new getItems function on each render.</p>
        <p>This causes the List component to recompute and re-render all items, even though the number hasn't changed.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`useEffect(() => {
    setItems(getItems());
    console.log("Items updated");
  }, [getItems]);`}
            </code>
        </pre>
        <p>To prevent unnecessary re-renders, we can use useCallback to memoize the getItems function so that it only changes when the number changes.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`//Before
const getItems = () => {
    return [number, number + 1, number + 2];
}

// After
const getItems = useCallback(() => {
    return [number, number + 1, number + 2];
}, [number]);`}
            </code>
        </pre>
      </section>

      {/* Differences between UseMemo and UseCallback */}
      <section id="differences" className="space-y-2 mb-6">
        <h2 className="h2">Differences between UseMemo and UseCallback</h2>
        <p>
        <strong>useMemo:</strong> Returns a memoized value. It is used to optimize expensive calculations by caching the result based on dependencies.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`const doubleNumber = useMemo(() => slowFunction(number), [number]);`}
          </code>
        </pre>
        <p>
        <strong>useCallback:</strong> Returns a memoized function. It is used to prevent unnecessary re-creations of functions, especially when passing them as props to child components.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []);`}
          </code>
        </pre>
      </section>

      {/* References */}
      <section id="reference" className="space-y-2 mb-6">
        <h2 className="h2">References</h2>

          {/* Video Reference */}
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=_AyFP5s69N4&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 React Hooks Tutorial on YouTube
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Beginner-friendly walkthrough of the <code>useCallback</code> hook in React, showing how to memoize functions.
            </p>
          </div>

          {/* Official Docs */}
          <div className="space-y-2">
            <a
              href="https://react.dev/reference/react/useCallback"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📘 React Official Docs — useCallback Reference
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Official documentation on how <code>useCallback</code> works.
            </p>
          </div>
      </section>
    </TutorialLayout>
  )
}
