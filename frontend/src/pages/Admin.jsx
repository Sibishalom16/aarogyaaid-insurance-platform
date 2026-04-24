import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function Admin({ styles }) {
  const [logged, setLogged] = useState(
    localStorage.getItem("admin") === "yes"
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [policyName, setPolicyName] = useState("");
  const [insurer, setInsurer] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [toast, setToast] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- TOAST ----------------

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ---------------- LOGIN ----------------

  const login = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin", "yes");
      setLogged(true);
      showToast("Login successful");
      loadFiles();
    } else {
      showToast("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setLogged(false);
    setUsername("");
    setPassword("");
  };

  // ---------------- LOAD FILES ----------------

  const loadFiles = async () => {
    try {
      const res = await fetch(`${API}/admin/files`);
      const data = await res.json();
      setFiles(data.files || []);
    } catch (error) {
      showToast("Backend not connected");
    }
  };

  useEffect(() => {
    if (logged) loadFiles();
  }, [logged]);

  // ---------------- FILE PICK ----------------

  const pickFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  // ---------------- UPLOAD ----------------

  const uploadFile = async () => {
    if (!selectedFile) {
      showToast("Choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("policy_name", policyName);
    formData.append("insurer", insurer);

    try {
      setLoading(true);

      await fetch(`${API}/admin/upload`, {
        method: "POST",
        body: formData,
      });

      setPolicyName("");
      setInsurer("");
      setSelectedFile(null);

      document.getElementById("fileInput").value = "";

      showToast("Uploaded successfully");
      loadFiles();
    } catch (error) {
      showToast("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE ----------------

  const deleteFile = async (id) => {
    const ok = window.confirm(
      "Delete this file permanently?"
    );

    if (!ok) return;

    try {
      await fetch(`${API}/admin/delete/${id}`, {
        method: "DELETE",
      });

      showToast("Deleted successfully");
      loadFiles();
    } catch {
      showToast("Delete failed");
    }
  };

  // ---------------- EDIT INPUT ----------------

  const updateInput = (id, key, value) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  // ---------------- SAVE EDIT ----------------

  const saveEdit = async (item) => {
    try {
      await fetch(`${API}/admin/update/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          policy: item.policy,
          insurer: item.insurer,
        }),
      });

      showToast("Changes saved");
      loadFiles();
    } catch {
      showToast("Update failed");
    }
  };

  // ---------------- LOGIN PAGE ----------------

  if (!logged) {
    return (
      <div style={styles.page}>
        {toast && <Toast toast={toast} />}

        <div
          style={{
            maxWidth: "420px",
            margin: "90px auto",
            background: "#ffffff",
            borderRadius: "22px",
            padding: "38px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            🔐
          </div>

          <h2
            style={{
              margin: 0,
              textAlign: "center",
              color: "#0f172a",
              fontSize: "30px",
              fontWeight: "800",
            }}
          >
            Admin Access
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            Secure knowledge base login
          </p>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, marginTop: "14px" }}
          />

          <button
            onClick={login}
            style={{ ...mainBtn, marginTop: "18px" }}
          >
            Unlock Admin Panel
          </button>
        </div>
      </div>
    );
  }

  // ---------------- ADMIN PAGE ----------------

  return (
    <div style={styles.page}>
      {toast && <Toast toast={toast} />}

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {/* Header */}

        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
                  color: "#0f172a",
                  fontWeight: "800",
                }}
              >
                Admin Dashboard
              </h1>

              <p
                style={{
                  marginTop: "6px",
                  color: "#64748b",
                  marginBottom: 0,
                }}
              >
                Manage uploaded policy documents
              </p>
            </div>

            <button
              onClick={logout}
              style={{
                ...mainBtn,
                width: "180px",
                padding: "14px",
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Upload */}

        <div style={cardStyle}>
          <h3 style={titleStyle}>Upload New Policy</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <input
              placeholder="Policy Name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Insurer Name"
              value={insurer}
              onChange={(e) => setInsurer(e.target.value)}
              style={inputStyle}
            />
          </div>

          <label style={uploadBox}>
            📁 {selectedFile ? selectedFile.name : "Choose File"}

            <input
              id="fileInput"
              type="file"
              accept=".pdf,.json,.txt"
              onChange={pickFile}
              style={{ display: "none" }}
            />
          </label>

          <button
            onClick={uploadFile}
            style={{
              ...mainBtn,
              marginTop: "14px",
              width: "180px",
            }}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>

          <p
            style={{
              color: "#64748b",
              marginTop: "12px",
              marginBottom: 0,
            }}
          >
            Supported formats: PDF / JSON / TXT
          </p>
        </div>

        {/* Files */}

        <div style={cardStyle}>
          <h3 style={titleStyle}>
            Current Policies ({files.length})
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "800",
                        color: "#0f172a",
                        fontSize: "18px",
                      }}
                    >
                      📄 {file.fileName}
                    </div>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "14px",
                        marginTop: "4px",
                      }}
                    >
                      {file.type} • {file.date}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteFile(file.id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "12px",
                  }}
                >
                  <input
                    value={file.policy}
                    onChange={(e) =>
                      updateInput(
                        file.id,
                        "policy",
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />

                  <input
                    value={file.insurer}
                    onChange={(e) =>
                      updateInput(
                        file.id,
                        "insurer",
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />
                </div>

                <button
                  onClick={() => saveEdit(file)}
                  style={{
                    ...mainBtn,
                    width: "140px",
                    marginTop: "14px",
                    padding: "12px",
                    fontSize: "14px",
                  }}
                >
                  Save Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- TOAST ----------------

function Toast({ toast }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "22px",
        right: "22px",
        background:
          "linear-gradient(135deg,#2563eb 0%, #7c3aed 100%)",
        color: "#fff",
        padding: "14px 20px",
        borderRadius: "14px",
        fontWeight: "700",
        zIndex: 9999,
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
      }}
    >
      {toast}
    </div>
  );
}

// ---------------- STYLES ----------------

const cardStyle = {
  background: "#ffffff",
  borderRadius: "22px",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
};

const titleStyle = {
  marginTop: 0,
  marginBottom: "18px",
  color: "#0f172a",
  fontSize: "26px",
  fontWeight: "800",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const mainBtn = {
  border: "none",
  borderRadius: "14px",
  padding: "16px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "800",
  fontSize: "15px",
  background:
    "linear-gradient(135deg,#2563eb 0%, #7c3aed 100%)",
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
};

const uploadBox = {
  width: "100%",
  display: "block",
  padding: "18px",
  textAlign: "center",
  border: "2px dashed #94a3b8",
  borderRadius: "16px",
  background: "#f8fafc",
  cursor: "pointer",
  fontWeight: "700",
  color: "#334155",
  boxSizing: "border-box",
};