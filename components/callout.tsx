import type { ReactNode } from "react";
import {
  CircleCheck,
  Info,
  Lightbulb,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

export type CalloutType = "info" | "tricky" | "surprise" | "tip" | "success";

const calloutStyles: Record<
  CalloutType,
  { title: string; icon: typeof Info; className: string }
> = {
  info: {
    title: "Good to know",
    icon: Info,
    className:
      "border-sky-500/35 bg-sky-500/5 text-sky-900 dark:text-sky-100 [&_svg]:text-sky-600 dark:[&_svg]:text-sky-300",
  },
  tricky: {
    title: "You might find this difficult",
    icon: TriangleAlert,
    className:
      "border-amber-500/40 bg-amber-500/7 text-amber-950 dark:text-amber-100 [&_svg]:text-amber-700 dark:[&_svg]:text-amber-300",
  },
  surprise: {
    title: "This might surprise you",
    icon: Sparkles,
    className:
      "border-violet-500/35 bg-violet-500/6 text-violet-950 dark:text-violet-100 [&_svg]:text-violet-700 dark:[&_svg]:text-violet-300",
  },
  tip: {
    title: "Pro tip",
    icon: Lightbulb,
    className:
      "border-orange-500/40 bg-orange-500/7 text-orange-950 dark:text-orange-100 [&_svg]:text-orange-700 dark:[&_svg]:text-orange-300",
  },
  success: {
    title: "Success",
    icon: CircleCheck,
    className:
      "border-emerald-500/35 bg-emerald-500/6 text-emerald-950 dark:text-emerald-100 [&_svg]:text-emerald-700 dark:[&_svg]:text-emerald-300",
  },
};

export function Callout({
  type,
  title,
  children,
}: {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <aside
      className={`my-6 rounded-xl border p-4 sm:p-5 ${style.className}`}
      role={type === "tricky" ? "note" : undefined}
    >
      <div className="flex items-start gap-3">
        <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        <div className="min-w-0">
          <p className="mb-1 font-semibold">{title ?? style.title}</p>
          <div className="text-sm leading-6 [&_p:not(:last-child)]:mb-3 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
