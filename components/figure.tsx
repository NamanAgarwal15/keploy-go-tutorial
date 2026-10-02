import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

export type TutorialFigureName =
  | "keploy-banner.png"
  | "replay-failure.png"
  | "replay-500.png"
  | "green-run.png";

export function Figure({
  filename,
  caption,
  alt,
}: {
  filename: TutorialFigureName;
  caption: string;
  alt: string;
}) {
  const imagePath = join(process.cwd(), "public", "images", filename);
  const imageExists = existsSync(imagePath);

  return (
    <figure className="my-8">
      {imageExists ? (
        <Image
          alt={alt}
          className="h-auto w-full rounded-xl border border-border"
          height={720}
          src={`/images/${filename}`}
          width={1280}
        />
      ) : (
        <div
          aria-label={`Screenshot placeholder for ${filename}`}
          className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/20 p-6 text-center"
          role="img"
        >
          <span className="font-mono text-sm font-medium text-muted-foreground">
            {filename}
          </span>
          <span className="text-xs text-muted-foreground">
            Add the matching screenshot to <code>public/images/</code>.
          </span>
        </div>
      )}
      <figcaption className="mt-2 text-center text-xs leading-5 text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
