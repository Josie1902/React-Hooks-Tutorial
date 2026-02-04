"use client";

import useLocalStorage from "@/components/CustomHooks/useLocalStorage";
import TutorialLayout from "@/components/Tutorial";
import useUpdateLogger from "@/components/CustomHooks/useUpdatLogger";
import ValueContextProvider, { useValueContext } from "@/components/CustomHooks/useValueContext";

export default function CustomHooksPage() {
  const sections = [
      { label: "Objective 1", href: "#objective1" },
      { label: "What is Happening Here", href: "#explanation" },
      { label: "Objective 2", href: "#objective2" },
      { label: "Refactor Exercise", href: "#refactor-exercise" },
      { label: "Exercise Answer", href: "#exercise-answer" },
      { label: "References", href: "#references" },
    ];

    // Objective 1
    const [name, setName] = useLocalStorage("name", () => {}) // If there's no saved name, do nothing
    useUpdateLogger(name); // Since it is encapsulated, we can easily call it in other components too

    // Objective 2
    function ExampleComponent1() {
      const { count, setCount } = useValueContext();
      console.log("ExampleComponent1 rendered");
        
      return (
        <div className="flex items-center gap-4 p-4 mb-4 border rounded-lg bg-base-100 shadow-sm">
          <span className="font-medium">
            Example Component 1: <span className="font-bold">{count}</span>
          </span>
      
          <button
            className="btn btn-active"
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
        </div>
      );
    }

    function ExampleComponent2() {
      console.log("ExampleComponent2 rendered");
    
      return (
        <div className="p-4 border rounded-lg bg-base-200 text-sm text-gray-500">
          Example Component 2
        </div>
      );
    }


    return (
      <TutorialLayout title="Custom Hooks Tutorial" sections={sections}>
        {/* Objective 1 */}
        <section id="objective1" className="space-y-2 mb-6">
          <h2 className="h2">Objective 1</h2>
          <p>Create a custom hook that manages local storage for a given key and initial value.</p>
        </section>

        {/* User input */}
        <section className="max-w-sm space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground"
          >
            Your name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="
              w-full rounded-md border border-border bg-background
              px-3 py-2 text-sm text-foreground
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
            "
          />
        </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="ol">
          <li>Create a custom hook that manages local storage for a given key and initial value.</li>
          <li>Use the custom hook to store and retrieve a user's name.</li>
          <li>Ensure that the input field updates the local storage value as the user types.</li>
          <li>Add an update logger that logs the value whenever it changes.</li>
        </ol>
      </section>

      {/* Explanation */}
      <section className="space-y-2" id="explanation">
        <h2 className="h2">What is Happening Here</h2>
        <p>
          The custom hook <code className="code">useLocalStorage</code> encapsulates the logic for managing local storage.
        </p>
        <p>It takes a key and an initial value, and returns a state value and a setter function.</p>
        <p>The hook ensures that the value is persisted in local storage whenever it changes.</p>
        <p>
          The custom hook <code className="code">useUpdateLogger</code> logs the value whenever it changes.
        </p>
        <p>Because it is encapsulated, we can easily call it in other components too.</p>
      </section>

      <section id="objective2" className="space-y-2 mb-6">
        <h2 className="h2">Objective 2</h2>
        <p>Apply useContext with custom hooks</p>
      </section>

      <section>
        <ValueContextProvider>
          <ExampleComponent1 />
          <ExampleComponent2 />
        </ValueContextProvider>
      </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="ol">
          <li>Create a custom hook that uses useContext to manage a shared value across components.</li>
          <li>Only one child would consume the context value while the other does not.</li>
          <li>Ensure that the only child that consumes the context value rerenders when the context value changes.</li>
        </ol>
      </section>

      {/* Refactor Exercise*/}
      <section className="space-y-2" id="refactor-exercise">
        <h2 className="h2">Refactor Exercise</h2>
        <p>Refactor the code below to use custom hooks instead of direct context usage.</p>
        <p>Expectation: Component using the context is rerendered</p>
        <p>Reality: Both components are rerendered. This is due to state being defined in the parent component, which causes all children to re-render when the state changes.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
{`import {useState} from "react"

const ValueContext = React.createContext(null)

export default function App() {
  const [value, setValue] = useState("")

  return(
    <ValueContext.Provider value={{value, setValue}}>
      <main>
        <ExampleComponent1 />
        <ExampleComponent2 />
      </main>
    </ValueContext.Provider>
  )
}

function ExampleComponent1() {
  const {value, setValue} = React.useContext(ValueContext)
  console.log("ExampleComponent1 rendered")
  return (<div>Example Component 1</div>)
}

function ExampleComponent2() {
  console.log("ExampleComponent2 rendered")
  return (<div>Example Component 2</div>)
}
`}
        </pre>
      </section>

      {/* Exercise Answer */}
      <section>
        <h2 className="h2" id="exercise-answer">Exercise Answer</h2>
        <p>In this example, only ExampleComponent1 is rerendered when the context value changes</p>
        <p>We created a custom hook that handles the context logic and encapsulates it for reuse.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono mb-3">
{`// useValueContext.ts
"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ValueContextType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const ValueContext = createContext<ValueContextType | null>(null)

export default function ValueContextProvider({children}: {children: React.ReactNode}) {
  const [value, setValue] = useState("")

  return(
    <ValueContext.Provider value={{value, setValue}}>
     {children}
    </ValueContext.Provider>
  )
}

export function useValueContext() {
  const context = useContext(ValueContext)
  if (!context) {
    throw new Error("useValueContext must be used within a ValueContextProvider")
  }
  return context 
}
`}
        </pre>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
{`// App.tsx
import {useState} from "react"
import { ValueContext, ValueContextProvider } from "./valueContext"
export default function App() {

  return(
      <ValueContextProvider>
        <ExampleComponent1 />
        <ExampleComponent2 />
      </ValueContextProvider>
  )
}

function ExampleComponent1() {
  const {value, setValue} = useValueContext()
  console.log("ExampleComponent1 rendered")
  return (<div>Example Component 1</div>)
}

function ExampleComponent2() {
  console.log("ExampleComponent2 rendered")
  return (<div>Example Component 2</div>)
}
`}
        </pre>
      </section>

        {/* References */}
        <section id="references" className="space-y-4">
          <h2 className="h2">References</h2>
          <div className="space-y-2">
            <a
              href="https://kyleshevlin.com/use-encapsulation/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📄 Use Encapsulation – Kyle Shevlin
            </a>
            <p className="p">
              Explains the idea of encapsulating logic in React (e.g., custom hooks
              and abstraction) for cleaner, reusable code.
            </p>
          </div>
            
          <div className="space-y-2">
            <a
              href="https://react.dev/learn/reusing-logic-with-custom-hooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📘 React Official Docs — Reusing Logic with Custom Hooks
            </a>
            <p className="p">
              Official documentation covering how and why to reuse logic using custom
              hooks in React.
            </p>
          </div>
            
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=6ThXsUwLWvc&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=8&pp=iAQB0gcJCZEKAYcqIYzv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 Custom Hooks Explained
            </a>
            <p className="p">
              Part of a beginner-friendly playlist, this video walks through custom hooks
              and how to encapsulate logic.
            </p>
          </div>
            
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=I7dwJxGuGYQ&pp=ygUZdXNlQ29udGV4dCB2cyBjdXN0b21ob29rcw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 useContext vs Custom Hooks
            </a>
            <p className="p">
              A video comparing React Context and custom hooks for state sharing and
              reusable logic patterns.
            </p>
          </div>
            
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=16yMmAJSGek&pp=ygUZdXNlQ29udGV4dCB2cyBjdXN0b21ob29rcw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 useContext vs Custom Hooks (Alternative)
            </a>
            <p className="p">
              Another video covering the differences between using Context directly and
              creating custom hooks for reusable logic.
            </p>
          </div>
        </section>
      </TutorialLayout>
    )
}
