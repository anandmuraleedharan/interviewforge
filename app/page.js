"use client";
import React from "react";
import { Sparkles, FileText, Mic, Award, DollarSign, ArrowRight } from "lucide-react";

export default function InterviewForgeHub() {
  const tools = [
    {
      title: "ATS Resume Tailor & Matcher",
      desc: "Paste target job description and your resume. Get instant ATS match scores (0-100%), missing keywords, tailored bullet points, and print-ready PDF/JSON exports.",
      icon: <FileText size={28} style={{ color: "#38bdf8" }} />,
      href: "/tailor",
      badge: "Resume Engine"
    },
    {
      title: "AI Audio Mock Interviewer",
      desc: "Practice real-time technical & behavioral interviews with interactive Web Speech recognition (mic input) and voice responses. Get graded per answer.",
      icon: <Mic size={28} style={{ color: "#818cf8" }} />,
      href: "/interview",
      badge: "Realtime Coach"
    },
    {
      title: "STAR Method Story Builder",
      desc: "Format raw work achievements into structured Situation, Task, Action, Result stories tailored for technical behavioral rounds.",
      icon: <Award size={28} style={{ color: "#34d399" }} />,
      href: "/star",
      badge: "Behavioral Prep"
    },
    {
      title: "Salary Negotiation Sandbox",
      desc: "Simulate tough recruiter offer discussions, practice counter-offer dialogue scenarios, and compile a 1-page printable interview cheat-sheet.",
      icon: <DollarSign size={28} style={{ color: "#fbbf24" }} />,
      href: "/negotiate",
      badge: "Offer Strategy"
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span style={{ background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.25)", padding: "0.4rem 1rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: "600" }}>
          🚀 Complete AI Career Preparation Platform
        </span>
        <h1 style={{ fontSize: "3.2rem", fontWeight: "800", marginTop: "1rem", marginBottom: "1rem", background: "linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          InterviewForge
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--foreground-muted)", maxWidth: "680px", margin: "0 auto" }}>
          Empowering tech candidates with real-time AI interview practice, ATS resume optimization, STAR behavioral story formatting, and salary negotiation simulators.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.5rem" }}>
        {tools.map((t, idx) => (
          <a key={idx} href={t.href} style={{ textDecoration: "none" }}>
            <div className="glass-card" style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.75rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                    {t.icon}
                  </div>
                  <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "var(--foreground-muted)", padding: "0.2rem 0.6rem", borderRadius: "6px" }}>
                    {t.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--foreground)", marginBottom: "0.75rem" }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--foreground-muted)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                  {t.desc}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#38bdf8", fontWeight: "600", fontSize: "0.95rem" }}>
                <span>Launch Tool</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
