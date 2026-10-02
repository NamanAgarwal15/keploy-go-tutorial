# Zero-Code API Testing with Keploy and Go

A single-page beginner tutorial that records real requests against Keploy's
`book-store-inventory` Go sample and replays them as API tests. It also explains
why SQLite's persistent auto-increment state can make a first replay fail, and
how to restore the committed database safely.

## Stack

- Next.js App Router and TypeScript
- MDX with GFM tables, heading anchors and Shiki code highlighting
- Tailwind CSS and shadcn/ui components
- `next-themes` for a system-aware dark/light theme
- Lucide icons and `next/font` Inter / JetBrains Mono

The tutorial lives in `app/page.mdx`; the app prerenders the root page as static
HTML. There are no API routes, database connections, analytics or runtime
content fetches.

## Run locally

Use Node.js 20 or newer. From this directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To check the production
build:

```bash
npm run lint
npm run build
npm run start
```

## Screenshots

Put only the matching, genuine screenshots in `public/images/` using the exact
filenames listed in [public/images/README.md](./public/images/README.md).
Until then, the tutorial renders accessible placeholders rather than broken
image links.

## Deploy to Vercel

1. Set `GITHUB_REPO_URL` in `lib/site.ts` to the public repository URL.
2. Create a public GitHub repository and push this project from this directory.
3. In Vercel, import that repository and keep the detected Next.js framework
   settings and build defaults.
4. Deploy. The tutorial is a statically prerendered root page; no environment
   variables are required.
