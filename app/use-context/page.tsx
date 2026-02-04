"use client";

import TutorialLayout from "@/components/Tutorial";
import ClassContextComponent from "@/components/useContext/ClassContext";
import FunctionContextComponent from "@/components/useContext/FunctionContext";
import React, { useState, useContext } from "react";
import { ThemeProvider2 } from "@/components/useContext/ThemeContext";
import FunctionContextComponent2 from "@/components/useContext/FunctionContext2";

export const ThemeContext = React.createContext(false); // You'd want to shift this to a separate file (For example: ThemeContext.tsx)
// as we are declaring and exporting a Context in the same file as a Client Component page.
// This causes Fast Refresh had to perform full reload issue
// For the pruposes of this tutorial, we will keep it here.

export default function UseContextPage() {
  const sections = [
    { label: "Objective 1", href: "#objective1" },
    { label: "What is Happening Here", href: "#explanation1" },
    { label: "Objective 2", href: "#objective2" },
    { label: "What is Happening Here 2", href: "#explanation2" },
    { label: "Refactor Exercise", href: "#exercise" },
    { label: "Exercise Answer", href: "#exercise-answer" },
    { label: "Analogy", href: "#analogy" },
    { label: "References", href: "#reference" },
  ];

  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme);
  }

  return (
    <TutorialLayout title="useContext Tutorial" sections={sections}>
      {/* Objective 1*/}
      <section id="objective1" className="space-y-2 mb-6">
        <h2 className="h2">Objective 1</h2>
        <p>Learn how to use the <code>useContext</code> hook to share state across components without prop drilling.</p>
      </section>

      {/* Toggle Theme */}
      <section>
        <ThemeContext.Provider value={darkTheme}>
          <button
          onClick={toggleTheme}
          className={`btn btn-active`}
          >
            Toggle Theme
          </button>
          <ClassContextComponent />
          <FunctionContextComponent/>
        </ThemeContext.Provider>
      </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>Create a ThemeContext using React.createContext to hold the theme state (dark or light).</li>
          <li>Implement a toggleTheme function that switches the theme state between dark and light.</li>
          <li>Use ThemeContext.Provider to wrap the components that need access to the theme state.</li>
          <li>In ClassContextComponent, use ThemeContext.Consumer to access the current theme and apply styles accordingly.</li>
          <li>In FunctionContextComponent, use the useContext hook to access the current theme and apply styles accordingly.</li>
        </ol>
      </section>

      {/* Explanation */}
      <section id="explanation1" className="space-y-2 mb-6">
        <h2 className="h2">What is Happening Here</h2>
        <p>
          The <code>useContext</code> hook allows functional components to access context values directly, avoiding the need for prop drilling. In this example, we created a <code>ThemeContext</code> to manage the theme state (dark or light) across both class and functional components.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>{`export const ThemeContext = React.createContext(false);`}</code>
        </pre>
        <p>
          The <code>ThemeContext.Provider</code> wraps the components that need access to the theme state, providing them with the current value of <code>darkTheme</code>.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`<ThemeContext.Provider value={darkTheme}>
  <button
  onClick={toggleTheme}
  className={\`btn btn-active\`}
  >
    Toggle Theme
  </button>
  <ClassContextComponent />
  <FunctionContextComponent/>
</ThemeContext.Provider>`}
          </code>
        </pre>
        <p>There are 2 ways to access the theme context value:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`<ThemeContext.Consumer>
    {darkTheme => (
        <div style={this.themeStyles(darkTheme)}>
            <h2>Class Component using Context</h2>
            <p>The current theme is {darkTheme ? "Dark" : "Light"}</p>
        </div>
    )}
</ThemeContext.Consumer>`}
                </code>
              </pre>
              <p className="p">
                The <code>ClassContextComponent</code> uses <code>ThemeContext.Consumer</code> to access the theme.
              </p>
            </div>

            {/* Right */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`const darkTheme = useContext(ThemeContext);
<div style={themeStyles}>
    Function Component using Context
    <p>The current theme is {darkTheme ? "Dark" : "Light"}</p>
</div>`}
                </code>
              </pre>
              <p className="p">
                The <code>FunctionContextComponent</code> utilizes the <code>useContext</code> hook for the same purpose.
              </p>
              <p>This approach is more concise and readable compared to using <code>ThemeContext.Consumer</code> in class components.</p>
            </div>
        </div>
        <p>
          As such, <code>useContext</code> makes it easier to share data across multiple components without passing props down through every level of the component tree.
        </p>
      </section>

      {/* Objective 2*/}
      <section id="objective2" className="space-y-2 mb-6">
        <h2 className="h2">Objective 2</h2>
        <p>Refactor toggle related functionality into its own file component, <code>ThemeProvider2</code></p>
        <p>We want to achieve "Provider + Custom Hook"</p>
      </section>

      {/* Requirements */}
      <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>Create a <code>ThemeProvider2</code> component that uses React's Context API to provide theme state and a toggle function to its children.</li>
          <li>Implement a <code>useTheme</code> hook to access the current theme value from context.</li>
          <li>Implement a <code>useToggleTheme</code> hook to access the toggle function from context.</li>
          <li>Use <code>ThemeProvider2</code> to wrap the <code>FunctionContextComponent2</code>, allowing it to access and toggle the theme.</li>
        </ol>
      </section>

      {/* Toggle Theme with Theme Provider */}
      <ThemeProvider2>
        <FunctionContextComponent2/>
      </ThemeProvider2>

      {/* Explanation2 */}
      <section id="explanation2" className="space-y-2 mb-6">
        <h2 className="h2">What is Happening Here</h2>
        <p>
          In this example, we created a <code>ThemeProvider2</code> component that uses React's Context API to provide both the current theme state and a function to toggle the theme.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
{`const ThemeContext = React.createContext(false);
  const ThemeUpdateContext = React.createContext(() => {});
  
  export function useToggleTheme() {
      return useContext(ThemeUpdateContext);
      // Custom hook to access the toggle function from context
  }
  
  export function useTheme() {
      return useContext(ThemeContext);
      // Custom hook to access the current theme value from context
  }
  
  export function ThemeProvider2({ children }: { children: React.ReactNode }) {
      const [darkTheme, setDarkTheme] = useState(false);
  
      function toggleTheme() {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
      }
  
      return (
        <ThemeContext.Provider value={darkTheme}>
          <ThemeUpdateContext.Provider value={toggleTheme}>
          {children}
          </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
      );
}`}
        </pre>
        <p>Realise that functionality associated with themeStyles is abstracted away into ThemeContext2.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`<ThemeContext.Provider value={darkTheme}>
  <button
  onClick={toggleTheme}
  className={\`btn btn-active\`}
  >
    Toggle Theme
  </button>
  <FunctionContextComponent/>
</ThemeContext.Provider>`}
                </code>
              </pre>
              <p className="p">
                Before, we had to manually provide the theme context and toggle function to each component that needed it.
              </p>
            </div>

            {/* Right */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`<ThemeProvider2>
  <FunctionContextComponent2/>
</ThemeProvider2>`}
                </code>
              </pre>
              <p className="p">
                After, we simply wrap our component with <code>ThemeProvider2</code>, which automatically provides the necessary context values.
              </p>
            </div>
        </div>
        {/* Callout - Personal Preference*/}
        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded-md border-l-4 border-blue-400 dark:border-blue-600 my-4">
          <div className="text-blue-700 dark:text-blue-300 font-bold">Note</div>
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              I currently prefer the code from Objective 1 as it is more explicit.
              But Objective 2 is more scalable for larger applications where multiple components need access to the same context values.
            </p>
          </div>
        </div>

        <p>The benefit of using custom hooks is that they encapsulate context logic and make it reusable across components.</p>
        <ol className="ol">
          <li>Easier refactors later since changes can be done within the custom hook itself</li>
          <li>Error validation can be added within the custom hook to ensure that the context is used within a provider</li>
        </ol>

        <p>Here is a comparison of how context values are accessed before and after using custom hooks:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`const darkTheme = useContext(ThemeContext);`}
                </code>
              </pre>
              <p className="p">
                Before, we had to manually provide the theme context and toggle function to each component that needed it.
              </p>
            </div>

            {/* Right */}
            <div className="space-y-2">
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
                <code>
{`const darkTheme = useTheme();`}
                </code>
              </pre>
              <p className="p">
                After, we can use custom hooks <code>useTheme</code> to access context values more cleanly.
              </p>
            </div>
        </div>
      </section>

      {/* Refactor Exercise */}
      <section id="exercise" className="space-y-2 mb-6">
        <h2 className="h2">Refactor Exercise</h2>
        <p>
          Refactor the <code>Dashboard</code> component so that we do not need to pass the <code>user</code> prop down to <code>UserProfile</code> and <code>UserSettings</code>. Instead, use React's Context API to provide the <code>user</code> object to these components.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{` // index.tsx
