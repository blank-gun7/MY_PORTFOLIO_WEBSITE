'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export default function HuggingFaceEmbed({ url, title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="rounded-lg border border-border bg-bg-secondary p-8 text-center">
        <p className="text-text-secondary mb-4">
          Could not load the demo. View it directly on HuggingFace:
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent-green hover:underline"
        >
          Open on HuggingFace <ExternalLink size={14} />
        </a>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg border border-border overflow-hidden">
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-bg-secondary flex items-center justify-center">
          <div className="text-text-secondary font-mono text-sm animate-pulse">Loading demo...</div>
        </div>
      )}
      <iframe
        src={url}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-[500px] border-0"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
