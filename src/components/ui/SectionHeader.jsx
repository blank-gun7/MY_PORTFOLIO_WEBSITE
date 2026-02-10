export default function SectionHeader({ command, title }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-accent-green mb-2">{command}</p>
      <h2 className="sr-only">{title}</h2>
    </div>
  );
}
