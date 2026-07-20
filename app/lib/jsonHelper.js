/**
 * Safely extracts and parses JSON payloads from LLM text responses, handling markdown code fences.
 */
export function extractAndParseJSON(text) {
  if (!text) return null;
  
  try {
    // 1. Try direct parse
    return JSON.parse(text);
  } catch (e) {
    // 2. Remove markdown code fences ```json ... ```
    let cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      // 3. Regex extract first object or array
      const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error(`Failed to parse JSON response: ${text.substring(0, 100)}...`);
    }
  }
}
