function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Deep Legend</div>
      <div style={styles.links}>
        <a href="#home" style={styles.link}>
          Home
        </a>
        <a href="#about" style={styles.link}>
          About
        </a>
        <a href="#contact" style={styles.link}>
          Contact
        </a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1a2e4a", // dark blue
    color: "#e1e9f0", // light blue-ish text
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  brand: {
    fontWeight: "700",
    fontSize: 24,
    cursor: "default",
  },
  links: {
    display: "flex",
    gap: 25,
  },
  link: {
    color: "#e1e9f0",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: 16,
    cursor: "pointer",
    transition: "color 0.3s",
  },
};

export default Navbar;
