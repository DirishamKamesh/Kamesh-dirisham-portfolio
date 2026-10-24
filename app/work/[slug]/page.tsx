import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  featuredProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from '@/data/projects';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found — Dirisham Kamesh',
    };
  }

  const title = `${project.title} — Case Study | Dirisham Kamesh`;
  const description = project.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ['/og-image.svg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.svg'],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <div className="min-h-screen flex flex-col bg-[#F1FAEE] text-[#1D3557]">
      <SiteHeader />
      <ProjectDetailView project={project} prevProject={prev} nextProject={next} />
      <SiteFooter />
    </div>
  );
}
