export default function SectionHeader({ command, title }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-accent-green">{command}</p>
      <h2 className="sr-only">{title}</h2>
      <div className="mt-2 h-px bg-border/50 max-w-[120px]" />
    </div>
  );
}
