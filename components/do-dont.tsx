import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DoDontProps = {
  dontCommand: string;
  dontExplanation: string;
  doCommand: string;
  doExplanation: string;
};

function FixCard({
  kind,
  command,
  explanation,
}: {
  kind: "dont" | "do";
  command: string;
  explanation: string;
}) {
  const isGood = kind === "do";
  const Icon = isGood ? Check : X;

  return (
    <Card
      className={
        isGood
          ? "border-emerald-500/35 bg-emerald-500/5"
          : "border-rose-500/35 bg-rose-500/5"
      }
    >
      <CardHeader className="pb-3">
        <CardTitle
          className={`flex items-center gap-2 text-base ${isGood ? "text-emerald-800 dark:text-emerald-300" : "text-rose-800 dark:text-rose-300"}`}
        >
          <Icon aria-hidden="true" className="size-4" />
          {isGood ? "Do" : "Don't"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <pre className="overflow-x-auto rounded-lg border border-border bg-background/75 p-3 font-mono text-xs leading-5">
          <code>{command}</code>
        </pre>
        <p className="text-sm leading-6 text-muted-foreground">{explanation}</p>
      </CardContent>
    </Card>
  );
}

export function DoDont(props: DoDontProps) {
  return (
    <div className="my-6 grid gap-4 md:grid-cols-2">
      <FixCard
        command={props.dontCommand}
        explanation={props.dontExplanation}
        kind="dont"
      />
      <FixCard
        command={props.doCommand}
        explanation={props.doExplanation}
        kind="do"
      />
    </div>
  );
}
