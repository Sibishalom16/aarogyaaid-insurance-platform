export default function About({ styles }) {
  return (
    <div style={styles.page}>
      <div style={styles.aboutContainer}>
        <div style={styles.aboutHeader}>
          <h1 style={styles.aboutTitle}>About AarogyaAid</h1>
          <p style={styles.aboutSubtitle}>Intelligent Insurance Recommendations for Everyone</p>
        </div>

        <div style={styles.aboutContent}>
          <p style={styles.aboutText}>
            AarogyaAid is an AI-powered insurance recommendation platform designed to simplify your health insurance journey. We believe everyone deserves access to the perfect insurance plan without confusion or complexity.
          </p>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>{"\u{1F916}"}</span>
              <h3 style={styles.featureName}>Smart Recommendations</h3>
              <p style={styles.featureDesc}>Personalized plans based on your age, lifestyle, and health profile</p>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>{"\u{1F4A1}"}</span>
              <h3 style={styles.featureName}>AI Explanations</h3>
              <p style={styles.featureDesc}>Understand why each plan is recommended for you</p>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>{"\u{1F4E4}"}</span>
              <h3 style={styles.featureName}>Admin Upload</h3>
              <p style={styles.featureDesc}>Manage and update insurance policies easily</p>
            </div>

            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>{"\u{1F4AC}"}</span>
              <h3 style={styles.featureName}>Chat Support</h3>
              <p style={styles.featureDesc}>Get instant answers to your insurance questions</p>
            </div>
          </div>
        </div>

        <div style={styles.aboutFooter}>
          <p style={styles.aboutFooterText}>
            Built with React • FastAPI • Groq AI | Developed by <strong>Sibiraj</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

