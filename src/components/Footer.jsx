import "./Footer.scss"
import { NavBottom } from "./Nav"

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__navWrapper">
                <NavBottom/>
            </div>
            <div className="footer__cloudWrapper">
                <img className="footer__img" src="./assets/logo.svg" loading="lazy" fetchPriority="high"/>
            </div>
        </footer>
    );
}