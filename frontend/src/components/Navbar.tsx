import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__logo">Budget Tracker</div>

          <div className="navbar__buttons">
            <button className="btn btn--outline">Log In</button>
            <button className="btn btn--primary">Get Started</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
