import { useState } from "react";
import RecommendationCard from "../components/RecommendationCard";
import ChatBox from "../components/ChatBox";
import ComparisonTable from "../components/ComparisonTable";
import CoverageTable from "../components/CoverageTable";
import { recommendPolicy } from "../services/api";
import { downloadPDF } from "../utils/pdfExport";

export default function Home({ styles }) {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    lifestyle: "",
    conditions: "",
    income: "",
    city: "",
  });

  const [data, setData] = useState(null);
  const [chat, setChat] = useState("");
  const [chatReply, setChatReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const recommend = async () => {
    setLoading(true);

    try {
      const res = await recommendPolicy(form);
      setData(res.data);
    } catch (err) {
      alert("Backend not running");
    } finally {
      setLoading(false);
    }
  };

  const askChat = () => {
    const msg = chat.toLowerCase();

    if (msg.includes("waiting")) {
      setChatReply(
        "Waiting period means some treatments can be claimed only after a fixed duration."
      );
    } else if (msg.includes("copay")) {
      setChatReply(
        "Co-pay means you pay a percentage of claim amount and insurer pays rest."
      );
    } else if (msg.includes("premium")) {
      setChatReply(
        "Premium is the yearly amount you pay to keep your insurance active."
      );
    } else {
      setChatReply(
        "This policy suits your profile based on age, income, lifestyle and conditions."
      );
    }
  };

  return (
    <div style={styles.page}>
      {/* HERO */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Your Perfect Insurance Plan
            <br />
            <span style={styles.gradient}>Awaits</span>
          </h1>

          <p style={styles.heroSubtitle}>
            AI-powered recommendations tailored to your health profile
          </p>
        </div>

        <div style={styles.heroDecor}></div>
      </div>

      {/* FORM */}
      <div style={styles.formContainer}>
        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}>Tell Us About Yourself</h2>
          <p style={styles.formSubtitle}>
            Help us find your ideal insurance coverage
          </p>
        </div>

        <div style={styles.gridForm}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              name="fullName"
              placeholder="Enter name"
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Age</label>
            <input
              name="age"
              type="number"
              placeholder="30"
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Lifestyle</label>
            <select
              name="lifestyle"
              onChange={handleChange}
              style={styles.selectField}
            >
              <option value="">Choose</option>
              <option value="Active">Active</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Medical Conditions</label>
            <input
              name="conditions"
              placeholder="Diabetes / BP"
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Income</label>
            <select
              name="income"
              onChange={handleChange}
              style={styles.selectField}
            >
              <option value="">Choose</option>
              <option value="under 3L">Under ₹3 Lakhs</option>
              <option value="3-8L">₹3 - ₹8 Lakhs</option>
              <option value="8-15L">₹8 - ₹15 Lakhs</option>
              <option value="15L+">₹15 Lakhs+</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>City Type</label>
            <select
              name="city"
              onChange={handleChange}
              style={styles.selectField}
            >
              <option value="">Choose</option>
              <option value="Metro">Metro</option>
              <option value="Tier-2">Tier-2</option>
              <option value="Tier-3">Tier-3</option>
            </select>
          </div>
        </div>

        <button
          onClick={recommend}
          disabled={loading}
          style={{
            ...styles.primaryButton,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Finding Best Policy..." : "Get Personalized Recommendation"}
        </button>
      </div>

      {/* RESULTS */}
      {data && (
        <div style={styles.resultsContainer}>
          <RecommendationCard
            styles={styles}
            bestPolicy={data.best_policy}
          />

          {/* PDF DOWNLOAD BUTTON */}
          <button
            onClick={() => downloadPDF(form, data)}
            style={{
              padding: "12px 18px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "18px",
              boxShadow:
                "0 10px 25px rgba(37,99,235,0.25)",
            }}
          >
            📄 Download PDF Report
          </button>

          <div style={styles.reasonCard}>
            <h3 style={styles.reasonTitle}>Why This Plan?</h3>
            <p style={styles.reasonText}>{data.reason}</p>
          </div>

          <ComparisonTable
            data={[
              {
                policy_name:
                  data?.best_policy?.policy_name ||
                  "Care Supreme",
                premium:
                  data?.best_policy?.premium ||
                  "₹12,000",
                cover:
                  data?.best_policy?.cover ||
                  "₹10 Lakhs",
                waiting:
                  data?.best_policy?.waiting ||
                  "1 Year",
                score:
                  data?.best_policy?.score || 96,
              },
              {
                policy_name: "Star Health Gold",
                premium: "₹14,000",
                cover: "₹8 Lakhs",
                waiting: "2 Years",
                score: 88,
              },
              {
                policy_name: "Niva Bupa Secure",
                premium: "₹16,000",
                cover: "₹15 Lakhs",
                waiting: "1 Year",
                score: 91,
              },
            ]}
          />

          <CoverageTable />

          <ChatBox
            styles={styles}
            chat={chat}
            setChat={setChat}
            askChat={askChat}
            chatReply={chatReply}
          />
        </div>
      )}
    </div>
  );
}