export default function RecommendationCard({ styles, bestPolicy }) {
  return (
    <div style={styles.policyCard}>
      <div style={styles.policyHeader}>
        <div>
          <h2 style={styles.policyName}>{bestPolicy.name}</h2>
          <p style={styles.policyBadge}>{"\u2713"} Best Match for You</p>
        </div>
        <div style={styles.scoreCircle}>
          <span style={styles.scoreValue}>{bestPolicy.score}</span>
          <span style={styles.scoreLabel}>/100</span>
        </div>
      </div>

      <div style={styles.policyDetails}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Premium</span>
          <span style={styles.detailValue}>{bestPolicy.premium}</span>
        </div>
        <div style={styles.detailDivider}></div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Coverage</span>
          <span style={styles.detailValue}>{bestPolicy.cover}</span>
        </div>
        <div style={styles.detailDivider}></div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Waiting Period</span>
          <span style={styles.detailValue}>{bestPolicy.waiting}</span>
        </div>
      </div>

      <button style={styles.selectPolicyButton}>Select This Plan</button>
    </div>
  );
}

