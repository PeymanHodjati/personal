const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const projects = [
    {
        title: 'Cinematic Travel Vlog',
        description: 'A journey through the mountains of Switzerland.',
        category: 'video',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Video+Thumbnail',
        mediaUrl: '#',
        date: new Date('2023-11-15'),
    },
    {
        title: 'Urban Photography',
        description: 'Street photography series in Tokyo.',
        category: 'photo',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Photo+Thumbnail',
        date: new Date('2023-10-01'),
    },
    {
        title: 'Luxury Real Estate Tour',
        description: 'Interactive 360 tour of a modern penthouse.',
        category: 'virtual-tour',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Tour+Thumbnail',
        mediaUrl: '#',
        date: new Date('2023-09-20'),
    },
    {
        title: 'Music Video Production',
        description: 'Directing and editing for a local indie band.',
        category: 'video',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Music+Video',
        mediaUrl: '#',
        date: new Date('2023-08-10'),
    },
    {
        title: 'Nature Portraits',
        description: 'Portrait session in natural light.',
        category: 'photo',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Portraits',
        date: new Date('2023-07-05'),
    },
    {
        title: 'Museum Virtual Guide',
        description: 'Educational 360 experience for a history museum.',
        category: 'virtual-tour',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Museum+Tour',
        mediaUrl: '#',
        date: new Date('2023-06-12'),
    },
];

const posts = [
    {
        slug: 'future-of-virtual-tours',
        title: 'The Future of Virtual Tours in Real Estate',
        excerpt: 'How immersive technologies are changing the way we buy and sell homes.',
        date: new Date('2023-11-20'),
        content: `
      <p>Virtual tours have revolutionized the real estate industry, offering potential buyers a way to explore properties from the comfort of their own homes. But what does the future hold?</p>
      <h2>Immersive Experiences</h2>
      <p>With the rise of VR headsets, virtual tours are becoming more immersive than ever. Users can now walk through a property as if they were actually there.</p>
      <h2>Interactive Elements</h2>
      <p>Future tours will include more interactive elements, such as the ability to change furniture, view different lighting conditions, and even measure spaces in real-time.</p>
    `,
        coverImage: 'https://placehold.co/800x400/1a1a1d/ededed?text=Virtual+Tours',
    },
    {
        slug: 'cinematic-storytelling-tips',
        title: '5 Tips for Cinematic Storytelling',
        excerpt: 'Elevate your video productions with these simple techniques.',
        date: new Date('2023-10-15'),
        content: `
      <p>Storytelling is at the heart of every great video. Here are 5 tips to help you tell better stories:</p>
      <ol>
        <li><strong>Start with a Hook:</strong> Grab your audience's attention in the first few seconds.</li>
        <li><strong>Show, Don't Tell:</strong> Use visuals to convey emotions and information.</li>
        <li><strong>Use Sound Design:</strong> Audio is just as important as video.</li>
        <li><strong>Pacing:</strong> Vary the speed of your cuts to match the mood.</li>
        <li><strong>Emotional Arc:</strong> Take your audience on a journey.</li>
      </ol>
    `,
        coverImage: 'https://placehold.co/800x400/1a1a1d/ededed?text=Storytelling',
    },
    {
        slug: 'minimalist-photography-guide',
        title: 'A Guide to Minimalist Photography',
        excerpt: 'Less is more. Learn how to capture stunning minimalist images.',
        date: new Date('2023-09-05'),
        content: `
      <p>Minimalist photography is about stripping away the unnecessary and focusing on the essential elements of a scene.</p>
      <h2>Composition</h2>
      <p>Use negative space to draw attention to your subject. Simple lines and geometric shapes work well.</p>
      <h2>Color</h2>
      <p>Stick to a limited color palette or go black and white for a timeless look.</p>
    `,
        coverImage: 'https://placehold.co/800x400/1a1a1d/ededed?text=Minimalism',
    },
];

async function main() {
    console.log('Start seeding ...');

    for (const p of projects) {
        const project = await prisma.project.create({
            data: p,
        });
        console.log(`Created project with id: ${project.id}`);
    }

    for (const p of posts) {
        const post = await prisma.post.create({
            data: p,
        });
        console.log(`Created post with id: ${post.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
