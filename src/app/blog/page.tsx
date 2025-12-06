import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
    title: 'Blog | Personal Website',
    description: 'Thoughts on technology, design, and creativity.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        orderBy: { date: 'desc' },
    });

    return (
        <div className="section container">
            <h1 className="text-center">Blog</h1>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {posts.map(post => (
                    <article key={post.slug} style={{ marginBottom: '4rem' }}>
                        <Link href={`/blog/${post.slug}`} style={{ display: 'block' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{post.title}</h2>
                        </Link>
                        <p style={{ color: 'var(--foreground-muted)', marginBottom: '1rem' }}>
                            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: 600 }}>
                            Read more →
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
