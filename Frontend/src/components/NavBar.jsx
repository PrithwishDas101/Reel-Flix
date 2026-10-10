import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink to="/" className="navbar-brand" aria-label="Reel Flix home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>reel<span className="brand-light">flix</span></span>
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>Discover</NavLink>
          <NavLink to="/favourites" className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}>Watchlist</NavLink>
        </div>
        <span className="nav-note">A little more cinema.</span>
      </nav>
    </header>
  );
}

export default NavBar;
