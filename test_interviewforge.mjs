import assert from "assert";

// Simple test suite for InterviewForge JSON Parsing & AI helper structures
function testATSResultParsing() {
  const mockAIResponse = `\`\`\`json
{
  "atsMatchScore": 92,
  "missingKeywords": ["dbt", "Snowflake"],
  "summary": "Experienced Data Engineer...",
  "tailoredBullets": ["Built pipeline saving 40% compute."]
}
\`\`\``;

  const cleaned = mockAIResponse.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  assert.strictEqual(parsed.atsMatchScore, 92);
  assert.strictEqual(parsed.missingKeywords.length, 2);
  assert.strictEqual(parsed.tailoredBullets.length, 1);
  console.log("✓ ATS Result Parsing Test Passed");
}

function testSTARStoryParsing() {
  const mockSTARResponse = `\`\`\`json
{
  "title": "Snowflake Migration",
  "situation": "Legacy BI slow",
  "task": "Migrate to Snowflake",
  "action": "Pushdown queries",
  "result": "400% speedup"
}
\`\`\``;

  const cleaned = mockSTARResponse.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  assert.strictEqual(parsed.title, "Snowflake Migration");
  assert.strictEqual(parsed.result, "400% speedup");
  console.log("✓ STAR Story Parsing Test Passed");
}

function testNegotiationScriptParsing() {
  const mockNegotiation = `\`\`\`json
{
  "marketRange": "$190,000 - $220,000",
  "counterTarget": "$205,000",
  "emailScript": "Thank you for the offer...",
  "verbalTalkingPoints": ["ROI impact"],
  "cheatSheet": { "pitch30Sec": "Senior Data Engineer...", "topQuestionsToAsk": ["Q1"] }
}
\`\`\``;

  const cleaned = mockNegotiation.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  assert.strictEqual(parsed.counterTarget, "$205,000");
  assert.strictEqual(parsed.cheatSheet.topQuestionsToAsk.length, 1);
  console.log("✓ Negotiation Script Parsing Test Passed");
}

console.log("Running InterviewForge Automated Test Suite...");
testATSResultParsing();
testSTARStoryParsing();
testNegotiationScriptParsing();
console.log("All InterviewForge Automated Tests Passed Successfully! ✨");
