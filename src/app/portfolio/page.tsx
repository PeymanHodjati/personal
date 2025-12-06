import PortfolioGrid from '@/components/PortfolioGrid';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
    title: 'Portfolio | Personal Website',
    description: 'Explore my work in video, photography, and virtual tours.',
};

export const dynamic = 'force-dynamic'; // Ensure fresh data

export default async function PortfolioPage() {
    const projects = await prisma.project.findMany({
        orderBy: { date: 'desc' },
    });

    return (
        <div className="section container">
            <h1 className="text-center">Portfolio</h1>
            <p className="text-center" style={{ marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto', color: 'var(--foreground-muted)' }}>
                A collection of my recent work in video production, photography, and immersive virtual tours.
            </p>
            <PortfolioGrid initialProjects={projects} />
        </div>
    );
}
