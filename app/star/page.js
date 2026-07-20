"use client";
import React, { useState } from "react";
import { Award, Sparkles, Copy, Check, RefreshCw } from "lucide-react";

export default function STARStoryBuilder() {
  const [rawStory, setRawStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [starResult, setStarResult] = useState(null);

  const handleBuildSTAR = async () => {
    if (!rawStory.trim()) return;
    setLoading(true);

    try {
      const prompt = `Convert raw technical achievement into a STAR story (Situation, Task, Action, Result):
Raw Input: ${rawStory}

Return JSON strictly matching schema:
{
  "title": "Snowflake & dbt Migration Optimization",
  "situation": "Legacy SAP HANA BI framework caused long runtime bottlenecks (12+ hours).",
  "task": "Migrate data pipeline to Snowflake + dbt while ensuring 100% data fidelity.",
  "action": "Overhauled Kimball dimensional models and implemented query pushdown macros.",
  "result": "Reduced DAG runtime by 400% and cut cloud compute costs significantly."
}`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: "Output strictly raw JSON without markdown backticks." })
      });

      const data = await res.json();
      if (data.result) {
        const cleaned = data.result.replace(/```json|```/g, "").trim();
        setStarResult(JSON.parse(cleaned));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "950px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "var(--foreground)" }}>
          ⭐ STAR Method Behavioral Story Builder
        </h1>
        <p style={{ color: "var(--foreground-muted)" }}>
          Transform rough project notes into compelling Situation, Task, Action, Result stories tailored for technical interviewers.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <label style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Raw Accomplishment Notes / Draft</label>
        <textarea
          value={rawStory}
          onChange={(e) => setRawStory(e.target.value)}
          placeholder="e.g., I worked at Coke migrating old SAP HANA to Snowflake using dbt. Queries were slow, so I rewrote them to push down calculations and cut pipeline runtimes by 4x..."
          rows={6}
          style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--foreground)", padding: "0.75rem", fontFamily: "inherit", marginBottom: "1rem" }}
        />
        <button className="btn-primary" onClick={handleBuildSTAR} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
          {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
          <span>{loading ? "Structuring STAR Story..." : "Convert to STAR Format"}</span>
        </button>
      </div>

      {starResult && (
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#38bdf8", marginBottom: "1.5rem" }}>
            🏆 STAR Story: {starResult.title}
          </h2>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #38bdf8" }}>
              <strong style={{ color: "#38bdf8", display: "block", marginBottom: "0.25rem" }}>S — Situation</strong>
              <p style={{ color: "var(--foreground-muted)", margin: 0 }}>{starResult.situation}</p>
            </div>
            <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #818cf8" }}>
              <strong style={{ color: "#818cf8", display: "block", marginBottom: "0.25rem" }}>T — Task</strong>
              <p style={{ color: "var(--foreground-muted)", margin: 0 }}>{starResult.task}</p>
            </div>
            <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #34d399" }}>
              <strong style={{ color: "#34d399", display: "block", marginBottom: "0.25rem" }}>A — Action</strong>
              <p style={{ color: "var(--foreground-muted)", margin: 0 }}>{starResult.action}</p>
            </div>
            <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #fbbf24" }}>
              <strong style={{ color: "#fbbf24", display: "block", marginBottom: "0.25rem" }}>R — Result</strong>
              <p style={{ color: "var(--foreground-muted)", margin: 0 }}>{starResult.result}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
