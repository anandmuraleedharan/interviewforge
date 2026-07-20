"use client";
import React, { useState } from "react";
import { DollarSign, Sparkles, Printer, ShieldCheck, RefreshCw } from "lucide-react";

export default function SalaryNegotiationSandbox() {
  const [offerDetails, setOfferDetails] = useState({ base: "175000", targetRole: "Staff Data Engineer", targetLocation: "Remote (US)" });
  const [counterScript, setCounterScript] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);

    try {
      const prompt = `Role: ${offerDetails.targetRole}
Location: ${offerDetails.targetLocation}
Initial Base Salary Offered: $${offerDetails.base}

Generate counter-offer negotiation scripts & 1-page interview cheat-sheet in JSON format matching schema:
{
  "marketRange": "$190,000 - $220,000",
  "counterTarget": "$205,000",
  "emailScript": "Thank you for extending this offer. Based on my track record reducing BI DAG runtimes by 400% and managing enterprise Snowflake migrations, I am seeking a base salary of $205,000...",
  "verbalTalkingPoints": [
    "Highlight quantifiable ROI (sub-second queries, zero uncaught failures).",
    "Express strong enthusiasm for the team while anchoring on value."
  ],
  "cheatSheet": {
    "pitch30Sec": "Senior Data Engineer with proven experience optimizing Snowflake and Airflow pipelines...",
    "topQuestionsToAsk": [
      "What is the average latency requirement for downstream analytics consumers?",
      "How is dbt project ownership divided across teams?"
    ]
  }
}`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: "Output strictly raw JSON without markdown backticks." })
      });

      const data = await res.json();
      if (data.result) {
        const cleaned = data.result.replace(/```json|```/g, "").trim();
        setCounterScript(JSON.parse(cleaned));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "var(--foreground)" }}>
          💼 Salary Negotiation Sandbox & Cheat-Sheet
        </h1>
        <p style={{ color: "var(--foreground-muted)" }}>
          Generate professional counter-offer scripts and compile a 1-page printable interview cheat-sheet.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--foreground-muted)" }}>Target Role</label>
            <input
              type="text"
              value={offerDetails.targetRole}
              onChange={(e) => setOfferDetails({ ...offerDetails, targetRole: e.target.value })}
              style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--foreground)", padding: "0.5rem 0.75rem", marginTop: "0.25rem" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--foreground-muted)" }}>Initial Base Offer ($)</label>
            <input
              type="text"
              value={offerDetails.base}
              onChange={(e) => setOfferDetails({ ...offerDetails, base: e.target.value })}
              style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--foreground)", padding: "0.5rem 0.75rem", marginTop: "0.25rem" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--foreground-muted)" }}>Location / Work Mode</label>
            <input
              type="text"
              value={offerDetails.targetLocation}
              onChange={(e) => setOfferDetails({ ...offerDetails, targetLocation: e.target.value })}
              style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--foreground)", padding: "0.5rem 0.75rem", marginTop: "0.25rem" }}
            />
          </div>
        </div>

        <button className="btn-primary" onClick={handleSimulate} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
          {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
          <span>{loading ? "Generating Strategy..." : "Generate Negotiation Script & Cheat-Sheet"}</span>
        </button>
      </div>

      {counterScript && (
        <div className="glass-card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: "700" }}>Market Benchmark & Strategy</h2>
              <span style={{ color: "var(--foreground-muted)", fontSize: "0.85rem" }}>Target Counter: {counterScript.counterTarget}</span>
            </div>
            <button className="btn-secondary" onClick={() => window.print()}>
              <Printer size={16} />
              <span>Print Cheat-Sheet</span>
            </button>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>📧 Professional Counter-Offer Email</h3>
            <pre style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", color: "var(--foreground-muted)", whiteSpace: "pre-wrap", fontFamily: "inherit", lineHeight: "1.6" }}>
              {counterScript.emailScript}
            </pre>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>⚡ Verbal Talking Points</h3>
            <ul style={{ paddingLeft: "1.2rem", color: "var(--foreground-muted)", lineHeight: "1.6" }}>
              {counterScript.verbalTalkingPoints?.map((tp, idx) => (
                <li key={idx}>{tp}</li>
              ))}
            </ul>
          </div>

          <div style={{ background: "rgba(56, 189, 248, 0.05)", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "12px", padding: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#38bdf8", marginBottom: "0.75rem" }}>
              📋 1-Page Interview Cheat-Sheet
            </h3>
            <p style={{ color: "var(--foreground-muted)", marginBottom: "0.75rem" }}>
              <strong>30-Second Elevator Pitch:</strong> {counterScript.cheatSheet?.pitch30Sec}
            </p>
            <div>
              <strong>Questions to Ask Interviewer:</strong>
              <ul style={{ paddingLeft: "1.2rem", color: "var(--foreground-muted)", marginTop: "0.25rem" }}>
                {counterScript.cheatSheet?.topQuestionsToAsk?.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
