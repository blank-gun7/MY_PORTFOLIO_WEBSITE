export default function TerminalWindow({ title = 'terminal', children }) {
  return (
    <div className="rounded-lg border border-border bg-bg-secondary overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-terminal border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-text-secondary font-mono">{title}</span>
      </div>
      {/* Content */}
      <div className="p-6 font-mono text-sm">{children}</div>
    </div>
  );
}
