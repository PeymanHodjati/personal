'use client';

import { useState } from 'react';
import { projects, ProjectCategory } from '@/data/projects';
import styles from './PortfolioGrid.module.css';

export default function PortfolioGrid() {
    const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const categories: { value: ProjectCategory | 'all', label: string }[] = [
        { value: 'all', label: 'All Work' },
        { value: 'video', label: 'Video' },
        { value: 'photo', label: 'Photography' },
        { value: 'virtual-tour', label: 'Virtual Tours' },
    ];

    return (
        <div>
            <div className={styles.filterContainer}>
                {categories.map(cat => (
                    <button
                        key={cat.value}
                        className={`${styles.filterBtn} ${filter === cat.value ? styles.active : ''}`}
                        onClick={() => setFilter(cat.value)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredProjects.map(project => (
                    <div key={project.id} className={styles.card}>
                        {/* Using standard img for placeholder, but should be Image in prod */}
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className={styles.thumbnail}
                        />
                        <div className={styles.content}>
                            <span className={styles.category}>{project.category.replace('-', ' ')}</span>
                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
