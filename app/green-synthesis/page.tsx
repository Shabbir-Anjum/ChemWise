'use client';

import { useState } from 'react';
import { InputForm } from '@/components/InputForm';
import { OutputBox } from '@/components/OutputBox';

export default function GreenSynthesisPage() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (compound: string) => {
    setIsLoading(true);
    setError('');
    setResponse('');

    const prompt = `A researcher wants to synthesize "${compound}" using green chemistry principles. Suggest environmentally safer synthesis routes with green solvents and reagents. Explain the advantages of each green pathway in terms of:
1. Environmental impact
2. Safety considerations
3. Yield expectations
4. Cost factors
5. Availability of materials

Compare traditional vs green methods and provide practical guidance for implementing green chemistry approaches.`;

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🌱 Green Chemistry Synthesis Advisor
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover environmentally friendly synthesis routes with safer solvents, reagents, and sustainable practices.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <InputForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder="Enter target compound or synthesis goal (e.g., aspirin, ibuprofen, ethyl acetate)"
          label="What compound would you like to synthesize?"
          multiline
        />
      </div>

      <OutputBox content={response} isLoading={isLoading} error={error} />

      {!response && !isLoading && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-emerald-900 mb-2">🌿 Green Chemistry Principles:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-emerald-800">Key Focuses:</h4>
              <ul className="text-emerald-700 mt-1 space-y-1">
                <li>• Waste prevention</li>
                <li>• Atom economy</li>
                <li>• Safer solvents</li>
                <li>• Energy efficiency</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-emerald-800">Benefits:</h4>
              <ul className="text-emerald-700 mt-1 space-y-1">
                <li>• Reduced toxicity</li>
                <li>• Lower environmental impact</li>
                <li>• Cost effectiveness</li>
                <li>• Sustainable practices</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}