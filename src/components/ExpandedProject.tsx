'use client';

import { motion } from 'framer-motion';
import { Project } from '@prisma/client';
import styles from '../app/portfolio/portfolio.module.css';
import { useEffect } from 'react';

interface ExpandedProjectProps {
    project: Project;
    onClose: () => void;
}

export default function ExpandedProject({ project, onClose }: ExpandedProjectProps) {
    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className={styles.expandedOverlay} onClick={onClose}>
            <motion.div
                layoutId={`card-${project.id}`}
                className={styles.expandedCard}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
                <button className={styles.closeButton} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className={styles.expandedImage}
                    layoutId={`image-${project.id}`}
                />

                <div className={styles.expandedContent}>
                    <motion.h2 layoutId={`title-${project.id}`}>{project.title}</motion.h2>
                    <p className={styles.category}>{project.category}</p>
                    <p className={styles.description}>{project.description}</p>

                    {/* Render content based on layout type */}
                    {project.layout === 'video' && project.mediaUrl && (
                        <div className={styles.videoContainer}>
                            <iframe
                                src={project.mediaUrl}
                                title={project.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    {/* Placeholder for Gallery Layout - to be implemented with real data */}
                    {project.layout === 'gallery' && (
                        <div className={styles.galleryGrid}>
                            {/* Images would go here */}
                            <div className={styles.galleryPlaceholder}>Gallery View Coming Soon</div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
