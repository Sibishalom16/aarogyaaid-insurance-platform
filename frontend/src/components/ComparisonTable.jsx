export default function ComparisonTable({ data = [] }) {
  const rows =
    data.length > 0
      ? data
      : [
          {
            name: "Care Supreme",
            insurer: "Care Health",
            premium: "₹12,000",
            cover: "₹10 Lakhs",
            waiting: "1 Year",
            benefit: "No claim bonus + fast cashless network",
            score: 96,
          },
          {
            name: "Star Health Gold",
            insurer: "Star Health",
            premium: "₹14,000",
            cover: "₹8 Lakhs",
            waiting: "2 Years",
            benefit: "Affordable premium with family options",
            score: 88,
          },
          {
            name: "Niva Bupa Secure",
            insurer: "Niva Bupa",
            premium: "₹16,000",
            cover: "₹15 Lakhs",
            waiting: "1 Year",
            benefit: "Restore benefit + high coverage",
            score: 91,
          },
        ];

  const getScoreColor = (score) => {
    if (score >= 95) return "#00ff95";
    if (score >= 90) return "#ffd700";
    return "#ff8a8a";
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "24px",
        marginTop: "24px",
        overflowX: "auto",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "18px",
        }}
      >
        Peer Comparison Table
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
          minWidth: "1200px",
        }}
      >
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.08)" }}>
            <th style={th}>Policy Name</th>
            <th style={th}>Insurer</th>
            <th style={th}>Premium (Rs/yr)</th>
            <th style={th}>Cover Amount</th>
            <th style={th}>Waiting Period</th>
            <th style={th}>Key Benefit</th>
            <th style={th}>Suitability Score</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item, index) => (
            <tr
              key={index}
              style={{
                borderBottom:
                  "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <td style={td}>
                {item.name || item.policy_name}
              </td>

              <td style={td}>
                {item.insurer || "Not Available"}
              </td>

              <td style={td}>{item.premium}</td>

              <td style={td}>{item.cover}</td>

              <td style={td}>{item.waiting}</td>

              <td
                style={{
                  ...td,
                  maxWidth: "260px",
                  lineHeight: "1.5",
                }}
              >
                {item.benefit || "Good coverage benefits"}
              </td>

              <td
                style={{
                  ...td,
                  fontWeight: "700",
                  color: getScoreColor(item.score),
                }}
              >
                {item.score}/100
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p
        style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: "13px",
          marginTop: "14px",
          marginBottom: 0,
        }}
      >
        Policies ranked based on age, lifestyle,
        health condition, income, city tier and
        suitability score.
      </p>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "14px",
  fontSize: "14px",
  fontWeight: "700",
  whiteSpace: "nowrap",
};

const td = {
  padding: "14px",
  fontSize: "14px",
  verticalAlign: "top",
};