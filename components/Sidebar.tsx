"use client";

import Link from "next/link";

const hookLinks = [
  { label: "useState", href: "/use-state" },
  { label: "useEffect", href: "/use-effect" },
  { label: "useMemo", href: "/use-memo" },
  { label: "useCallback", href: "/use-callback" },
  { label: "useRef", href: "/use-ref" },
  { label: "useContext", href: "/use-context" },
  { label: "Custom Hooks", href: "/custom-hooks" },
  { label: "useReducer", href: "/use-reducer" },
];

type Section = {
  label: string;
  href: string;
};

export default function Sidebar({ sections }: { sections?: Section[] }) {
  return (
    <aside className="w-64 shrink-0 border-r px-6 py-8 h-screen sticky top-0">
      {/* Title */}
      <Link
        href="/"
        className="mb-6 block text-lg font-semibold tracking-tight hover:underline"
      >
        React Hooks
      </Link>

      {/* Hook tutorials */}
      <nav className="space-y-2 mb-8">
        {hookLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="block text-sm text-foreground/50 hover:text-foreground transition"
          >
            {link.label} Tutorial
          </Link>
        ))}
      </nav>

      {/* Page sections */}
      {sections && (
        <>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-3">
              On this page
            </h3>
            <ul className="space-y-2 text-sm">
              {sections.map(section => (
                <li key={section.href}>
                  <a
                    href={section.href}
                    className="text-foreground/60 hover:text-foreground transition"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </aside>
  );
}
