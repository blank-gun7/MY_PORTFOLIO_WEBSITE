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

const statusConfig = {
  live: { label: 'Live', color: 'bg-accent-green/15 text-accent-green' },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-accent-blue/15 text-accent-blue',
  },
  completed: {
    label: 'Completed',
    color: 'bg-text-secondary/15 text-text-secondary',
  },
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const status = statusConfig[project.status] || statusConfig.completed;
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-green transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${status.color}`}>
              {status.label}
            </span>
            <span className="text-xs font-mono text-text-secondary">{project.dateRange}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-mono text-text-primary mb-4">
            {project.title}
          </h1>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-full bg-accent-purple/15 text-accent-purple"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Description */}
        <section className="mb-10">
          <p className="text-text-secondary leading-relaxed">{project.longDescription}</p>
        </section>

        {/* Metrics Grid */}
        {project.metrics.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-text-primary mb-4 font-mono">Key Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-border bg-bg-secondary p-4 text-center"
                >
                  <p className="text-xl font-bold font-mono text-accent-green">{metric.value}</p>
                  <p className="text-xs text-text-secondary mt-1">{metric.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary rounded-lg hover:border-accent-green hover:text-accent-green transition-colors"
            >
              <Github size={16} />
              View Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-green text-bg-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-border pt-10">
            <h2 className="text-lg font-semibold text-text-primary mb-6 font-mono">
              Related Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/project/${rp.slug}`}
                  className="rounded-lg border border-border bg-bg-secondary p-4 hover:border-accent-green/50 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{rp.title}</h3>
                  <p className="text-xs text-text-secondary line-clamp-2">{rp.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
