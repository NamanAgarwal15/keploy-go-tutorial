"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { GitBranch, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { GITHUB_REPO_URL, SITE_TITLE } from "@/lib/site";

type Section = { id: string; title: string };

function SectionLinks({
  sections,
  activeId,
  onNavigate,
}: {
  sections: Section[];
  activeId: string;
  onNavigate?: (
    sectionId: string,
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
}) {
  if (sections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Sections will appear here.</p>
    );
  }

  return (
    <nav aria-label="On this page">
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              aria-current={activeId === section.id ? "location" : undefined}
              className={`block rounded-md border-l-2 px-3 py-1.5 text-sm leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                activeId === section.id
                  ? "border-primary bg-primary/5 font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              href={`#${section.id}`}
              onClick={(event) => onNavigate?.(section.id, event)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pendingMobileTarget = useRef<string | null>(null);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("main article h2[id]"),
    );
    const pageSections = headings.map((heading) => ({
      id: heading.id,
      title: heading.innerText.trim(),
    }));

    let frame = 0;
    let sectionsInitialized = false;
    const updateActiveSection = () => {
      if (frame !== 0) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const header = document.querySelector<HTMLElement>("header");
        if (!header) return;

        const referenceLine = header.getBoundingClientRect().bottom + 16;
        document.documentElement.style.setProperty(
          "--toc-reference-offset",
          `${referenceLine}px`,
        );

        if (!sectionsInitialized) {
          sectionsInitialized = true;
          setSections(pageSections);
        }

        const remainingScroll =
          document.documentElement.scrollHeight -
          window.scrollY -
          window.innerHeight;
        const nextActiveId =
          remainingScroll <= 2
            ? (headings.at(-1)?.id ?? "")
            : (headings
                .toReversed()
                .find(
                  (heading) =>
                    heading.getBoundingClientRect().top <= referenceLine,
                )?.id ?? "");

        setActiveId((currentId) =>
          currentId === nextActiveId ? currentId : nextActiveId,
        );
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    document.addEventListener("load", updateActiveSection, true);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      document.removeEventListener("load", updateActiveSection, true);
    };
  }, []);

  useEffect(() => {
    if (sheetOpen || !pendingMobileTarget.current) return;

    let frame = 0;
    const scrollToPendingTarget = () => {
      if (document.querySelector('[role="dialog"]')) return false;

      frame = requestAnimationFrame(() => {
        const id = pendingMobileTarget.current;
        const heading = id ? document.getElementById(id) : null;
        if (!id || !heading) return;

        pendingMobileTarget.current = null;
        window.history.pushState(null, "", `#${id}`);
        heading.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return true;
    };

    if (scrollToPendingTarget()) {
      return () => cancelAnimationFrame(frame);
    }

    const observer = new MutationObserver(() => {
      if (scrollToPendingTarget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [sheetOpen]);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress =
          scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, nextProgress)));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div
        aria-label="Reading progress"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(progress)}
        className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
        role="progressbar"
      >
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <div className="lg:hidden">
              <Sheet onOpenChange={setSheetOpen} open={sheetOpen}>
                <SheetTrigger
                  render={
                    <Button
                      aria-label="Open table of contents"
                      size="icon"
                      variant="ghost"
                    />
                  }
                >
                  <Menu aria-hidden="true" className="size-5" />
                </SheetTrigger>
                <SheetContent
                  aria-describedby="mobile-toc-description"
                  className="overflow-y-auto"
                  side="left"
                >
                  <SheetHeader>
                    <SheetTitle>On this page</SheetTitle>
                    <SheetDescription id="mobile-toc-description">
                      Jump to a tutorial section.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="px-4 pb-6">
                    <SectionLinks
                      activeId={activeId}
                      onNavigate={(id, event) => {
                        event.preventDefault();
                        pendingMobileTarget.current = id;
                        setSheetOpen(false);
                      }}
                      sections={sections}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Image
              alt="Keploy"
              className="h-7 w-auto shrink-0"
              height={211}
              src="/images/keploy-logo.png"
              width={654}
            />
            <a
              className="min-w-0 truncate text-sm font-semibold tracking-tight text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring sm:text-base"
              href="#top"
            >
              {SITE_TITLE}
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <a
              aria-label="Open the tutorial GitHub repository"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={GITHUB_REPO_URL}
              rel="noreferrer"
              target="_blank"
            >
              <GitBranch aria-hidden="true" className="size-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-8 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[220px_minmax(0,768px)] lg:gap-12 lg:pt-12 xl:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              On this page
            </p>
            <SectionLinks activeId={activeId} sections={sections} />
          </div>
        </aside>
        <main className="min-w-0">
          <article className="prose-tutorial min-w-0" id="top">
            {children}
          </article>
          <footer className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Tested with Keploy Free 3.8.57</span>
            <a
              className="inline-flex items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
              href={GITHUB_REPO_URL}
              rel="noreferrer"
              target="_blank"
            >
              <GitBranch aria-hidden="true" className="size-4" />
              Tutorial source
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