export interface User {
  isSubscribed: boolean;
  name: string;
}

export default function Demo({}: DemoProps) {
  const [user] = useState<User>({
    isSubscribed: true,
    name: 'You',
  });

  return (
    <div>
      <Dashboard user={user}/>
    </div>
  );
}

// dashboard.tsx
function Dashboard({ user }) {
  return (
    <div>
      <UserProfile user={user} />
      <UserSettings user={user} />
    </div>
  );
}

// components.tsx
export function UserProfile({ user }) {
  return <div>Welcome, {user.name}!</div>;
}
export function UserSettings({ user }) {
  return <div>Settings for {user.name}</div>;
}`}
          </code>
        </pre>
      </section>

      <section id="exercise-answer" className="space-y-2 mb-6">
          <h2 className="h2">Exercise Answer</h2>
        <p>1. Create a context.ts file</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
          <code>
{`export const DashboardContext = React.createContext<User | underfined>(undefined);
export function useUser() {
  const user = useContext(DashboardContext);

  if (user === undefined) {
    throw new Error('useUser must be used with a DashboardContext.Provider');
    // Validation to ensure the hook is used within a provider
  }

  return user;
}
`}
          </code>
        </pre>
        <p>2. Wrap Dashboard with DashboardContext.Provider</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
{`<div>
  <DashboardContext.Provider value={user}>
    <Dashboard />
  </DashboardContext.Provider>
