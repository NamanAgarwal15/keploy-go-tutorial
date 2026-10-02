import type { ReactNode } from "react";
import { Tabs } from "@/components/ui/tabs";

export function TerminalTabs({ children }: { children: ReactNode }) {
  return (
    <Tabs
      className="my-6 gap-0 overflow-hidden rounded-xl border border-border"
      defaultValue="terminal-1"
    >
      {children}
    </Tabs>
  );
}
