import "./Heading.scss";
import { useRef, useEffect } from "react";
import { createScope, text, animate, stagger } from "animejs";

export function Heading({ children }) {

    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {

        scope.current = createScope({ root }).add(self => {

            // Don't use this char option next time, it little bit cook the code
            const { chars } = text.split(root.current, {
                chars: { wrap: 'clip' },
            });

            animate(chars, {
                y: [
                    { to: ['100%', '0%'] },
                ],
                duration: 750,
                ease: 'outElastic(1, .6)',
                delay: stagger(40),
                loop: false,
            });

        });

        return () => scope.current.revert()

    }, []);

    return (
        <h2 className="heading" ref={root}>
            {children}
        </h2>
    );
}