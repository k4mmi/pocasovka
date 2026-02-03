import { Link } from "react-router";
import { OutSign } from "./OutSign";
import "./Nav.scss";

export function Nav() {
    return (
        <nav className="nav">
            <div className="nav__section nav__section-left">
                <NavLink to="/">Počasovka</NavLink>
            </div>
            <div className="nav__section nav__section-center">
                <NavLink to="/game">Hrát</NavLink>
            </div>
            <div className="nav__section nav__section-right">
                <NavLinkOut target="_blank" to="https://github.com/k4mmi/pocasovka">GitHub<OutSign/></NavLinkOut>
            </div>
        </nav>
    );
}

export function NavBottom() {
    return (
        <div className="nav">
            <div className="nav__section">
                <NavLink to="/#game">Hrát</NavLink>
            </div>
            <div className="nav__section">
                <NavLinkOut target="_blank" to="https://github.com/k4mmi/pocasovka">GitHub<OutSign/></NavLinkOut>
            </div>
        </div>
    );
}

function NavLink({ children, to }) {
    return (
        <div className="nav__link">
            <Link to={to}>
                <div className="nav__linkAnimation nav__linkAnimation-1">
                    {children}
                </div>
                <div className="nav__linkAnimation nav__linkAnimation-2">
                    {children}
                </div>
            </Link>
        </div>
    );
}

function NavLinkOut({ children, to }) {
    return (
        <div className="nav__link">
            <a href={to} target="_blank">
                <div className="nav__linkAnimation nav__linkAnimation-1">
                    {children}
                </div>
                <div className="nav__linkAnimation nav__linkAnimation-2">
                    {children}
                </div>
            </a>
        </div>
    );
}
