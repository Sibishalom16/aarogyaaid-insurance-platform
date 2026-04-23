import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    lifestyle: "",
    conditions: "",
    income: "",
    city: "",
  });

  const [result, setResult] = useState(null);
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setResult(data);
    setChatHistory([]);
    setChatQuestion("");
    setLoading(false);
  };

  const askChat = async () => {
    if (!chatQuestion.trim()) return;

    const newHistory = [
      ...chatHistory,
      { role: "user", text: chatQuestion }
    ];

    setChatHistory(newHistory);
    setLoadingChat(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: chatQuestion,
          policy: result.best_policy.name,
        }),
      });

      const data = await res.json();

      setChatHistory([
        ...newHistory,
        {
          role: "bot",
          text: data.answer || data.reply,
        },
      ]);

      setChatQuestion("");
    } catch (error) {
      setChatHistory([
        ...newHistory,
        {
          role: "bot",
          text: "Server error. Please try again.",
        },
      ]);
    }

    setLoadingChat(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center mb-10">
          AarogyaAid Insurance Finder
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-4 border border-white/20"
        >
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 outline-none"
          />

          <input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 outline-none"
          />

          <select
            name="lifestyle"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 outline-none"
          >
            <option value="">Lifestyle</option>
            <option>Sedentary</option>
            <option>Moderate</option>
            <option>Active</option>
            <option>Athlete</option>
          </select>

          <input
            name="conditions"
            placeholder="Pre-existing Conditions"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 outline-none"
          />

          <select
            name="income"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 outline-none"
          >
            <option value="">Income Band</option>
            <option>under 3L</option>
            <option>3-8L</option>
            <option>8-15L</option>
            <option>15L+</option>
          </select>

          <select
            name="city"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 outline-none"
          >
            <option value="">City Tier</option>
            <option>Metro</option>
            <option>Tier-2</option>
            <option>Tier-3</option>
          </select>

          <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition">
            {loading ? "Loading..." : "Get Recommendation"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-10 space-y-8">

            {/* Best Policy */}
            <div className="bg-green-500/10 border border-green-400 rounded-2xl p-6">
              <h2 className="text-3xl font-bold mb-3">
                {result.best_policy.name}
              </h2>

              <p><b>Premium:</b> {result.best_policy.premium}</p>
              <p><b>Cover:</b> {result.best_policy.cover}</p>
              <p><b>Waiting:</b> {result.best_policy.waiting}</p>
              <p><b>Suitability Score:</b> {result.best_policy.score}/100</p>
            </div>

            {/* Comparison */}
            <div className="bg-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                Policy Comparison
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="p-2">Policy</th>
                      <th className="p-2">Premium</th>
                      <th className="p-2">Cover</th>
                      <th className="p-2">Waiting</th>
                      <th className="p-2">Score</th>
                    </tr>
                  </thead>

                  <tbody>
                    {result.comparison.map((policy, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="p-2">{policy.name}</td>
                        <td className="p-2">{policy.premium}</td>
                        <td className="p-2">{policy.cover}</td>
                        <td className="p-2">{policy.waiting}</td>
                        <td className="p-2">{policy.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Coverage */}
            <div className="bg-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                Coverage Details
              </h2>

              <p><b>Inclusions:</b> {result.coverage.inclusions}</p>
              <p><b>Exclusions:</b> {result.coverage.exclusions}</p>
              <p><b>Co-pay:</b> {result.coverage.copay}</p>
              <p><b>Claim Type:</b> {result.coverage.claim}</p>
            </div>

            {/* AI Reason */}
            <div className="bg-blue-500/10 border border-blue-400 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                Why This Policy?
              </h2>

              <p className="text-gray-200 leading-7">
                {result.reason}
              </p>
            </div>

            {/* Chat Box */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-4">
                Ask About This Policy 💬
              </h2>

              <div className="h-72 overflow-y-auto bg-black/20 rounded-xl p-4 mb-4 space-y-3">

                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "ml-auto bg-purple-600 text-white"
                        : "mr-auto bg-blue-600 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}

                {loadingChat && (
                  <div className="mr-auto bg-blue-600 text-white px-4 py-3 rounded-2xl w-fit animate-pulse">
                    AI typing...
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ask your insurance question..."
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
                />

                <button
                  onClick={askChat}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Send
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;