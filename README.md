# Zero-Code API Testing with Keploy and Go

Live site: https://keploy-go-tutorial-delta.vercel.app

A beginner-friendly guide to recording real Go API traffic with Keploy and replaying it as tests.

This tutorial site is built with Next.js and MDX for the Keploy DevRel assignment.

## What the tutorial covers

- TL;DR
- Why Keploy
- Before you start
- Install Keploy
- Set up the sample app
- Record
- Replay and the gotcha
- The tempting fix vs the right fix
- Green run
- Common blockers
- Cheat sheet and next steps

The first replay fails because SQLite state has drifted; restoring `DB/book_inventory.db` with `git checkout` resets the sample for a clean replay.

## Features

- One statically rendered tutorial page.
- MDX content enhanced with custom React components.
- Sticky table of contents with active-section tracking and a mobile menu.
- Dark/light theme toggle with system preference support.
- Syntax-highlighted code blocks with a copy button.
- Callouts, terminal tabs, expected-versus-actual comparisons, do/don't cards, a troubleshooting accordion, and record/replay diagrams.
- Responsive layout, including narrow 360px screens.

## Tech stack

Versions below are the installed project versions:

| Technology | Version |
| --- | --- |
| Next.js | 16.3.8 |
| React | 19.2.8 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.3 |
| shadcn/ui CLI (Base UI preset) | 4.21.1 |
| `@next/mdx` | 16.3.8 |
| `remark-gfm` | 4.0.1 |
| `rehype-slug` | 6.0.0 |
| `rehype-autolink-headings` | 7.1.0 |
| `rehype-pretty-code` | 0.14.5 |
| Shiki | 4.5.0 |
| `next-themes` | 0.4.6 |
| `lucide-react` | 1.50.0 |

## Project structure

```text
keploy-go-tutorial/
├── .github/
│   └── workflows/
│       └── ci.yml              # Lint and production-build checks
├── app/
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.mdx                # The complete tutorial content
├── components/                 # MDX components, site shell, and shadcn/ui primitives
├── lib/
│   └── site.ts                 # Site constants
├── public/
│   └── images/                 # Tutorial screenshots and Keploy logo
├── .gitignore
├── components.json
├── eslint.config.mjs
├── mdx-components.tsx           # Global MDX component registrations
├── next.config.ts               # MDX and syntax-highlighting configuration
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Getting started

### Prerequisites

- Node.js 20.19 or newer.
- npm.

### Install and run

```bash
git clone <repo-url>
cd keploy-go-tutorial
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the tutorial.

### Check and serve a production build

```bash
npm run lint
npm run build
npm run start
```

## Editing the content

All tutorial text and examples live in `app/page.mdx`. Custom components are registered in `mdx-components.tsx`; headings are assigned IDs by the MDX pipeline and supply the table of contents.

For example, a tip callout can be added directly in the MDX:

```mdx
<Callout type="tip" title="Keep a clean starting state">
  Restore the sample database before replaying the tests.
</Callout>
```

### Custom components

| Component | File | Purpose |
| --- | --- | --- |
| `Callout` | `components/callout.tsx` | Adds a typed, icon-led note for tips, information, surprises, tricky steps, and success. |
| `CodeBlock` | `components/code-block.tsx` | Renders highlighted code with a copy action and feedback. |
| `TerminalTabs` | `components/terminal-tabs.tsx` | Groups terminal instructions into switchable tabs. |
| `ExpectActual` | `components/expect-actual.tsx` | Compares expected and actual values. |
| `DoDont` | `components/do-dont.tsx` | Contrasts a risky approach with the recommended fix. |
| `Troubleshooting` | `components/troubleshooting.tsx` | Wraps expandable troubleshooting entries. |
| `AccordionItem`, `AccordionTrigger`, `AccordionContent` | `components/ui/accordion.tsx` | Supply the interactive troubleshooting rows. |
| `RecordDiagram`, `ReplayDiagram` | `components/diagrams.tsx` | Illustrate how Keploy records traffic and replays tests. |
| `InfoChips` | `components/info-chips.tsx` | Shows the tutorial's stack, environment, level, and duration. |
| `Figure` | `components/figure.tsx` | Displays a tutorial screenshot with caption and alt text. |
| `TabsList`, `TabsTrigger`, `TabsContent` | `components/ui/tabs.tsx` | Provide the tab controls and panels used by `TerminalTabs`. |
| `SiteShell` | `components/site-shell.tsx` | Renders the header, responsive table of contents, reading progress, and footer. |
| `ThemeProvider`, `ThemeToggle` | `components/theme-provider.tsx`, `components/theme-toggle.tsx` | Provides system-aware dark/light themes and the theme control. |

### Screenshots

Place the original images in `public/images/` using these filenames:

- `keploy-banner.png`
- `replay-failure.png`
- `replay-500.png`
- `green-run.png`
- `keploy-logo.png`

## Deployment

Deploy the project on Vercel using its default Next.js settings. Vercel automatically redeploys every push to `main` and creates preview deployments for other branches. No environment variables are required.

## Continuous integration

The workflow at `.github/workflows/ci.yml` runs lint and build on pushes to `main` and on pull requests. It does not deploy; Vercel handles deployment.

## Credits

The sample application comes from [`keploy/samples-go`](https://github.com/keploy/samples-go), in its `book-store-inventory` directory. The tutorial was tested with Keploy Free 3.8.57. The Keploy name and logo belong to Keploy and are used here only for this assignment.
