"use client";

import TutorialLayout from "@/components/Tutorial";
import React, { useState } from "react";

export default function UseStatePage() {
  const [score, setScore] = useState<number>(0);
  const [state, setState] = useState({ count: 0, animal: "cats" });
  const count = state.count;
  const animal = state.animal;

  function handleUp() {
    setScore(prevScore => prevScore + 1);
  }

  function handleDown() {
    setScore(prevScore => prevScore - 1);
  }

  function handleUp2() {
    setState(prevState => ({ ...prevState, count: prevState.count + 1 }));
  }

  function handleDown2() {
    setState(prevState => ({ ...prevState, count: prevState.count - 1 }));
  }

  const sections = [
    { label: "Objective 1", href: "#objective1" },
    { label: "Common Mistakes", href: "#common-mistakes" },
    { label: "Correct Approach", href: "#correct-approach" },
    { label: "Performance", href: "#performance" },
    { label: "Objective 2", href: "#objective2" },
    { label: "State with Objects", href: "#object-state" },
    { label: "References", href: "#references" },
  ];

  return (
    <TutorialLayout title="useState Tutorial" sections={sections}>

        {/* Objective 1 */}
        <section id="objective1" className="space-y-2 mb-6">
          <h2 className="text-2xl font-semibold">Objective 1</h2>
          <p>Create buttons that increment and decrement the score.</p>
        </section>

        {/* Counter */}
        <section className="flex items-center gap-4">
          <button
            onClick={handleDown}
            className="h-10 w-10 rounded-md border text-lg font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            −
          </button>
          <span className="text-xl font-medium min-w-8 text-center">{score}</span>
          <button
            onClick={handleUp}
            className="h-10 w-10 rounded-md border text-lg font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            +
          </button>
        </section>

        {/* Requirements */}
        <section className="space-y-2">
          <p className="font-semibold">Requirements</p>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Variable for score</li>
            <li>Functions to decrement and increment the score</li>
          </ol>
        </section>

        {/* Common mistakes */}
        <section id="common-mistakes" className="space-y-2">
          <h2 className="text-2xl font-semibold">Common Mistakes When Handling State</h2>

          {/* Problem 1 */}
          <div className="space-y-2">
            <p className="font-semibold">Problem 1: Mutating state directly</p>
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
              <code>
{`function handleUp() {
  score += 1
  setScore(score);
}`}
              </code>
            </pre>
            <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300">
              <li>State is read-only, different from a variable where changes can be made.</li>
              <li>React does not allow direct mutations of state.</li>
              <li>React relies on setter functions to trigger re-rendering.</li>
            </ul>
          </div>

          {/* Notes / Side effects */}
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded-md border-l-4 border-blue-400 dark:border-blue-600 mb-4">
            <div className="text-blue-700 dark:text-blue-300 font-bold">Note</div>
            <div className="text-gray-700 dark:text-gray-300">
              <p>A side effect is when a function or piece of code changes state or has an observable effect beyond just returning a value.</p>
              <p>Updating a state is considered a side effect.</p>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="space-y-2">
            <p className="font-semibold">Problem 2: Stale state</p>
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
              <code>
{`function handleUp() {
  setScore(score + 1);
}`}
              </code>
            </pre>
            <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300">
              <li>Stale state is the snapshot of a state variable that is no longer current at the time of execution.</li>
              <li>The function still remembers the old value (closure).</li>
              <li>State updates are asynchronous, so the old state might be used.</li>
            </ul>
          </div>
        </section>

        {/* Correct Approach */}
        <section id="correct-approach" className="space-y-2">
          <h2 className="text-2xl font-semibold">Correct Approach When Handling State</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
            <code>
{`function handleUp() {
  setScore(prevScore => prevScore + 1);
}`}
            </code>
          </pre>
          <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300">
            <li>Functional updates avoid stale state.</li>
            <li>prevScore is always the latest value, not the one captured in the closure.</li>
          </ul>

          {/* Increment Twice Example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`function incrementTwice() {
  setScore(count + 1);
  setScore(count + 1);
}`}
                </code>
              </pre>
              <p><strong>Expectation:</strong> Score increases by 2</p>
              <p><strong>Reality:</strong> Score increases by 1</p>
              <p><strong>Reason:</strong> Stale state issue — both updates used the same old value.</p>
            </div>

            {/* Right */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`function incrementTwice() {
  setScore(prevScore => prevScore + 1);
  setScore(prevScore => prevScore + 1);
}`}
                </code>
              </pre>
              <p><strong>Expectation:</strong> Score increases by 2</p>
              <p><strong>Reality:</strong> Score increases by 2</p>
              <p><strong>Reason:</strong> Functional updates capture the latest state.</p>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section id="performance" className="space-y-2">
          <h2 className="text-2xl font-semibold">Performance with useState</h2>
          <p>There are 2 ways to pass in a state:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Example */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>{`useState(console.log(score))`}</code>
              </pre>
              <p><strong>Happens every render:</strong> Runs the code on every render which can slow down performance.</p>
            </div>

            {/* Right Example */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`useState(() => {
  console.log(score)
})`}
                </code>
              </pre>
              <p><strong>Lazy initialization:</strong> Runs only on the first render. This method is more efficient.</p>
            </div>
          </div>
        </section>

        {/* Objective 2 */}
        <section id="objective2" className="space-y-2">
          <h2 className="text-2xl font-semibold">Objective 2</h2>
          <p>State Handling with Objects</p>
        </section>

        {/* Counter */}
        <section className="flex items-center gap-4">
          <button
            onClick={handleDown2}
            className="h-10 w-10 rounded-md border text-lg font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            −
          </button>
          <span className="text-xl font-medium min-w-8 text-center">
            {count} {animal}
          </span>
          <button
            onClick={handleUp2}
            className="h-10 w-10 rounded-md border text-lg font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            +
          </button>
        </section>

        {/* Requirements */}
        <section className="space-y-2">
          <p className="font-semibold">Requirements</p>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>An object where count is affected by useState hook and "cats" is not</li>
            <li>Elements not affected by states should be preserved in the object</li>
          </ol>
        </section>

        {/* Correct Approach with Objects */}
        <section id="object-state" className="space-y-2">
          <h2 className="text-2xl font-semibold">Correct Approach when Handling State with Objects</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
            <code>
{`function handleUp2(){
  setState(prevState => {
    return {...prevState, count: prevState.count + 1 }
  })
}`}
            </code>
          </pre>
          <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300">
            <li>The ...prevState syntax is called the spread operator.</li>
            <li>It copies all properties from prevState into a new object.</li>
            <li>React detects a new object reference → triggers re-render.</li>
          </ul>
        </section>

        {/* References */}
        <section id="references" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">References</h2>

          {/* Video Reference */}
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=1&pp=iAQB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 React Hooks Tutorial on YouTube
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Beginner-friendly walkthrough of the <code>useState</code> hook in React, showing counters and best practices.
            </p>
          </div>

          {/* Official Docs */}
          <div className="space-y-2">
            <a
              href="https://react.dev/reference/react/useState"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📘 React Official Docs — useState Reference
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Official documentation on how <code>useState</code> works.
            </p>
          </div>
        </section>
    </TutorialLayout>
  );
}
