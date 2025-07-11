'use client';

import { useState } from 'react';
import { InputForm } from '@/components/InputForm';
import { OutputBox } from '@/components/OutputBox';

export default function MicrobePage() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (microbe: string) => {
    setIsLoading(true);
    setError('');
    setResponse('');

    const prompt = `You're a chemical safety expert. A user wants to know how to kill "${microbe}". Suggest effective chemicals, explain how each one works, what concentration is safe to use, and mention if any resistance is common. Focus on safety and provide practical guidance for laboratory or household use.`;

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
          🦠 Microbe-Killer Advisor
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get expert guidance on effective antimicrobial chemicals, safe concentrations, and resistance prevention strategies.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <InputForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder="Enter microbe name (e.g., E. coli, Staphylococcus aureus, Candida albicans)"
          label="Which microbe do you want to eliminate?"
        />
      </div>

      <OutputBox content={response} isLoading={isLoading} error={error} />

      {!response && !isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for Best Results:</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Use specific microbe names (e.g., "E. coli" instead of "bacteria")</li>
            <li>• Include context if relevant (e.g., "E. coli in water" vs "E. coli on surfaces")</li>
            <li>• Always follow safety guidelines and local regulations</li>
          </ul>
        </div>
      )}
    </div>
  );
}