</div>`}
        </pre>
        <p>3. Remove user from Dashboard, Sidebar and Profile. <code>user</code> is now available via context</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
{`export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Profile />
    </div>
  );
}`}
        </pre>
        <p>4. Update Sidebar and Profile to use the context instead of props</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
{`export function UserProfile() {
  const user = useUser(); // imported from context.ts
  return <div>Welcome, {user.name}!</div>;
}
export function UserSettings() {
   const user = useUser();
  return <div>Settings for {user.name}</div>;
}`}
        </pre>
      </section>

      {/* Callout - Further Refactor*/}
      <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded-md border-l-4 border-blue-400 dark:border-blue-600 my-4">
        <div className="text-blue-700 dark:text-blue-300 font-bold">Note</div>
        <div className="text-gray-700 dark:text-gray-300">
          <p>
            An additional excercise could be to further refactor the DashboardContext.Provider into it own component
            similar to ThemeProvider2 earlier.
          </p>
        </div>
      </div>
  
      {/* Analogy */}
      <section id="analogy" className="space-y-2 mb-6">
        <h2 className="h2">Analogy</h2>
        <p>
          The Provider acts like a <strong>portal</strong> that contains valuable treasures
          (shared data).
        </p>
        <p>
          Any component placed inside the Provider can see this portal, but simply seeing
          it is not enough.
        </p>
        <p>To access the treasures inside the portal, the child components need a <strong>key</strong>.</p>
        <p>This key is <code>useContext</code>.</p>
        <p>
          By using <code>useContext</code> and pointing it to the correct portal (the
          provider), a component can unlock and retrieve the treasures:
        </p>
        <p><code>const treasures = useContext(Provider)</code></p>
        <p>
          Each child component that needs access must use this key. Once unlocked, the
          context values can be accessed directly without passing them down through props.
        </p>
      </section>

      {/* References */}
      <section id="reference" className="space-y-2 mb-6">
        <h2 className="h2">References</h2>

          {/* Video Reference 1*/}
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=5LrDIWkK_Bc&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 React Hooks Tutorial on YouTube
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Beginner-friendly walkthrough of the <code>useContext</code> hook in React, showing how to share state across components and avoid prop drilling.
            </p>
          </div>

        {/* Video Reference 2 */}
        <div className="space-y-2">
          <a
            href="https://www.youtube.com/watch?v=HYKDUF8X3qI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            🎥 Learn React Hooks: useContext - Simply Explained!
          </a>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Learn how to identify when to use the React Context API, how to use createContext to create the context, create a custom hook to handle undefined values, and finally use the context in any component to get access to the data.
          </p>
        </div>

          {/* Official Docs */}
          <div className="space-y-2">
            <a
              href="https://react.dev/reference/react/useContext"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📘 React Official Docs — useContext Reference
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Official documentation on how <code>useContext</code> works.
            </p>
          </div>
      </section>
    </TutorialLayout>
  )
}
