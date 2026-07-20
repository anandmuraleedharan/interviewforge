"use client";
import React, { useState } from "react";
import { Sparkles, FileText, CheckCircle, AlertCircle, Download, Copy, RefreshCw } from "lucide-react";

export default function ATSResumeTailor() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleTailor = async () => {
    if (!jobDescription || !resumeText) return;
    setLoading(true);

    try {
      const prompt = `Analyze this Job Description and Candidate Resume. Return JSON matching exact schema:
{
  "atsMatchScore": 85,
  "missingKeywords": ["dbt", "Snowflake Performance Tuning", "CDC Pipeline"],
  "summary": "Tailored executive summary matching JD keywords...",
  "tailoredBullets": [
    "Overhauled legacy BI infrastructure to Snowflake and dbt, reducing query costs by 45%.",
    "Architected real-time streaming data ingestion pipelines handling 50M records daily."
  ]
}

Job Description:
${jobDescription}

Resume:
${resumeText}`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: "Output strictly raw JSON without markdown backticks." })
      });

      const data = await res.json();
      if (data.result) {
        const cleaned = data.result.replace(/```json|```/g, "").trim();
        setAnalysis(JSON.parse(cleaned));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "var(--foreground)" }}>
          📄 ATS Resume Matcher & Tailor
        </h1>
        <p style={{ color: "var(--foreground-muted)" }}>
          Paste target job requirements and your base resume to generate ATS-optimized bullet points and match score.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Target Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste Target Job Description (JD)..."
            rows={10}
            style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--foreground)", padding: "0.75rem", fontFamily: "inherit" }}
          />
        </div>

        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Your Base Resume</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your current resume content..."
            rows={10}
            style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--foreground)", padding: "0.75rem", fontFamily: "inherit" }}
          />
        </div>
      </div>

      <button className="btn-primary" onClick={handleTailor} disabled={loading} style={{ width: "100%", justifyContent: "center", marginBottom: "2.5rem" }}>
        {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
        <span>{loading ? "Analyzing ATS Match & Generating Bullet Points..." : "Run ATS Matcher & Tailor Resume"}</span>
      </button>

      {analysis && (
        <div className="glass-card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>ATS Analysis & Optimization</h2>
              <span style={{ color: "var(--foreground-muted)", fontSize: "0.9rem" }}>Match Score Computed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "rgba(56, 189, 248, 0.15)", border: "1px solid #38bdf8", color: "#38bdf8", borderRadius: "12px", padding: "0.5rem 1.25rem", textAlign: "center" }}>
                <span style={{ fontSize: "1.6rem", fontWeight: "800" }}>{analysis.atsMatchScore}%</span>
                <span style={{ display: "block", fontSize: "0.7rem", textTransform: "uppercase" }}>ATS Score</span>
              </div>
              <button className="btn-secondary" onClick={handlePrintPDF}>
                <Download size={16} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>⚠️ Missing Keywords to Include:</h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {analysis.missingKeywords?.map((kw, idx) => (
                <span key={idx} style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#f87171", padding: "0.25rem 0.75rem", borderRadius: "6px", fontSize: "0.85rem" }}>
                  + {kw}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>📝 Tailored Executive Summary</h3>
            <p style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", color: "var(--foreground-muted)", lineHeight: "1.6" }}>
              {analysis.summary}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>🎯 High-Impact Accomplishment Bullets</h3>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.8", color: "var(--foreground-muted)" }}>
              {analysis.tailoredBullets?.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
