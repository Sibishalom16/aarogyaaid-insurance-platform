export default function Footer({ styles }) {
  return (
    <div style={styles.footerSection}>
      <div style={styles.footerContent}>
        <p style={styles.footerText}>
          Built with <span style={styles.heart}>{"\u2764\uFE0F"}</span> using React • FastAPI • Groq AI
        </p>
        <p style={styles.footerAuthor}>Developed by Sibi</p>
      </div>
    </div>
  );
}

