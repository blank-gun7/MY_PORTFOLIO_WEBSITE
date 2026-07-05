import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${project.title} | Rana Raunitraz Singh`,
    description: project.description,
  };
}

const statusLabels = {
  live: 'In production',
  'in-progress': 'In progress',
  completed: 'Completed',
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const statusLabel = statusLabels[project.status] || statusLabels.completed;
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-4">
            {statusLabel} · {project.dateRange}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-text-primary text-balance mb-6">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded bg-bg-raised text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Thumbnail banner */}
        {project.thumbnail && (
          <div className="mb-12 rounded-xl overflow-hidden border border-border">
            <img src={project.thumbnail} alt={project.title} className="w-full h-auto" />
          </div>
        )}

        {/* Metrics — the outcomes, up front */}
        {project.metrics.length > 0 && (
          <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-bg-secondary p-5">
                <p className="font-display text-2xl md:text-3xl text-accent tabular-nums">
                  {metric.value}
                </p>
                <p className="text-xs text-text-secondary mt-1.5">{metric.label}</p>
              </div>
            ))}
          </section>
        )}

        {/* Description */}
        <section className="mb-12 space-y-5">
          {project.longDescription.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-text-secondary leading-relaxed text-[17px] max-w-[68ch]">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary rounded-md hover:border-accent hover:text-accent transition-colors"
            >
              <Github size={16} />
              View source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-contrast rounded-md hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} />
              Live demo
            </a>
          )}
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-border pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-secondary mb-6">
              Related projects
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/project/${rp.slug}`}
                  className="rounded-xl border border-border bg-bg-secondary p-5 hover:border-accent/50 transition-colors"
                >
                  <h3 className="font-display text-base text-text-primary mb-1.5">{rp.title}</h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {rp.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
