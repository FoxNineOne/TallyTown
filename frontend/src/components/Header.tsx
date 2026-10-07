import { useLocation } from "react-router-dom";

export default function Header() {
  const isHomePage =
    window.location.pathname === "/" || window.location.pathname === "/login";
  // useLocation automatically triggers a re-render when the URL changes
  const location = useLocation();

  return (
    <div className="site-header">
      <div className="header-left">
        <button
          id="menu-btn"
          className={`menu-btn ${isHomePage ? "hidden" : ""} `}
        >
          ☰
        </button>
      </div>
      <div className="header-center">
        <h1>
          <a href="/">TallyTown</a>
          <img
            className="header-image"
            src="/img/icons/TallyIcon_White_500.png"
            alt="TallyTown Logo"
          />
        </h1>
      </div>
      <div className="header-right">{/* Future content goes here */}</div>
    </div>
  );
}
