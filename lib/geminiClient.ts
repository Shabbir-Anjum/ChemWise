export async function askGemini(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    console.log(`Making request to: ${endpoint}`);
    console.log('Request payload:', { 
      contents: [{ 
        parts: [{ text: prompt }] 
      }] 
    });
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        contents: [{ 
          parts: [{ text: prompt }] 
        }] 
      })
    });
    
    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API response received:', data);
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response available";
  } catch (error) {
    console.error('Error making API call:', error);
    throw new Error('Failed to get response from AI assistant');
  }
}