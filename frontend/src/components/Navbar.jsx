import { Link } from "react-router-dom";

export default function Navbar({ styles }) {
  return (
    <div style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.navBrand}>
          <span style={styles.logo}>{"\u{1F3E5}"}</span>
          <h2 style={styles.brandName}>AarogyaAid</h2>
        </div>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          <Link to="/admin" style={styles.navLink}>
            Admin
          </Link>
          <Link to="/about" style={styles.navLink}>
            About
          </Link>
        </div>
      </div>
    </div>
  );
}

