const CONTRIBUTIONS_URL = (username) => `https://github.com/users/${username}/contributions`;

// GitHub's own contribution graph, scraped at build time. Avoids depending on
// third-party mirror APIs that cache aggressively and can't be force-refreshed.
export async function getContributionData(username) {
  try {
    const res = await fetch(CONTRIBUTIONS_URL(username));
    if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
    const html = await res.text();

    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : null;

    // GitHub's HTML lists days grouped by weekday row (all Sundays, then all
    // Mondays, ...), not in daily sequence — so row/col must come from the
    // element id, not from array position.
    const days = [];
    const dayRegex = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g;
    let match;
    while ((match = dayRegex.exec(html)) !== null) {
      const tag = match[0];
      const levelMatch = tag.match(/data-level="(\d)"/);
      const idMatch = tag.match(/id="contribution-day-component-(\d+)-(\d+)"/);
      if (!levelMatch || !idMatch) continue;
      days.push({
        date: match[1],
        level: parseInt(levelMatch[1], 10),
        row: parseInt(idMatch[1], 10),
        col: parseInt(idMatch[2], 10),
      });
    }

    if (days.length === 0 || total === null) throw new Error('Could not parse contribution graph');

    return { total, days };
  } catch (err) {
    console.error('[GitHub contributions] fetch failed at build time:', err.message);
    return null;
  }
}
