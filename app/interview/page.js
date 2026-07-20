"use client";
import React, { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Sparkles, Send, Award, RefreshCw } from "lucide-react";

export default function AIMockInterviewer() {
  const [role, setRole] = useState("Data Engineer / Architect");
  const [history, setHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("Welcome! I am your AI Interview Coach. Tell me about your background and a high-throughput pipeline you recently designed.");
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Web Speech Synthesis (TTS)
  const speakText = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Web Speech Recognition (STT Mic Input)
  const toggleListening = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          setUserAnswer(prev => prev ? prev + " " + transcript : transcript);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        setIsListening(false);
      }
    } else {
      alert("Web Speech recognition is not supported in this browser mode.");
    }
  };

  const handleSendAnswer = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);

    try {
      const prompt = `Role: ${role}
Current Question: ${currentQuestion}
Candidate Answer: ${userAnswer}

Provide feedback and the next question in JSON format matching schema:
{
  "score": 9,
  "starRating": "Strong STAR execution with clear metric quantifiable outcome.",
  "strengths": ["Quantified 400% DAG runtime improvement", "Clear DB pushdown architecture"],
  "improvementArea": "Consider mentioning data quality testing framework in dbt.",
  "nextQuestion": "How do you handle schema evolution or breaking change migrations in your dbt pipelines?"
}`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: "Output strictly raw JSON without markdown backticks." })
      });

      const data = await res.json();
      if (data.result) {
        const cleaned = data.result.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        setFeedback(parsed);
        setHistory(prev => [...prev, { q: currentQuestion, a: userAnswer, score: parsed.score }]);
        setCurrentQuestion(parsed.nextQuestion);
        setUserAnswer("");
        speakText(parsed.nextQuestion);
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
          🎤 Real-Time AI Audio Mock Interviewer
        </h1>
        <p style={{ color: "var(--foreground-muted)" }}>
          Interactive voice and text interview practice with instant answer scoring across technical accuracy & STAR story formatting.
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <label style={{ fontWeight: "600", fontSize: "0.95rem" }}>Interview Role Persona:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid var(--border-color)", color: "var(--foreground)", padding: "0.5rem 1rem", borderRadius: "8px" }}
        >
          <option value="Data Engineer / Architect">Data Engineer / Architect</option>
          <option value="Software Engineer / Full Stack Lead">Software Engineer / Full Stack Lead</option>
          <option value="Cloud Solutions Architect">Cloud Solutions Architect</option>
        </select>
      </div>

      {/* Question Card */}
      <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem", borderColor: "rgba(56, 189, 248, 0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.8rem", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", padding: "0.2rem 0.6rem", borderRadius: "6px", fontWeight: "600" }}>
            AI Interviewer Question
          </span>
          <button className="btn-secondary" style={{ padding: "0.3rem 0.75rem", fontSize: "0.85rem" }} onClick={() => speakText(currentQuestion)}>
            <Volume2 size={16} />
            <span>Listen Voice</span>
          </button>
        </div>
        <p style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--foreground)", lineHeight: "1.5" }}>
          {currentQuestion}
        </p>
      </div>

      {/* Answer Input */}
      <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <label style={{ fontWeight: "600" }}>Your Answer (Type or Speak into Microphone)</label>
          <button
            onClick={toggleListening}
            style={{
              background: isListening ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${isListening ? "#ef4444" : "var(--border-color)"}`,
              color: isListening ? "#ef4444" : "var(--foreground-muted)",
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem"
            }}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            <span>{isListening ? "Listening (Click to Stop)..." : "Speak Answer"}</span>
          </button>
        </div>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type or speak your answer here..."
          rows={5}
          style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--foreground)", padding: "0.75rem", fontFamily: "inherit", marginBottom: "1rem" }}
        />
        <button className="btn-primary" onClick={handleSendAnswer} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
          {loading ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
          <span>{loading ? "AI Evaluation in Progress..." : "Submit Answer for Instant AI Scoring"}</span>
        </button>
      </div>

      {/* Feedback Drawer */}
      {feedback && (
        <div className="glass-card" style={{ padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Answer Feedback & Score</h3>
            <span style={{ fontSize: "1.4rem", fontWeight: "800", color: "#38bdf8" }}>{feedback.score} / 10</span>
          </div>
          <p style={{ color: "var(--foreground-muted)", marginBottom: "1rem" }}>{feedback.starRating}</p>
          <div style={{ marginBottom: "0.75rem" }}>
            <strong style={{ color: "#34d399" }}>Key Strengths:</strong>
            <ul style={{ paddingLeft: "1.2rem", color: "var(--foreground-muted)" }}>
              {feedback.strengths?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <strong style={{ color: "#fbbf24" }}>Improvement Suggestion:</strong>
            <p style={{ color: "var(--foreground-muted)", marginTop: "0.25rem" }}>{feedback.improvementArea}</p>
          </div>
        </div>
      )}
    </div>
  );
}
