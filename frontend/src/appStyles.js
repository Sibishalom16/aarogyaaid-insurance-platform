const styles = {
  // Global
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: "hidden",
  },

  // Navbar
  navbar: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "0 40px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
  },

  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },

  logo: {
    fontSize: "32px",
  },

  brandName: {
    fontSize: "24px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
  },

  navLinks: {
    display: "flex",
    gap: "15px",
  },

  navLink: {
    color: "#1e293b",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    background: "transparent",
    border: "2px solid transparent",
  },

  // Page Layout
  page: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "calc(100vh - 160px)",
  },

  // Hero Section
  heroSection: {
    textAlign: "center",
    marginBottom: "60px",
    position: "relative",
    paddingTop: "40px",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
  },

  heroTitle: {
    fontSize: "56px",
    fontWeight: "800",
    margin: "0 0 20px 0",
    color: "#ffffff",
    lineHeight: "1.2",
    animation: "fadeInDown 0.8s ease",
  },

  gradient: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "900",
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#cbd5e1",
    maxWidth: "500px",
    margin: "0 auto",
    animation: "fadeInUp 0.8s ease 0.2s both",
  },

  heroDecor: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)",
    borderRadius: "50%",
    filter: "blur(40px)",
    zIndex: 1,
  },

  // Form
  formContainer: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "24px",
    padding: "50px",
    marginBottom: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    animation: "fadeInUp 0.8s ease 0.4s both",
  },

  formHeader: {
    textAlign: "center",
    marginBottom: "40px",
  },

  formTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 10px 0",
  },

  formSubtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: "0",
  },

  gridForm: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "30px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  inputField: {
    padding: "14px 18px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "16px",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: "#f8fafc",
  },

  selectField: {
    padding: "14px 18px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "16px",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: "#f8fafc",
    cursor: "pointer",
  },

  primaryButton: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
  },

  // Results
  resultsContainer: {
    animation: "fadeInUp 0.8s ease 0.6s both",
  },

  policyCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "30px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    border: "2px solid #e0e7ff",
  },

  policyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
    borderBottom: "2px solid #f1f5f9",
    paddingBottom: "25px",
  },

  policyName: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },

  policyBadge: {
    fontSize: "13px",
    color: "#10b981",
    fontWeight: "600",
    margin: "0",
  },

  scoreCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
  },

  scoreValue: {
    fontSize: "40px",
    fontWeight: "900",
  },

  scoreLabel: {
    fontSize: "12px",
    fontWeight: "600",
    opacity: 0.9,
  },

  policyDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    marginBottom: "30px",
  },

  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  detailLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  detailValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
  },

  detailDivider: {
    display: "none",
  },

  selectPolicyButton: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
  },

  // Reason Card
  reasonCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    borderLeft: "5px solid #3b82f6",
  },

  reasonTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 15px 0",
  },

  reasonText: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: "1.6",
    margin: "0",
  },

  // Chat Card
  chatCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },

  chatTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 20px 0",
  },

  chatInputGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },

  chatInput: {
    flex: 1,
    padding: "14px 18px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "16px",
    fontFamily: "inherit",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#f8fafc",
  },

  chatButton: {
    padding: "14px 24px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  chatReply: {
    background: "#f0f9ff",
    borderLeft: "4px solid #3b82f6",
    padding: "20px",
    borderRadius: "12px",
    animation: "slideIn 0.3s ease",
  },

  chatReplyText: {
    margin: "0",
    color: "#1e293b",
    fontSize: "15px",
    lineHeight: "1.6",
  },

  // Admin
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 160px)",
  },

  loginCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "60px 40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },

  lockIcon: {
    fontSize: "60px",
    marginBottom: "20px",
  },

  loginTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },

  loginSubtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0 0 30px 0",
  },

  passwordInput: {
    width: "100%",
    padding: "14px 18px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "16px",
    marginBottom: "20px",
    outline: "none",
    boxSizing: "border-box",
  },

  adminContainer: {
    animation: "fadeInUp 0.8s ease both",
  },

  adminHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "40px",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },

  adminTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },

  adminSubtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: "0",
  },

  logoutButton: {
    padding: "12px 24px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  uploadSection: {
    marginBottom: "40px",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 20px 0",
  },

  uploadBox: {
    border: "2px dashed #cbd5e1",
    borderRadius: "14px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#f8fafc",
  },

  fileInput: {
    display: "none",
  },

  uploadText: {
    color: "#64748b",
    fontSize: "16px",
    margin: "0",
  },

  filesSection: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },

  filesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  fileItem: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
  },

  fileInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  fileIcon: {
    fontSize: "20px",
  },

  fileName: {
    fontWeight: "600",
    color: "#1e293b",
    fontSize: "15px",
  },

  deleteButton: {
    padding: "8px 16px",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "14px",
  },

  // About
  aboutContainer: {
    animation: "fadeInUp 0.8s ease both",
  },

  aboutHeader: {
    textAlign: "center",
    marginBottom: "60px",
    color: "white",
  },

  aboutTitle: {
    fontSize: "48px",
    fontWeight: "800",
    margin: "0 0 15px 0",
  },

  aboutSubtitle: {
    fontSize: "18px",
    color: "#cbd5e1",
    margin: "0",
  },

  aboutContent: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "50px",
    marginBottom: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
  },

  aboutText: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#475569",
    marginBottom: "40px",
    margin: "0 0 40px 0",
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
  },

  featureCard: {
    background: "#f8fafc",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    border: "2px solid #e2e8f0",
    transition: "all 0.3s ease",
  },

  featureIcon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "15px",
  },

  featureName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 10px 0",
  },

  featureDesc: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0",
    lineHeight: "1.6",
  },

  aboutFooter: {
    textAlign: "center",
    padding: "30px",
    color: "#cbd5e1",
    fontSize: "14px",
  },

  aboutFooterText: {
    margin: "0",
  },

  // Footer
  footerSection: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "30px",
    marginTop: "60px",
  },

  footerContent: {
    textAlign: "center",
    color: "#cbd5e1",
  },

  footerText: {
    fontSize: "14px",
    margin: "0 0 8px 0",
  },

  heart: {
    animation: "heartbeat 1.5s ease-in-out infinite",
  },

  footerAuthor: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: "0",
  },
};

const STYLE_ELEMENT_ID = "aarogyaaid-global-animations";

if (typeof document !== "undefined" && !document.getElementById(STYLE_ELEMENT_ID)) {
  const styleSheet = document.createElement("style");
  styleSheet.id = STYLE_ELEMENT_ID;
  styleSheet.textContent = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  input:focus, select:focus {
    border-color: #3b82f6 !important;
    background-color: #fff !important;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2) !important;
  }

  a:hover {
    background-color: #dbeafe !important;
    transform: translateY(-2px);
  }
`;
  document.head.appendChild(styleSheet);
}

export default styles;
