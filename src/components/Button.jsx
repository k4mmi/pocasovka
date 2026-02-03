import "./Button.scss"
import { Link } from "react-router"
import { useRef, useEffect } from "react";
import { createScope, text, animate, stagger, onScroll } from "animejs";

export function Button({ children, type = "small", color = "green", location = "out", to = "#", target = "_self" }) {

    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {

        scope.current = createScope({ root }).add(self => {

            animate(root.current, {
                y: [
                    { to: ['10px', '0'] },
                ],
                                opacity: [
                    { to: ['0%', '100%'] },
                ],
                duration: 2000,
                ease: 'outElastic(.1, .6)',
                loop: false,
                autoplay: onScroll({
                    container: '.scroll-container',
                    // debug: true, 
                    enter: 'bottom -=-30 top',
                }),
            });

        });

        return () => scope.current.revert()

    }, []);

    if (target === "_self") {
        return (
            <Link className={`button button-${type} button-${color} button-${location}`} to={to} target={target}>
                <span className="button__text" ref={root}>
                    {children}
                </span>
            </Link>
        )
    } else {
        return (
            <a className={`button button-${type} button-${color} button-${location}`} href={to} target={target}>
                <span className="button__text" ref={root}>
                    {children}
                </span>
            </a>
        )
    }
}