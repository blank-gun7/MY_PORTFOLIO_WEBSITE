export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl md:text-4xl text-text-primary text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-text-secondary max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
