import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

/**
 * Custom hook to track if an element is in the viewport.
 * 
 * @param elementRef - React ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns boolean - true if the element is in the viewport
 */
export function useIntersectionObserver(
    elementRef: RefObject<Element>,
    {
        threshold = 0,
        root = null,
        rootMargin = '0%',
        freezeOnceVisible = false,
    }: IntersectionObserverOptions = {}
): boolean {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current; // DOM node
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef, threshold, root, rootMargin, frozen]);

    return !!entry?.isIntersecting;
}
