export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    content: string; // Markdown or HTML
    coverImage?: string;
}

export const posts: BlogPost[] = [
    {
        slug: 'future-of-virtual-tours',
        title: 'The Future of Virtual Tours in Real Estate',
        excerpt: 'How immersive technologies are changing the way we buy and sell homes.',
        date: '2023-11-20',
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
        date: '2023-10-15',
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
        date: '2023-09-05',
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
