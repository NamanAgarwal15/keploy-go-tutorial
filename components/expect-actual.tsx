import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExpectActual({
  testName,
  expected,
  actual,
}: {
  testName: string;
  expected: string;
  actual: string;
}) {
  return (
    <section aria-label={`Expected and actual results for ${testName}`} className="my-6">
      <p className="mb-2 font-mono text-xs text-muted-foreground">{testName}</p>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <Card className="border-emerald-500/35 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Expected
            </CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm">{expected}</CardContent>
        </Card>
        <ArrowRight
          aria-hidden="true"
          className="mx-auto hidden size-4 text-muted-foreground sm:block"
        />
        <Card className="border-rose-500/35 bg-rose-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Actual
            </CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm">{actual}</CardContent>
        </Card>
      </div>
    </section>
  );
}
