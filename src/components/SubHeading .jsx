import "./SubHeading.scss"
import { useRef, useEffect } from "react";
import { createScope, text, animate, stagger, onScroll } from "animejs";

export function SubHeading({ children }) {

    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {

        scope.current = createScope({ root }).add(self => {

            // Don't use this char option next time, it little bit cook the code
            const { words } = text.split(root.current, {
                chars: { wrap: 'clip' },
            });

            animate(words, {
                y: [
                    { to: ['50%', '0%'] },
                ],
                opacity: [
                    { to: ['0%', '100%'] },
                ],
                duration: 750,
                ease: 'outElastic(1, .6)',
                delay: stagger(40),
                loop: false,
                autoplay: onScroll({
                    container: '.scroll-container',
                    // debug: true, 
                    enter: 'bottom -=-60 top',
                }),
            });

        });

        return () => scope.current.revert()

    }, []);

    return (
        <h3 className="subHeading" ref={root}>
            {children}
        </h3>
    )
}