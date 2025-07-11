export async function askGemini(prompt: string): Promise<string> {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
          parts: [{ text: prompt }] 
        }] 
      })
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response available";
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get response from AI assistant');
  }
}