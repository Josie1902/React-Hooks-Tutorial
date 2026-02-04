"use client";

import TutorialLayout from "@/components/Tutorial";
import React, { useState, useEffect, useRef } from "react";

export default function UseRefPage() {
  const sections = [
      { label: "Objective", href: "#objective" },
      { label: "Common Mistake", href: "#common-mistake" },
      { label: "Correct Approach", href: "#correct-approach" },
      { label: "Explanation", href: "#explanation" },
      { label: "Examples for useRef", href: "#examples" },
    ];

    const [name, setName] = useState("")
    const renderCount = useRef(0); // returns an object with a 'current' property
    useEffect(() => {
      renderCount.current++;
    });

    const prevName = useRef("");
    useEffect(()=> {
      prevName.current = name;
    }, [name]);

    // Wrong approach causing infinite loop
    // const [renderCount, setRenderCount] = useState(0);
    // useEffect(() => {
    //   setRenderCount(prev => prev + 1);
    // }, [])
  
    return (
      <TutorialLayout title="useRef Tutorial" sections={sections}>
        {/* Objective 1 */}
        <section id="objective" className="space-y-2 mb-6">
          <h2 className="h2">Objective</h2>
          <p>Use useRef to access and manipulate DOM elements directly.</p>
        </section>
        
        {/* Name Input */}
        <section className="card space-y-3 max-w-md">
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Enter your name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Type your name..."
          />
          <p className="p">
            Your name is: <span className="font-semibold">{name || "..."}</span> but it used to be <span className="font-semibold">{prevName.current || "..."}</span>
          </p>
          <p className="p">
            {/* Render count: <span className="font-semibold">{renderCount}</span> */} 
            Render count: <span className="font-semibold">{renderCount.current}</span>
          </p>
        </section>

        {/* Requirements */}
        <section className="space-y-2">
          <p className="font-semibold">Requirements</p>
          <ol className="ol">
            <li>Input field to enter your name.</li>
            <li>Display the current name and the previous name using useRef.</li>
            <li>Display the number of times the component has rendered using useRef.</li>
          </ol>
        </section>

        {/* Common Mistake */}
        <section id="common-mistake" className="space-y-2 mb-6">
          <h2 className="h2">Common Mistake</h2>
          <p className="p">Using state to track render counts causes unnecessary re-renders.</p>
          <p>This would cause an infinite loop as state updates trigger re-renders, which in turn update state again.</p>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            <code>
              {`const [renderCount, setRenderCount] = useState(0);
useEffect(() => {
  setRenderCount(prev => prev + 1);
}, [])`}
            </code>
          </pre>
        </section>

        {/* Correct Approach */}
        <section id="correct-approach" className="space-y-2 mb-6">
          <h2 className="h2">Correct Approach</h2>
          <p className="p">Using <code>useRef</code> to track render counts avoids re-renders.</p>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            <code>
              {`const renderCount = useRef(0);
useEffect(() => {
  renderCount.current++;
}, []);`}
            </code>
          </pre>
        </section>

        {/* Explanation */}
        <section id="explanation" className="space-y-2 mb-6">
          <h2 className="h2">Explanation</h2>
          <p className="p"><code>useRef</code> is used to store mutable values that don't trigger re-renders across renders.</p>
          <p>In this example, <code>useRef</code> is used to track the number of times the component renders without causing unnecessary re-renders.</p>
        </section>

        {/* Examples */}
        <section id="examples" className="space-y-2 mb-6">
          <h2 className="h2">Examples for useRef</h2>
          <p>Accessing DOM elements directly.</p>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
  inputRef.current?.focus();
}

<input ref={inputRef} type="text" />
<button onClick={focusInput}>Focus Input</button>
`}
          </pre>
          <p>Storing previous state values.</p>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`const prevName = useRef("");
    useEffect(()=> {
      prevName.current = name;
    }, [name]);
`}
          </pre>
          <p>Keeping mutable values that persist across renders.</p>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`const renderCount = useRef(0);
    useEffect(() => {
      renderCount.current++;
    });
`}
          </pre>
        </section>

        {/* References */}
        <section id="reference" className="space-y-2 mb-6">
          <h2 className="h2">References</h2>

            {/* Video Reference */}
            <div className="space-y-2">
              <a
                href="https://www.youtube.com/watch?v=t2ypzz6gJm0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                🎥 React Hooks Tutorial on YouTube
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Beginner-friendly walkthrough of the <code>useRef</code> hook in React, showing how to track mutable values across renders.
              </p>
            </div>

            {/* Official Docs */}
            <div className="space-y-2">
              <a
                href="https://react.dev/reference/react/useRef"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                📘 React Official Docs — useRef Reference
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Official documentation on how <code>useRef</code> works.
              </p>
            </div>
        </section>
      </TutorialLayout>
    )
}
