export type ProjectCategory = 'video' | 'photo' | 'virtual-tour';

export interface Project {
    id: string;
    title: string;
    description: string;
    category: ProjectCategory;
    thumbnail: string; // URL to image
    mediaUrl?: string; // URL to video or tour
    date: string;
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'Cinematic Travel Vlog',
        description: 'A journey through the mountains of Switzerland.',
        category: 'video',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Video+Thumbnail',
        mediaUrl: '#',
        date: '2023-11-15',
    },
    {
        id: '2',
        title: 'Urban Photography',
        description: 'Street photography series in Tokyo.',
        category: 'photo',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Photo+Thumbnail',
        date: '2023-10-01',
    },
    {
        id: '3',
        title: 'Luxury Real Estate Tour',
        description: 'Interactive 360 tour of a modern penthouse.',
        category: 'virtual-tour',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Tour+Thumbnail',
        mediaUrl: '#',
        date: '2023-09-20',
    },
    {
        id: '4',
        title: 'Music Video Production',
        description: 'Directing and editing for a local indie band.',
        category: 'video',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Music+Video',
        mediaUrl: '#',
        date: '2023-08-10',
    },
    {
        id: '5',
        title: 'Nature Portraits',
        description: 'Portrait session in natural light.',
        category: 'photo',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Portraits',
        date: '2023-07-05',
    },
    {
        id: '6',
        title: 'Museum Virtual Guide',
        description: 'Educational 360 experience for a history museum.',
        category: 'virtual-tour',
        thumbnail: 'https://placehold.co/600x400/1a1a1d/ededed?text=Museum+Tour',
        mediaUrl: '#',
        date: '2023-06-12',
    },
];
