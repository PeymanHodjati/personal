import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.project.deleteMany({});

    const projects = [
        // --- Commercial ---
        {
            title: 'Real Estate Virtual Tour',
            description: 'Interactive 360 virtual tour for a luxury property listing.',
            category: 'virtual-tour',
            type: 'commercial',
            layout: 'standard',
            thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', // Placeholder
            date: new Date('2024-01-15'),
        },
        {
            title: 'Archival Restoration',
            description: 'Restoration of 10 historical photographs for a museum archive.',
            category: 'photography',
            type: 'commercial',
            layout: 'gallery',
            thumbnail: 'https://images.unsplash.com/photo-1531844251246-9a1bfaaeeb9a?w=800&q=80', // Placeholder
            date: new Date('2023-11-20'),
        },
        {
            title: 'University Graduation Theme',
            description: 'Graphic design package for university graduation ceremony, including banners and booklets.',
            category: 'graphics',
            type: 'commercial',
            layout: 'gallery',
            thumbnail: 'https://images.unsplash.com/photo-1623039405147-9477998721a6?w=800&q=80', // Placeholder
            date: new Date('2023-05-10'),
        },
        {
            title: 'Peace Choir Logo',
            description: 'Brand identity and logo design for the Peace Choir.',
            category: 'graphics',
            type: 'commercial',
            layout: 'gallery',
            thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&q=80', // Placeholder
            date: new Date('2023-03-01'),
        },
        {
            title: 'Client Static Website',
            description: 'Responsive static website for a local business.',
            category: 'web-design',
            type: 'commercial',
            layout: 'standard',
            thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80', // Placeholder
            date: new Date('2024-02-28'),
        },

        // --- Personal ---
        {
            title: 'Studio Fine Art',
            description: 'A collection of 5 abstract fine art photographs exploring light and shadow.',
            category: 'photography',
            type: 'personal',
            layout: 'gallery',
            thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', // Placeholder
            date: new Date('2023-12-01'),
        },
        {
            title: 'Studio Portraits',
            description: 'Series of 5 intimate studio portraits.',
            category: 'photography',
            type: 'personal',
            layout: 'gallery',
            thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', // Placeholder
            date: new Date('2023-10-15'),
        },
        {
            title: 'Art Festival Coverage',
            description: 'Video and photo coverage of the annual City Art Festival.',
            category: 'videography',
            type: 'personal',
            layout: 'video',
            thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', // Placeholder
            mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            date: new Date('2023-09-05'),
        },
        {
            title: 'Event & Live Music',
            description: 'Capturing the energy of live music performances.',
            category: 'photography',
            type: 'personal',
            layout: 'gallery',
            thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80', // Placeholder
            date: new Date('2023-08-20'),
        },
        {
            title: '3D Render Samples',
            description: 'Explorations in 3D modeling and rendering.',
            category: 'graphics',
            type: 'personal',
            layout: 'gallery',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', // Placeholder
            date: new Date('2024-01-05'),
        },
        {
            title: 'Short Film: "The Journey"',
            description: 'An experimental short film about time and memory.',
            category: 'videography',
            type: 'personal',
            layout: 'video',
            thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', // Placeholder
            mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            date: new Date('2022-11-10'),
        },
        {
            title: 'Award Ceremony',
            description: 'Highlight reel from the Regional Film Awards.',
            category: 'videography',
            type: 'personal',
            layout: 'video',
            thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', // Placeholder
            mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            date: new Date('2022-12-15'),
        },
        {
            title: 'Published Poetry',
            description: 'Featured poem and photography in "Modern Verse" magazine.',
            category: 'graphics',
            type: 'personal',
            layout: 'standard',
            thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80', // Placeholder
            date: new Date('2023-06-01'),
        },
        {
            title: 'Live Webapps',
            description: 'Two interactive web applications built with React and Next.js.',
            category: 'web-design',
            type: 'personal',
            layout: 'standard',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Placeholder
            date: new Date('2024-03-10'),
        },
    ];

    for (const project of projects) {
        await prisma.project.create({
            data: project,
        });
    }

    console.log('Seed data inserted successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
