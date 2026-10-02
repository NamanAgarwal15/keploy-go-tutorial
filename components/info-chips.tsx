export function InfoChips({ items }: { items: string[] }) {
  return (
    <ul aria-label="Tutorial details" className="my-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
