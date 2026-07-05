const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Each day already carries its exact grid position (row = weekday 0–6,
// col = week index) from GitHub's own markup — place directly, no inference.
function toWeekColumns(days) {
  const weekCount = Math.max(...days.map((d) => d.col)) + 1;
  const columns = Array.from({ length: weekCount }, () => []);
  days.forEach((day) => {
    columns[day.col][day.row] = day;
  });

  let lastMonth = null;
  const labels = columns.map((col) => {
    const firstDay = col.find(Boolean);
    if (!firstDay) return null;
    const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
    if (month === lastMonth) return null;
    lastMonth = month;
    return MONTH_LABELS[month];
  });

  return { columns, labels };
}

export default function ContributionGrid({ days }) {
  const { columns, labels } = toWeekColumns(days);

  return (
    <div className="inline-flex flex-col gap-1">
      <div className="flex gap-[3px] pl-px" aria-hidden="true">
        {columns.map((_, i) => (
          <span key={i} className="w-[11px] text-[10px] text-text-secondary">
            {labels[i] || ''}
          </span>
        ))}
      </div>
      <div className="flex gap-[3px]">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, weekday) => {
              const day = col[weekday];
              return (
                <div
                  key={weekday}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{
                    backgroundColor: day ? `var(--cal-${day.level})` : 'transparent',
                  }}
                  title={day ? day.date : undefined}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
