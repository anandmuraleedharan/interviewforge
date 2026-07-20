import "./globals.css";

export const metadata = {
  title: "InterviewForge - AI Interview Coach & Resume Prep Suite",
  description: "Stateless AI platform for real-time mock interviews, ATS resume tailoring, STAR story formatting, and salary negotiation prep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <header style={{
            borderBottom: "1px solid var(--border-color)",
            background: "rgba(9, 13, 22, 0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            padding: "1rem 2rem"
          }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "800", background: "linear-gradient(135deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  InterviewForge
                </span>
                <span style={{ fontSize: "0.75rem", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "0.15rem 0.5rem", borderRadius: "999px", fontWeight: "600" }}>
                  AI Suite
                </span>
              </a>

              <nav style={{ display: "flex", gap: "1.5rem", fontSize: "0.9rem", fontWeight: "500" }}>
                <a href="/tailor" style={{ color: "var(--foreground-muted)", textDecoration: "none" }}>ATS Tailor</a>
                <a href="/interview" style={{ color: "var(--foreground-muted)", textDecoration: "none" }}>AI Coach</a>
                <a href="/star" style={{ color: "var(--foreground-muted)", textDecoration: "none" }}>STAR Builder</a>
                <a href="/negotiate" style={{ color: "var(--foreground-muted)", textDecoration: "none" }}>Negotiate</a>
              </nav>
            </div>
          </header>

          <main style={{ flexGrow: 1 }}>
            {children}
          </main>

          <footer style={{
            borderTop: "1px solid var(--border-color)",
            padding: "2rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "var(--foreground-muted)"
          }}>
            InterviewForge — Built by Anand Muraleedharan • Powered by Gemini 2.5 & OpenRouter
          </footer>
        </div>
      </body>
    </html>
  );
}
