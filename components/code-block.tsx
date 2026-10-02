"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type CodeBlockProps = ComponentProps<"pre"> & {
  "data-language"?: string;
};

export function CodeBlock({
  children,
  className,
  "data-language": language,
  ...props
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const label = language
    ? language.charAt(0).toUpperCase() + language.slice(1)
    : "Code";

  async function copyCode() {
    const source = preRef.current?.querySelector("code")?.innerText;
    if (!source) {
      setCopyState("failed");
      return;
    }

    try {
      await navigator.clipboard.writeText(source);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch (error) {
      console.error("Unable to copy the code block.", error);
      setCopyState("failed");
    }
  }

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border bg-muted/40">
      <div className="flex h-10 items-center justify-between border-b border-border bg-muted/60 px-3">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <Button
          aria-live="polite"
          className="h-7 gap-1.5 px-2 text-xs"
          onClick={copyCode}
          size="sm"
          type="button"
          variant="ghost"
        >
          {copyState === "copied" ? (
            <Check aria-hidden="true" className="size-3.5" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy"}
        </Button>
      </div>
      <pre
        className={`m-0 overflow-x-auto p-4 text-[0.82rem] leading-6 ${className ?? ""}`}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
