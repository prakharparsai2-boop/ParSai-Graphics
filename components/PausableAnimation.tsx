import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface PausableAnimationProps {
    children: React.ReactNode;
    className?: string;
    tag?: keyof React.ReactHTML;
}

/**
 * A wrapper component that adds an 'in-view' class when visible,
 * which can be used in CSS to control 'animation-play-state'.
 */
const PausableAnimation: React.FC<PausableAnimationProps> = ({
    children,
    className = '',
    tag: Tag = 'div'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useIntersectionObserver(ref as React.RefObject<Element>, {
        threshold: 0.1,
        rootMargin: '100px', // Start animations slightly before they enter
    });

    return (
        <Tag
            ref={ref}
            className={`${className} ${isInView ? 'is-in-view' : 'is-out-of-view'}`}
        >
            {children}
        </Tag>
    );
};

export default PausableAnimation;
