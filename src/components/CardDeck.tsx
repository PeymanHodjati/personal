'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import { ExtendedProject } from '@/types';
import styles from '../app/portfolio/portfolio.module.css';

interface CardDeckProps {
    projects: ExtendedProject[];
    title: string;
    onCardClick: (project: ExtendedProject) => void;
    isActive?: boolean;
}

export default function CardDeck({ projects, title, onCardClick, isActive = true }: CardDeckProps) {
    const [deck, setDeck] = useState(projects);
    const [isHovered, setIsHovered] = useState(false);
    const [flippingCard, setFlippingCard] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDeck(projects);
    }, [projects]);

    const topCard = deck[0];

    // Cycle with flip animation
    const cycleDeck = (direction: 'next' | 'prev' = 'next') => {
        if (deck.length <= 1 || flippingCard) return;

        if (direction === 'next') {
            // Start flip animation
            setFlippingCard(deck[0].id);

            // After flip animation completes, move card to back
            setTimeout(() => {
                setDeck(prev => {
                    const newDeck = [...prev];
                    const top = newDeck.shift();
                    if (top) newDeck.push(top);
                    return newDeck;
                });
                setFlippingCard(null);
            }, 500);
        } else {
            // Bring card from back to front
            setDeck(prev => {
                const newDeck = [...prev];
                const bottom = newDeck.pop();
                if (bottom) newDeck.unshift(bottom);
                return newDeck;
            });
        }
    };

    // Scroll Handler
    const handleWheel = (e: React.WheelEvent) => {
        if (Math.abs(e.deltaY) > 30 && !flippingCard) {
            cycleDeck(e.deltaY > 0 ? 'next' : 'prev');
        }
    };

    // Keyboard Handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isHovered || flippingCard) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                cycleDeck('next');
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                cycleDeck('prev');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isHovered, flippingCard]);

    // Swipe Handler
    const handleDragEnd = (event: any, info: PanInfo) => {
        if (flippingCard) return;
        const swipeThreshold = 80;
        if (info.offset.x < -swipeThreshold) {
            cycleDeck('next');
        } else if (info.offset.x > swipeThreshold) {
            cycleDeck('prev');
        }
    };

    if (!isActive) return null;

    return (
        <div
            className={styles.deckContainer}
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={containerRef}
        >
            {/* Background Title */}
            <div className={styles.cinematicTitle}>
                <motion.h1
                    key={topCard?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.06, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {topCard?.title || title}
                </motion.h1>
            </div>

            <div className={styles.cardsWrapper}>
                <AnimatePresence mode="popLayout">
                    {deck.slice(0, 5).map((project, index) => {
                        const isTop = index === 0;
                        const isFlipping = project.id === flippingCard;
                        const stackOffset = 6;

                        return (
                            <motion.div
                                key={project.id}
                                className={styles.deckCard}
                                style={{
                                    zIndex: isFlipping ? 100 : deck.length - index,
                                    transformStyle: 'preserve-3d'
                                }}

                                initial={false}

                                animate={isFlipping ? {
                                    // 3D flip animation - card rotates and moves to back
                                    rotateY: [0, -90, -90, 0],
                                    x: [0, 100, 100, index * stackOffset],
                                    y: [0, -20, -20, index * stackOffset],
                                    scale: [1, 0.9, 0.9, 1 - (deck.length - 1) * 0.03],
                                    z: [0, -200, -200, -(deck.length - 1) * 50],
                                    opacity: [1, 0.5, 0.5, 0.4],
                                } : {
                                    rotateY: 0,
                                    x: index * stackOffset,
                                    y: index * stackOffset,
                                    scale: 1 - index * 0.03,
                                    z: -index * 50,
                                    opacity: 1 - index * 0.15,
                                    rotateZ: isTop ? 0 : (index % 2 === 0 ? 1 : -1),
                                }}

                                transition={isFlipping ? {
                                    duration: 0.5,
                                    times: [0, 0.4, 0.6, 1],
                                    ease: "easeInOut"
                                } : {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}

                                drag={isTop && !flippingCard ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.1}
                                onDragEnd={handleDragEnd}

                                onClick={() => isTop && !flippingCard && onCardClick(project)}

                                whileHover={isTop && !flippingCard ? {
                                    scale: 1.02,
                                    y: -3,
                                    boxShadow: "0 50px 100px -30px rgba(0,0,0,0.9)"
                                } : {}}
                            >
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className={styles.cardImage}
                                    draggable={false}
                                />

                                {isTop && !flippingCard && (
                                    <div className={styles.cardOverlayMinimal}>
                                        <p>View Project</p>
                                    </div>
                                )}

                                {!isTop && !isFlipping && (
                                    <div
                                        className={styles.cardDimmer}
                                        style={{ opacity: 0.15 + (index * 0.1) }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {deck.length === 0 && (
                    <div className={styles.emptyDeck}>No Projects</div>
                )}
            </div>

            {/* Card counter */}
            <div className={styles.cardCounter}>
                <span>{(deck.findIndex(p => p.id === topCard?.id) % deck.length) + 1}</span>
                <span className={styles.counterDivider}>/</span>
                <span>{deck.length}</span>
            </div>
        </div>
    );
}
