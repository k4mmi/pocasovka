import { animateScroll } from "react-scroll";
import { useState, useEffect } from "react";
import "./ScrollUp.scss"

export function ScrollUp() {

    const [ className, setClassName ] = useState("scrollUp-top");

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            // The number is break point of hidden/unhidden
            if ( window.pageYOffset <= 600 ) {
                setClassName('scrollUp-top');
            } else {
                setClassName('scrollUp-notTop');
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });


    return(
        <button className={`scrollUp ${className}`} onClick={() => animateScroll.scrollToTop( {duration: 1000, smooth: true,} )} title="Vrátit se nahoru"  loading="lazy" fetchPriority="high">
            <img className="scrollUp__image" src="../../assets/scrollUp.svg"/>
        </button>
    );
}