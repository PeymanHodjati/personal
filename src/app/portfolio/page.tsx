import { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Explore my creative work including videography, photography, virtual tours, graphic design, motion graphics, and web development projects.',
    openGraph: {
        title: 'Portfolio | Peyman Hodjati',
        description: 'Explore my creative work including videography, photography, virtual tours, graphic design, motion graphics, and web development projects.',
    },
};

export const dynamic = 'force-dynamic';

export default function PortfolioPage() {
    return <PortfolioClient />;
}
