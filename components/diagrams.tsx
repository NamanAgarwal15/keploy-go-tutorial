import { ArrowRight, Database, FileText, Globe, Server } from "lucide-react";

function DiagramNode({
  icon: Icon,
  title,
  detail,
  accent = false,
}: {
  icon: typeof Globe;
  title: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`min-w-0 flex-1 rounded-xl border p-3 text-center ${
        accent
          ? "border-primary/45 bg-primary/5"
          : "border-border bg-card"
      }`}
    >
      <Icon
        aria-hidden="true"
        className={`mx-auto mb-2 size-5 ${accent ? "text-primary" : "text-muted-foreground"}`}
      />
      <p className="break-words text-xs font-semibold">{title}</p>
      <p className="mt-1 break-words font-mono text-[0.68rem] leading-4 text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="mx-auto my-1 size-4 shrink-0 rotate-90 text-muted-foreground sm:my-0 sm:rotate-0"
    />
  );
}

export function RecordDiagram() {
  return (
    <figure className="my-7 rounded-2xl border border-border bg-muted/25 p-4 sm:p-5">
      <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-2">
        <DiagramNode
          detail="Terminal 2"
          icon={Globe}
          title="Your curl requests"
        />
        <FlowArrow />
        <DiagramNode
          accent
          detail=":16789"
          icon={Server}
          title="Keploy proxy"
        />
        <FlowArrow />
        <DiagramNode
          detail=":9090"
          icon={Server}
          title="Gin app"
        />
        <FlowArrow />
        <DiagramNode
          detail="DB/book_inventory.db"
          icon={Database}
          title="SQLite file"
        />
      </div>
      <figcaption className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <FileText aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        Keploy watches the traffic and saves each request/response pair as YAML
        in <code>keploy/test-set-0/</code>.
      </figcaption>
    </figure>
  );
}

export function ReplayDiagram() {
  return (
    <figure className="my-7 rounded-2xl border border-primary/25 bg-primary/[0.035] p-4 sm:p-5">
      <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-2">
        <DiagramNode
          detail="test-set-0 YAML"
          icon={FileText}
          title="Recorded tests"
        />
        <FlowArrow />
        <DiagramNode
          accent
          detail="replays requests"
          icon={Server}
          title="Keploy"
        />
        <FlowArrow />
        <DiagramNode
          detail="started by Keploy"
          icon={Server}
          title="Gin app"
        />
        <FlowArrow />
        <DiagramNode
          accent
          detail="LIVE · persistent"
          icon={Database}
          title="SQLite file"
        />
      </div>
      <figcaption className="mt-4 text-center text-sm font-medium text-foreground">
        Compare actual vs expected: any difference = failed test
      </figcaption>
    </figure>
  );
}
