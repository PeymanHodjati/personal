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

const ASSET_BASE_URL = 'https://assets.peymanhodjati.com/Home/portfolio/portfolio-previews/';

// Graphic & Motion content - combined list for navigation
const GRAPHIC_MOTION_ITEMS = [
    // Images first
    { type: 'image' as const, src: 'graphic (1).jpg', title: 'Graphic Design 1' },
    { type: 'image' as const, src: 'graphic (2).jpg', title: 'Graphic Design 2' },
    { type: 'image' as const, src: 'graphic (3).jpg', title: 'Graphic Design 3' },
    { type: 'image' as const, src: 'graphic (4).jpg', title: 'Graphic Design 4' },
    { type: 'image' as const, src: 'graphic (5).jpg', title: 'Graphic Design 5' },
    // Videos (new optimized exports with poster images)
    { type: 'video' as const, src: 'motion1.mp4', poster: 'motion1-poster.jpg', title: 'Motion Graphics 1' },
    { type: 'video' as const, src: 'motion2.mp4', poster: 'motion2-poster.jpg', title: 'Motion Graphics 2' },
    { type: 'video' as const, src: 'motion3.mp4', poster: 'motion3-poster.jpg', title: 'Motion Graphics 3' },
    { type: 'video' as const, src: 'motion4.mp4', poster: 'motion4-poster.png', title: 'Motion Graphics 4' },
    { type: 'video' as const, src: 'motion5.mp4', poster: 'motion5-poster.png', title: 'Motion Graphics 5' },
];

const GRAPHIC_BASE_URL = 'https://assets.peymanhodjati.com/Home/portfolio/graphic/';

// Photography content - all images for fullscreen navigation
const PHOTOGRAPHY_ITEMS = [
    // Commercial (7)
    { src: 'commercial (1).jpg', title: 'Commercial 1', category: 'commercial' },
    { src: 'commercial (2).jpg', title: 'Commercial 2', category: 'commercial' },
    { src: 'commercial (3).jpg', title: 'Commercial 3', category: 'commercial' },
    { src: 'commercial (4).jpg', title: 'Commercial 4', category: 'commercial' },
    { src: 'commercial (5).jpg', title: 'Commercial 5', category: 'commercial' },
    { src: 'commercial (6).jpg', title: 'Commercial 6', category: 'commercial' },
    { src: 'commercial (7).jpg', title: 'Commercial 7', category: 'commercial' },
    // Event (12)
    { src: 'event (2).jpg', title: 'Event 1', category: 'event' },
    { src: 'event (3).jpg', title: 'Event 2', category: 'event' },
    { src: 'event (4).jpg', title: 'Event 3', category: 'event' },
    { src: 'event (5).jpg', title: 'Event 4', category: 'event' },
    { src: 'event (6).jpg', title: 'Event 5', category: 'event' },
    { src: 'event (7).png', title: 'Event 6', category: 'event' },
    { src: 'event (8).png', title: 'Event 7', category: 'event' },
    { src: 'event (9).png', title: 'Event 8', category: 'event' },
    { src: 'event (10).png', title: 'Event 9', category: 'event' },
    { src: 'event (11).png', title: 'Event 10', category: 'event' },
    { src: 'event (12).png', title: 'Event 11', category: 'event' },
    { src: 'event (13).png', title: 'Event 12', category: 'event' },
    // Studio (5)
    { src: 'studio (2).png', title: 'Studio 1', category: 'studio' },
    { src: 'studio (3).jpg', title: 'Studio 2', category: 'studio' },
    { src: 'studio (4).jpg', title: 'Studio 3', category: 'studio' },
    { src: 'studio (5).jpg', title: 'Studio 4', category: 'studio' },
    { src: 'studio (6).jpg', title: 'Studio 5', category: 'studio' },
];

const PHOTOGRAPHY_BASE_URL = 'https://assets.peymanhodjati.com/Home/portfolio/photo/';

