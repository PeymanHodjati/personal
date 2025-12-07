'use client';

import { motion } from 'framer-motion';
import { Project } from '@prisma/client';
import styles from '../app/portfolio/portfolio.module.css';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <motion.div
            layoutId={`card-${project.id}`}
            className={styles.card}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.img
                src={project.thumbnail}
                alt={project.title}
                className={styles.cardImage}
                layoutId={`image-${project.id}`}
            />
            <motion.div className={styles.cardOverlay}>
                <motion.h3 layoutId={`title-${project.id}`}>{project.title}</motion.h3>
                <p>{project.category}</p>
            </motion.div>
        </motion.div>
    );
}
