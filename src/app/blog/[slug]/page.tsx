import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

// Correct type for Next.js 15+ params (they are promises in some versions, but standard in 14)
// Assuming Next.js 14/15 standard usage.
interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await Promise.resolve(params); // Handle potential promise
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return { title: 'Post Not Found' };
    return { title: `${post.title} | Personal Website` };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await Promise.resolve(params); // Handle potential promise
    const post = await prisma.post.findUnique({ where: { slug } });

    if (!post) {
        notFound();
    }

    return (
        <article className="section container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>{post.title}</h1>
                <p style={{ color: 'var(--foreground-muted)' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </header>

            {post.coverImage && (
                <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }}
                />
            )}

            <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
            />
        </article>
    );
}
