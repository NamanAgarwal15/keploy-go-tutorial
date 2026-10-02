import type { ReactNode } from "react";
import { Accordion } from "@/components/ui/accordion";

export function Troubleshooting({ children }: { children: ReactNode }) {
  return (
    <Accordion className="my-6 rounded-xl border border-border px-4">
      {children}
    </Accordion>
  );
}
