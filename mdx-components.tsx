import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-semibold tracking-tight" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight" {...props}>
        {children}
      </h2>
    ),
  };
}