// Videography content - vertical videos
const VIDEOGRAPHY_ITEMS = [
    { src: 'Kenzo Vid 1 final.mp4', title: 'Kenzo 1' },
    { src: 'Kenzo Video Final.mp4', title: 'Kenzo 2' },
    { src: 'vertical.mp4', title: 'Vertical' },
];

const VIDEOGRAPHY_BASE_URL = 'https://assets.peymanhodjati.com/Home/portfolio/video/';

// Project Highlights - organized by project
const PROJECT_HIGHLIGHTS = [
    {
        id: 'bicommunal',
        name: 'Bicommunal Choir for Peace-Lena Melanidou logo',
        thumbnail: 'bicommunal-logo.jpg',
        heroItems: [
            { type: 'image' as const, src: 'bicommunal-logo.jpg', title: 'Bicommunal Logo' },
        ],
        supportingImages: [
            { src: 'bicommunal (1).jpg', title: 'Bicommunal 1' },
            { src: 'bicommunal (2).jpg', title: 'Bicommunal 2' },
            { src: 'bicommunal (3).jpg', title: 'Bicommunal 3' },
        ],
    },
    {
        id: 'eulogy',
        name: 'Eulogy (short film)',
        thumbnail: 'EULOGY_STILL (4).jpg',
        heroItems: [
            { type: 'image' as const, src: 'EULOGY_STILL (4).jpg', title: 'Eulogy Still' },
            { type: 'video' as const, src: 'EULOGY_awardvideo.mp4', title: 'Eulogy Award Video' },
        ],
        supportingImages: [
            { src: 'EULOGY_STILL (1).JPG', title: 'Eulogy Still 1' },
            { src: 'EULOGY_STILL (2).JPG', title: 'Eulogy Still 2' },
            { src: 'EULOGY_STILL (3).JPG', title: 'Eulogy Still 3' },
            { src: 'EULOGY_STILL (5).JPG', title: 'Eulogy Still 5' },
        ],
    },
    {
        id: 'emu-graduation',
        name: 'EMU graduation ceremonies concept design',
        thumbnail: 'emugrad-logo.jpg',
        heroLayout: 'side-by-side' as const,
        heroItems: [
            { type: 'image' as const, src: 'emugrad-logo.jpg', title: 'EMU Graduation Logo' },
            { type: 'video' as const, src: 'motion3.mp4', title: 'EMU Graduation Motion' },
        ],
        supportingImages: [
            { src: 'emugrad (1).jpg', title: 'EMU Graduation 1' },
            { src: 'emugrad (2).jpg', title: 'EMU Graduation 2' },
            { src: 'emugrad (3).jpg', title: 'EMU Graduation 3' },
            { src: 'emugrad (4).jpg', title: 'EMU Graduation 4' },
        ],
    },
    {
        id: 'varosha',
        name: 'The Varosha business signage archive',
        thumbnail: 'Varosha (1).jpg',
        heroLayout: 'album' as const,
        heroItems: [],
        supportingImages: [
            { src: 'Varosha (1).jpg', title: 'Varosha 1' },
            { src: 'Varosha (2).jpg', title: 'Varosha 2' },
            { src: 'Varosha (3).jpg', title: 'Varosha 3' },
            { src: 'Varosha (4).jpg', title: 'Varosha 4' },
            { src: 'Varosha (5).jpg', title: 'Varosha 5' },
            { src: 'Varosha (6).jpg', title: 'Varosha 6' },
            { src: 'Varosha (7).jpg', title: 'Varosha 7' },
            { src: 'Varosha (8).jpg', title: 'Varosha 8' },
            { src: 'Varosha (9).jpg', title: 'Varosha 9' },
            { src: 'Varosha (10).jpg', title: 'Varosha 10' },
            { src: 'Varosha (11).jpg', title: 'Varosha 11' },
            { src: 'Varosha (12).jpg', title: 'Varosha 12' },
        ],
    },
];

const HIGHLIGHTS_BASE_URL = 'https://assets.peymanhodjati.com/Home/portfolio/highlights/';

