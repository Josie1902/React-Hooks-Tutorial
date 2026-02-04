"use client";

import TutorialLayout from "@/components/Tutorial";
import React, { useState, useMemo } from "react";

// Simulate a slow function
function slowFunction(num: number) {
  console.log("Calling Slow Function");
  for (let i = 0; i <= 1000000000; i++) {}  
  return num * 2;
}

export default function UseMemoPage() {
  const sections = [
    { label: "Objective", href: "#objective" },
    { label: "Performance with UseMemo", href: "#performance" },
    { label: "Referential Equality", href: "#referential-equality" },
    { label: "References", href: "#reference" },
  ];

  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // Memoize slow calculation
  const doubleNumber = useMemo(() => slowFunction(number), [number]);

  return (
    <TutorialLayout title="useMemo Tutorial" sections={sections}>
      
      {/* Objective */}
      <section id="objective" className="space-y-2 mb-6">
        <h2 className="h2">Objective</h2>
        <p className="p">Use <code>useMemo</code> to memoize expensive calculations and avoid unnecessary re-computations.</p>
      </section>

      {/* Theme & Number Input */}
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
          Double Number: {doubleNumber}
        </div>
      </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="ol">
          <li>Input field to enter a number.</li>
          <li>Button to toggle between light and dark themes.</li>
          <li>Display the doubled value of the input number.</li>
          <li>Ensure that toggling the theme does not trigger re-computation of the doubled value.</li>
        </ol>
      </section>

      {/* Performance Issue */}
      <section id="performance" className="space-y-2 mb-6">
        <h2 className="h2">Performance with UseMemo</h2>
        <p>When the state is updated in React, all components in the tree are re-rendered. That means the code reruns from top to bottom on every render.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`const doubleNumber = slowFunction(number);`}
                </code>
              </pre>
              <p className="p">
                This approach recalculates the doubled number on every render, even when the theme changes.
                This leads to performance issues, especially with slow functions.
              </p>
            </div>

            {/* Right */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`const doubleNumber = useMemo(() => slowFunction(number), [number]);`}
                </code>
              </pre>
              <p className="p">
                Notice how toggling the theme is instantaneous, even with the slow
                function in place. This is because <code>useMemo</code> prevents
                unnecessary recalculations of the doubled number by caching the result
                when the number changes.
              </p>
            </div>
          </div>

          {/* Callout - Component Tree*/}
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded-md border-l-4 border-blue-400 dark:border-blue-600 my-4">
            <div className="text-blue-700 dark:text-blue-300 font-bold">Note</div>
            <div className="text-gray-700 dark:text-gray-300">
              <p>
                In React, the <strong>component tree</strong> is the hierarchical structure of all components in your app, 
                where parent components contain child components.
              </p>
            </div>
          </div>

          {/* When to use useMemo */}
          <p className="p">Why not user <code>useMemo</code> in every case?</p>
          <ul className="ul">
            <li>Memory Overhead: Caching values consumes memory. Overusing <code>useMemo</code> can lead to increased memory usage.</li>
            <li>
              Complexity: It adds complexity to your code. Use it only when necessary for performance optimization. For example, the slow function in this tutorial can be optimised
              over changing themes.
            </li>
          </ul>
      </section>

      <section id="referential-equality" className="space-y-2 mb-6">
        <h2 className="h2">Referential Equality</h2>
        <p>Definition: Two variables reference the same object in memory.</p>
        <p>For our example above, if the <code>number</code> hasn't changed, the reference to the cached value remains the same,
            allowing React to skip re-computation.</p>
        <p>Since our number is a <a className="a" href="https://developer.mozilla.org/en-US/docs/Glossary/Primitive">primitive type</a>, referential equality works as expected.</p>
        <p className="mt-3">However, this is not the case for arrays and objects as they are <a className="a" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures">reference data types</a>.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
           <code>
{`const var1 = 1
const var2 = 1;
console.log(var1 === var2); // true
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false`}
           </code>
        </pre>
        <p>Now suppose the dependencies in <code>useMemo</code> are arrays or objects.</p>
        <p>If you create a new array or object on every render, even if the values are the same, React will see them as different references and recompute the value.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`const obj = { value: number };

const doubleNumber = useMemo(() => slowFunction(obj.value), [obj]);
// This will recompute on every render because 'obj' is a new reference each time.`}
          </code>
        </pre>
        <p>To avoid this, ensure that the dependencies are stable references. You can use <code>useMemo</code> or <code>useCallback</code> to memoize objects or arrays used as dependencies.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`const obj = useMemo(() => ({ value: number }), [number]);

const doubleNumber = useMemo(() => slowFunction(obj.value), [obj]);`}
          </code>
        </pre>
      </section>

      {/* References */}
      <section id="reference" className="space-y-2 mb-6">
        <h2 className="h2">References</h2>

          {/* Video Reference */}
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=THL1OPn72vo&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 React Hooks Tutorial on YouTube
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Beginner-friendly walkthrough of the <code>useMemo</code> hook in React, showing how to memoize expensive computations.
            </p>
          </div>

          {/* Official Docs */}
          <div className="space-y-2">
            <a
              href="https://react.dev/reference/react/useMemo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📘 React Official Docs — useMemo Reference
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Official documentation on how <code>useMemo</code> works.
            </p>
          </div>
      </section>

    </TutorialLayout>
  );
}
