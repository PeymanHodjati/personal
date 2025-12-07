'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './portfolio.module.css';

// Asset mapping for the 6 categories (ordered as requested)
const CATEGORIES = [
    {
        id: 0,
        title: 'Videography',
        asset: 'portfolio-previews-video.mp4',
        type: 'video',
    },
    {
        id: 1,
        title: 'Photography',
        asset: 'portfolio-previews-photo.jpg',
        type: 'image',
    },
    {
        id: 2,
        title: 'Virtual Tour',
        asset: 'portfolio-previews-360.mp4',
        type: 'video',
    },
    {
        id: 3,
        title: 'Graphic & Motion',
        asset: 'portfolio-previews-graphic.mp4',
        type: 'video',
    },
    {
        id: 4,
        title: 'Web Development',
        asset: 'portfolio-previews-webdev.mp4',
        type: 'video',
    },
    {
        id: 5,
        title: 'Project Highlights',
        asset: 'portfolio-previews-highlights.mp4',
        type: 'video',
    },
];

const ASSET_BASE_URL = 'https://pub-a0f9c91ac679465bb3e90eb766fb247a.r2.dev/Home/portfolio/portfolio-previews/';

export default function PortfolioClient() {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Detect mobile breakpoint
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Control video playback based on active category (hover)
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === activeCategory) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [activeCategory]);

    // Handle category hover
    const handleCategoryHover = (categoryId: number) => {
        setActiveCategory(categoryId);
    };

    // Handle category leave
    const handleCategoryLeave = () => {
        setActiveCategory(null);
    };

    // Handle category click (expand to full screen)
    const handleCategoryClick = (categoryId: number) => {
        setExpandedCategory(categoryId);
    };

    // Handle back/close from expanded view
    const handleClose = () => {
        setExpandedCategory(null);
    };

    const isExpanded = expandedCategory !== null;

    return (
        <div className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}>
            {/* Left Canvas - 3x2 Grid of Previews */}
            <div className={`${styles.leftCanvas} ${isExpanded ? styles.canvasExpanded : ''}`}>
                <div className={styles.previewGrid}>
                    {CATEGORIES.map((category, index) => (
                        <div
                            key={category.id}
                            className={`${styles.gridItem} ${index === activeCategory ? styles.gridItemActive : ''}`}
                            onClick={() => handleCategoryClick(index)}
                            onMouseEnter={() => handleCategoryHover(index)}
                            onMouseLeave={handleCategoryLeave}
                        >
                            {category.type === 'video' ? (
                                <video
                                    ref={(el) => { videoRefs.current[index] = el; }}
                                    className={styles.gridMedia}
                                    src={`${ASSET_BASE_URL}${category.asset}`}
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                />
                            ) : (
                                <img
                                    className={styles.gridMedia}
                                    src={`${ASSET_BASE_URL}${category.asset}`}
                                    alt={category.title}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Expanded content overlay */}
                {isExpanded && (
                    <div className={styles.expandedContent}>
                        <button className={styles.backButton} onClick={handleClose}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            <span>Back</span>
                        </button>

                        <div className={styles.expandedInfo}>
                            <h1>{CATEGORIES[expandedCategory]?.title}</h1>
                            <p>Content for {CATEGORIES[expandedCategory]?.title} coming soon.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Navigation */}
            <nav
                className={`${styles.rightNav} ${isExpanded ? styles.navHidden : ''}`}
                onMouseLeave={handleCategoryLeave}
            >
                <div className={styles.navList}>
                    {CATEGORIES.map((category, index) => (
                        <button
                            key={category.id}
                            className={`${styles.navItem} ${index === activeCategory ? styles.navItemActive : ''}`}
                            onMouseEnter={() => handleCategoryHover(index)}
                            onClick={() => handleCategoryClick(index)}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}
