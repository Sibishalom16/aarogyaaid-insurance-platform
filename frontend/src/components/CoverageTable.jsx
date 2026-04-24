export default function CoverageTable({ data = {} }) {
  const coverage = {
    inclusions:
      data.inclusions ||
      "Hospitalization, ICU, Daycare, Pre/Post treatment",

    exclusions:
      data.exclusions ||
      "Cosmetic surgery, Self injury, Dental cosmetic",

    sub_limits:
      data.sub_limits ||
      "₹5,000/day room rent cap",

    copay:
      data.copay || "10%",

    claim:
      data.claim ||
      "Cashless + Reimbursement",
  };

  const styles = {
    card: {
      background: "rgba(255,255,255,0.06)",
      borderRadius: "18px",
      padding: "24px",
      marginTop: "22px",
      marginBottom: "22px",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "white",
      overflowX: "auto",
    },

    title: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "18px",
    },

    subtitle: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.65)",
      marginBottom: "16px",
      lineHeight: "1.6",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "900px",
    },

    th: {
      background: "rgba(255,255,255,0.08)",
      padding: "12px",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: "700",
      whiteSpace: "nowrap",
    },

    td: {
      padding: "12px",
      borderBottom:
        "1px solid rgba(255,255,255,0.08)",
      fontSize: "14px",
      verticalAlign: "top",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>
        Coverage Detail Table
      </h2>

      <p style={styles.subtitle}>
        Single-policy breakdown of covered
        benefits, exclusions, sub-limits,
        co-pay and claim process.
      </p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Inclusions</th>
            <th style={styles.th}>Exclusions</th>
            <th style={styles.th}>Sub-limits</th>
            <th style={styles.th}>Co-pay %</th>
            <th style={styles.th}>Claim Type</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={styles.td}>
              {coverage.inclusions}
            </td>

            <td style={styles.td}>
              {coverage.exclusions}
            </td>

            <td style={styles.td}>
              {coverage.sub_limits}
            </td>

            <td style={styles.td}>
              {coverage.copay}
            </td>

            <td style={styles.td}>
              {coverage.claim}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}