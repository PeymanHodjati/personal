'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExtendedProject } from '@/types';
import styles from '../app/portfolio/portfolio.module.css';

interface MorphingGalleryProps {
    projects: ExtendedProject[];
    onProjectClick: (project: ExtendedProject) => void;
}

// Organic blob shapes as SVG path data - each project gets a unique shape
const blobShapes = [
    "M44.5,-76.2C57.4,-69.3,67.5,-56.5,74.4,-42.3C81.3,-28.1,85,-12.5,83.9,2.6C82.8,17.6,76.9,32.1,68.1,44.5C59.3,56.9,47.6,67.2,34.1,73.8C20.6,80.4,5.3,83.3,-9.2,81.2C-23.7,79.1,-37.4,72,-49.5,62.2C-61.6,52.4,-72.1,39.9,-77.7,25.3C-83.3,10.7,-84,-6,-79.4,-20.8C-74.8,-35.6,-64.9,-48.5,-52.4,-55.7C-39.9,-62.9,-24.8,-64.4,-10.2,-68.7C4.4,-73,31.6,-83.1,44.5,-76.2Z",
    "M38.9,-67.3C50.6,-60.1,60.4,-49.5,67.8,-37.1C75.2,-24.7,80.2,-10.5,79.7,3.4C79.2,17.3,73.2,30.9,64.7,42.5C56.2,54.1,45.2,63.7,32.6,70.1C20,76.5,5.8,79.7,-8.8,79.5C-23.4,79.3,-38.4,75.7,-50.2,67.7C-62,59.7,-70.6,47.3,-75.4,33.5C-80.2,19.7,-81.2,4.5,-78.4,-9.6C-75.6,-23.7,-69,-36.7,-59.3,-46.8C-49.6,-56.9,-36.8,-64.1,-23.6,-70.3C-10.4,-76.5,3.2,-81.7,16.9,-80.8C30.6,-79.9,44.4,-72.9,38.9,-67.3Z",
    "M42.7,-73.1C55.7,-66.9,66.6,-55.8,73.2,-42.7C79.8,-29.6,82.1,-14.8,80.8,-0.8C79.5,13.2,74.6,26.4,67.3,38.3C60,50.2,50.3,60.8,38.4,68.2C26.5,75.6,12.5,79.8,-1.4,81.9C-15.3,84,-30.6,84,-43.5,77.5C-56.4,71,-66.9,58,-73.1,43.6C-79.3,29.2,-81.2,13.4,-79.4,-1.6C-77.6,-16.6,-72.1,-30.8,-63.5,-42.5C-54.9,-54.2,-43.2,-63.4,-30.4,-69.7C-17.6,-76,-5.8,-79.4,5.8,-78.8C17.4,-78.2,29.7,-79.3,42.7,-73.1Z",
    "M39.9,-68.5C51.8,-61.6,61.5,-50.5,68.9,-37.8C76.3,-25.1,81.4,-10.7,81.2,3.6C81,17.9,75.5,32.1,66.8,44C58.1,55.9,46.2,65.5,32.8,71.6C19.4,77.7,4.5,80.3,-10.8,79.6C-26.1,78.9,-41.8,74.9,-54.1,66.2C-66.4,57.5,-75.3,44.1,-79.6,29.3C-83.9,14.5,-83.6,-1.7,-79.3,-16.2C-75,-30.7,-66.7,-43.5,-55.4,-51.2C-44.1,-58.9,-29.8,-61.5,-16.6,-67.3C-3.4,-73.1,8.7,-82.1,21.5,-82.8C34.3,-83.5,47.8,-75.9,39.9,-68.5Z",
    "M45.3,-77.8C58.5,-70.6,68.8,-57.7,75.5,-43.4C82.2,-29.1,85.3,-13.4,84.1,1.9C82.9,17.2,77.4,32.1,68.7,44.6C60,57.1,48.1,67.2,34.6,73.6C21.1,80,6,82.7,-9.7,81.8C-25.4,80.9,-41.7,76.4,-54.4,67.3C-67.1,58.2,-76.2,44.5,-80.5,29.4C-84.8,14.3,-84.3,-2.2,-79.8,-17.3C-75.3,-32.4,-66.8,-46.1,-55.1,-54.1C-43.4,-62.1,-28.5,-64.4,-14.4,-69.6C-0.3,-74.8,13,-82.9,27.1,-83.3C41.2,-83.7,56.1,-76.4,45.3,-77.8Z",
];

export default function MorphingGallery({ projects, onProjectClick }: MorphingGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const currentProject = projects[currentIndex];
    const currentShape = blobShapes[currentIndex % blobShapes.length];

    const goToNext = () => {
        if (projects.length <= 1) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const goToPrev = () => {
        if (projects.length <= 1) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [projects.length]);

    if (projects.length === 0) {
        return <div className={styles.emptyState}>No projects available</div>;
    }

    return (
        <div className={styles.morphingGallery}>
            {/* Background Title */}
            <AnimatePresence mode="wait">
                <motion.h1
                    key={currentProject?.id}
                    className={styles.backgroundTitle}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 0.04, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    {currentProject?.title}
                </motion.h1>
            </AnimatePresence>

            {/* Morphing Blob Container */}
            <div className={styles.blobContainer}>
                <svg viewBox="0 0 200 200" className={styles.blobSvg}>
                    <defs>
                        <clipPath id="blobClip">
                            <motion.path
                                d={currentShape}
                                initial={false}
                                animate={{ d: currentShape }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                transform="translate(100, 100)"
                            />
                        </clipPath>
                    </defs>
                </svg>

                <div className={styles.blobImageWrapper} style={{ clipPath: 'url(#blobClip)' }}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={currentProject?.id}
                            className={styles.blobImage}
                            initial={{
                                opacity: 0,
                                scale: 1.1,
                                x: direction > 0 ? 100 : -100
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                x: direction > 0 ? -100 : 100
                            }}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            onClick={() => onProjectClick(currentProject)}
                        >
                            <img
                                src={currentProject?.thumbnail || '/placeholder.jpg'}
                                alt={currentProject?.title}
                            />
                            <div className={styles.blobOverlay}>
                                <span>View Project</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Project Info & Navigation */}
            <div className={styles.galleryControls}>
                <button
                    className={styles.navButton}
                    onClick={goToPrev}
                    aria-label="Previous project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                </button>

                <div className={styles.projectInfo}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProject?.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className={styles.projectMeta}
                        >
                            <span className={styles.projectCategory}>
                                {currentProject?.category}
                            </span>
                            <h2 className={styles.projectTitle}>
                                {currentProject?.title}
                            </h2>
                        </motion.div>
                    </AnimatePresence>

                    <div className={styles.projectCounter}>
                        <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                        <span className={styles.counterSeparator}>/</span>
                        <span>{String(projects.length).padStart(2, '0')}</span>
                    </div>
                </div>

                <button
                    className={styles.navButton}
                    onClick={goToNext}
                    aria-label="Next project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6" />
                    </svg>
                </button>
            </div>

            {/* Dots indicator */}
            <div className={styles.dotsContainer}>
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