export default function PortfolioClient() {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
    const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
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

    // Keyboard navigation for fullscreen
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (fullscreenIndex === null) return;

            // Get current gallery length based on expanded category
            const galleryLength = expandedCategory === 0 ? VIDEOGRAPHY_ITEMS.length
                : expandedCategory === 1 ? PHOTOGRAPHY_ITEMS.length
                    : expandedCategory === 3 ? GRAPHIC_MOTION_ITEMS.length : 0;

            if (e.key === 'ArrowLeft' && fullscreenIndex > 0) {
                setFullscreenIndex(fullscreenIndex - 1);
            } else if (e.key === 'ArrowRight' && fullscreenIndex < galleryLength - 1) {
                setFullscreenIndex(fullscreenIndex + 1);
            } else if (e.key === 'Escape') {
                setFullscreenIndex(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [fullscreenIndex, expandedCategory]);

    // Handle category hover
    const handleCategoryHover = (categoryId: number) => {
        setActiveCategory(categoryId);
    };

    // Handle category leave
    const handleCategoryLeave = () => {
        setActiveCategory(null);
    };

    // Virtual Tour URL
    const VIRTUAL_TOUR_URL = 'https://assets.peymanhodjati.com/Home/portfolio/360/isatis/index.html';

    // Handle category click (expand to full screen or open virtual tour)
    const handleCategoryClick = (categoryId: number) => {
        // Virtual Tour (id: 2) opens directly in new tab
        if (categoryId === 2) {
            window.open(VIRTUAL_TOUR_URL, '_blank');
            return;
        }
        setExpandedCategory(categoryId);
    };

    // Handle back/close from expanded view
    const handleClose = () => {
        setExpandedCategory(null);
        setFullscreenIndex(null);
        setSelectedProject(null);
    };

    // Navigate fullscreen left/right
    const navigateFullscreen = (direction: number, maxLength: number) => {
        if (fullscreenIndex === null) return;
        const newIndex = fullscreenIndex + direction;
        if (newIndex >= 0 && newIndex < maxLength) {
            setFullscreenIndex(newIndex);
        }
    };

    const isExpanded = expandedCategory !== null;

    // Get images and videos separately for display
    const graphicImages = GRAPHIC_MOTION_ITEMS.filter(item => item.type === 'image');
    const graphicVideos = GRAPHIC_MOTION_ITEMS.filter(item => item.type === 'video');

    // Render Graphic & Motion content
    const renderGraphicMotionContent = () => (
        <div className={styles.galleryContainer}>
            {/* Images Row */}
            <div className={styles.galleryRow}>
                <div className={styles.galleryGrid}>
                    {graphicImages.map((img, index) => (
                        <div
                            key={index}
                            className={styles.galleryItem}
                            onClick={() => setFullscreenIndex(index)}
                        >
                            <img
                                src={`${GRAPHIC_BASE_URL}${img.src}`}
                                alt={img.title}
                                className={styles.galleryImage}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Videos Row */}
            <div className={styles.galleryRow}>
                <div className={styles.galleryGrid}>
                    {graphicVideos.map((vid, index) => {
                        const actualIndex = graphicImages.length + index;
                        return (
                            <div
                                key={index}
                                className={styles.galleryItem}
                                onClick={() => setFullscreenIndex(actualIndex)}
                            >
                                {/* Poster image thumbnail */}
                                {'poster' in vid && vid.poster && (
                                    <img
                                        src={`${GRAPHIC_BASE_URL}${vid.poster}`}
                                        alt={vid.title}
                                        className={styles.galleryImage}
                                        loading="lazy"
                                    />
                                )}
                                <div className={styles.playOverlay}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    // Render Photography content
    const renderPhotographyContent = () => (
        <div className={styles.galleryContainer}>
            <div className={styles.mosaicGrid}>
                {PHOTOGRAPHY_ITEMS.map((img, index) => (
                    <div
                        key={index}
                        className={styles.mosaicItem}
                        onClick={() => setFullscreenIndex(index)}
                    >
                        <img
                            src={`${PHOTOGRAPHY_BASE_URL}${img.src}`}
                            alt={img.title}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    // Render Videography content - vertical videos side by side
    const renderVideographyContent = () => (
        <div className={styles.galleryContainer}>
            <div className={styles.videoShowcase}>
                {VIDEOGRAPHY_ITEMS.map((vid, index) => (
                    <div
                        key={index}
                        className={styles.verticalVideoItem}
                        onClick={() => setFullscreenIndex(index)}
                    >
                        <video
                            src={`${VIDEOGRAPHY_BASE_URL}${vid.src}`}
                            className={styles.verticalVideoPreview}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        />
                        <div className={styles.playOverlay}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Get selected project for highlights
    const currentProject = selectedProject
        ? PROJECT_HIGHLIGHTS.find(p => p.id === selectedProject)
        : null;

    // Render Project Highlights content
    const renderProjectHighlightsContent = () => (
        <div className={styles.galleryContainer}>
            {!selectedProject ? (
                // Show project cards
                <div className={styles.projectGrid}>
                    {PROJECT_HIGHLIGHTS.map((project) => (
                        <div
                            key={project.id}
                            className={styles.projectCard}
                            onClick={() => setSelectedProject(project.id)}
                        >
                            <img
                                src={`${HIGHLIGHTS_BASE_URL}${project.id}/${project.thumbnail}`}
                                alt={project.name}
                                className={styles.projectLogo}
                            />
                            <h3 className={styles.projectName}>{project.name}</h3>
                        </div>
                    ))}
                </div>
            ) : currentProject ? (
                // Show project detail with hero items + supporting images
                <div className={styles.projectDetail}>
                    <button
                        className={styles.projectBackButton}
                        onClick={() => setSelectedProject(null)}
                    >
                        ← Back to Projects
                    </button>

                    {/* Hero Items - Main Images/Videos (skip for album layout) */}
                    {'heroLayout' in currentProject && currentProject.heroLayout === 'album' ? null : (
                        <div className={`${styles.projectHeroContainer} ${'heroLayout' in currentProject && currentProject.heroLayout === 'side-by-side' ? styles.heroSideBySide : ''}`}>
                            {currentProject.heroItems.map((heroItem, index) => (
                                <div
                                    key={index}
                                    className={styles.projectHero}
                                    onClick={() => setFullscreenIndex(index)}
                                >
                                    {heroItem.type === 'video' ? (
                                        <video
                                            src={`${HIGHLIGHTS_BASE_URL}${currentProject.id}/${heroItem.src}`}
                                            className={styles.projectHeroImage}
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            onMouseEnter={(e) => e.currentTarget.play()}
                                            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                        />
                                    ) : (
                                        <img
                                            src={`${HIGHLIGHTS_BASE_URL}${currentProject.id}/${heroItem.src}`}
                                            alt={heroItem.title}
                                            className={styles.projectHeroImage}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Images - Album layout uses mosaic, others use supporting grid */}
                    <div className={'heroLayout' in currentProject && currentProject.heroLayout === 'album' ? styles.mosaicGrid : styles.projectSupportingImages}>
                        {currentProject.supportingImages.map((img, index) => (
                            <div
                                key={index}
                                className={'heroLayout' in currentProject && currentProject.heroLayout === 'album' ? styles.mosaicItem : styles.supportingImageItem}
                                onClick={() => setFullscreenIndex(currentProject.heroItems.length + index)}
                            >
                                <img
                                    src={`${HIGHLIGHTS_BASE_URL}${currentProject.id}/${img.src}`}
                                    alt={img.title}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );

    // Get current gallery items based on expanded category
    const getCurrentGalleryItems = () => {
        if (expandedCategory === 0) return VIDEOGRAPHY_ITEMS;
        if (expandedCategory === 1) return PHOTOGRAPHY_ITEMS;
        if (expandedCategory === 3) return GRAPHIC_MOTION_ITEMS;
        if (expandedCategory === 5 && currentProject) {
            // Include hero items first, then supporting images
            return [
                ...currentProject.heroItems,
                ...currentProject.supportingImages.map(img => ({ ...img, type: 'image' as const }))
            ];
        }
        return [];
    };

    const currentGalleryItems = getCurrentGalleryItems();

    // Current fullscreen item
    const fullscreenItem = fullscreenIndex !== null && currentGalleryItems[fullscreenIndex]
        ? currentGalleryItems[fullscreenIndex]
        : null;

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
                            {!(expandedCategory === 5 && selectedProject) && (
                                <h1>{CATEGORIES[expandedCategory]?.title}</h1>
                            )}

                            {/* Render category-specific content */}
                            {expandedCategory === 0 ? (
                                renderVideographyContent()
                            ) : expandedCategory === 1 ? (
                                renderPhotographyContent()
                            ) : expandedCategory === 3 ? (
                                renderGraphicMotionContent()
                            ) : expandedCategory === 5 ? (
                                renderProjectHighlightsContent()
                            ) : (
                                <p>Content for {CATEGORIES[expandedCategory]?.title} coming soon.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Fullscreen viewer with navigation */}
                {fullscreenItem && (
                    <div className={styles.fullscreenOverlay}>
                        {/* Close button */}
                        <button className={styles.fullscreenClose} onClick={() => setFullscreenIndex(null)}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Left arrow */}
                        {fullscreenIndex !== null && fullscreenIndex > 0 && (
                            <button
                                className={`${styles.navArrow} ${styles.navArrowLeft}`}
                                onClick={(e) => { e.stopPropagation(); navigateFullscreen(-1, currentGalleryItems.length); }}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                        )}

                        {/* Right arrow */}
                        {fullscreenIndex !== null && fullscreenIndex < currentGalleryItems.length - 1 && (
                            <button
                                className={`${styles.navArrow} ${styles.navArrowRight}`}
                                onClick={(e) => { e.stopPropagation(); navigateFullscreen(1, currentGalleryItems.length); }}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        )}

                        {/* Counter */}
                        <div className={styles.fullscreenCounter}>
                            {fullscreenIndex !== null ? fullscreenIndex + 1 : 0} / {currentGalleryItems.length}
                        </div>

                        {/* Media content */}
                        {expandedCategory === 0 ? (
                            // Videography - fullscreen video
                            <video
                                key={fullscreenItem.src}
                                src={`${VIDEOGRAPHY_BASE_URL}${fullscreenItem.src}`}
                                className={styles.fullscreenVideo}
                                controls
                                controlsList="nodownload"
                                onContextMenu={(e) => e.preventDefault()}
                                autoPlay
                            />
                        ) : expandedCategory === 1 ? (
                            // Photography - all images
                            <img
                                src={`${PHOTOGRAPHY_BASE_URL}${fullscreenItem.src}`}
                                alt={fullscreenItem.title}
                                className={styles.fullscreenMedia}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        ) : expandedCategory === 5 && currentProject ? (
                            // Project Highlights - images or videos
                            'type' in fullscreenItem && fullscreenItem.type === 'video' ? (
                                <video
                                    key={fullscreenItem.src}
                                    src={`${HIGHLIGHTS_BASE_URL}${currentProject.id}/${fullscreenItem.src}`}
                                    className={styles.fullscreenVideo}
                                    controls
                                    controlsList="nodownload"
                                    onContextMenu={(e) => e.preventDefault()}
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={`${HIGHLIGHTS_BASE_URL}${currentProject.id}/${fullscreenItem.src}`}
                                    alt={fullscreenItem.title}
                                    className={styles.fullscreenMedia}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            )
                        ) : 'type' in fullscreenItem && fullscreenItem.type === 'image' ? (
                            <img
                                src={`${GRAPHIC_BASE_URL}${fullscreenItem.src}`}
                                alt={fullscreenItem.title}
                                className={styles.fullscreenMedia}
                            />
                        ) : (
                            <video
                                key={fullscreenItem.src}
                                src={`${GRAPHIC_BASE_URL}${fullscreenItem.src}`}
                                className={styles.fullscreenMedia}
                                controls
                                controlsList="nodownload"
                                onContextMenu={(e) => e.preventDefault()}
                                autoPlay
                            />
                        )}
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
