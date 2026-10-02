import type { MDXComponents } from "mdx/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import { DoDont } from "@/components/do-dont";
import { ExpectActual } from "@/components/expect-actual";
import { Figure } from "@/components/figure";
import { InfoChips } from "@/components/info-chips";
import { RecordDiagram, ReplayDiagram } from "@/components/diagrams";
import { TerminalTabs } from "@/components/terminal-tabs";
import { Troubleshooting } from "@/components/troubleshooting";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function useMDXComponents(): MDXComponents {
  return {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Callout,
    CodeBlock,
    DoDont,
    ExpectActual,
    Figure,
    InfoChips,
    RecordDiagram,
    ReplayDiagram,
    TerminalTabs,
    Troubleshooting,
    TabsContent,
    TabsList,
    TabsTrigger,
    pre: CodeBlock,
    h1: ({ children, ...props }) => (
      <h1
        className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mb-4 mt-14 scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mb-3 mt-9 scroll-mt-24 text-xl font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4 text-[0.96rem] leading-7 text-muted-foreground" {...props}>
        {children}
      </p>
    ),
    table: ({ children, ...props }) => (
      <div
        aria-label="Scrollable data table"
        className="my-5 w-full overflow-x-auto rounded-xl border border-border"
        role="region"
        tabIndex={0}
      >
        <table className="min-w-[540px] sm:min-w-full" {...props}>
          {children}
        </table>
      </div>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="my-4 list-disc space-y-2 pl-6 text-[0.96rem] leading-7 text-muted-foreground marker:text-primary"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="my-4 list-decimal space-y-2 pl-6 text-[0.96rem] leading-7 text-muted-foreground marker:font-semibold marker:text-foreground"
        {...props}
      >
        {children}
      </ol>
    ),
  };
}
