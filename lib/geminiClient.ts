export async function askGemini(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Using the free Google AI Studio API endpoint
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    console.log(`Making request to: ${endpoint}`);
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };
    
    console.log('Request payload:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      console.error('Error response body:', errorText);
      
      // Handle specific error cases
      if (response.status === 400) {
        throw new Error('Invalid request format or API key');
      } else if (response.status === 403) {
        throw new Error('API key invalid or quota exceeded');
      } else if (response.status === 404) {
        throw new Error('API endpoint not found - check model name');
      }
      
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API response received:', JSON.stringify(data, null, 2));
    
    // Extract the generated text from the response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      console.error('No text found in response:', data);
      throw new Error('No generated text found in API response');
    }
    
    return generatedText;
    
  } catch (error) {
    console.error('Error in askGemini:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to get response from AI assistant');
  }
}