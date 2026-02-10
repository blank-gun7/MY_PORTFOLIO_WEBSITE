export default function SkillCategory({ category, command, items }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-accent-green text-xs mb-1">{command}</p>
      <p className="text-text-secondary text-sm">
        <span className="text-text-primary font-semibold">{category}:</span>{' '}
        {items.join(' \u00b7 ')}
      </p>
    </div>
  );
}
