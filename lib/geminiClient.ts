export async function askGemini(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('Making request to Gemini API...');
    
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
          parts: [{ text: prompt }] 
        }] 
      })
    });
    
    if (!res.ok) {
      console.error(`Gemini API error: ${res.status} - ${res.statusText}`);
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Gemini API response received');
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response available";
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get response from AI assistant');
  }
}