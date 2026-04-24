import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import About from "./pages/About";
import styles from "./appStyles";

export default function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Navbar styles={styles} />
        <Routes>
          <Route path="/" element={<Home styles={styles} />} />
          <Route path="/admin" element={<Admin styles={styles} />} />
          <Route path="/about" element={<About styles={styles} />} />
        </Routes>
        <Footer styles={styles} />
      </div>
    </Router>
  );
}

