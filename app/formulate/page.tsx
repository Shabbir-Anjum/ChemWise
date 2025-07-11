'use client';

import { useState } from 'react';
import { InputForm } from '@/components/InputForm';
import { OutputBox } from '@/components/OutputBox';

export default function FormulatePage() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (product: string) => {
    setIsLoading(true);
    setError('');
    setResponse('');

    const prompt = `A student wants to make "${product}" using locally available materials. Provide a safe, simple formula with ingredient proportions (percentages). Explain why each ingredient is needed and its function. Suggest safer or local substitutions if possible. IMPORTANT: Warn about any dangerous chemical combinations (e.g., bleach + acid, ammonia + bleach). Focus on safety and provide practical DIY guidance.`;

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
          🧼 DIY Product Formulator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create safe chemical formulations with local ingredients and learn about safer substitutions for common products.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <InputForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder="Enter product name (e.g., liquid hand soap, all-purpose cleaner, shampoo)"
          label="What product would you like to formulate?"
        />
      </div>

      <OutputBox content={response} isLoading={isLoading} error={error} />

      {!response && !isLoading && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-green-900 mb-2">🔬 Popular DIY Products:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-800">Cleaning Products:</h4>
              <ul className="text-green-700 mt-1 space-y-1">
                <li>• All-purpose cleaner</li>
                <li>• Liquid hand soap</li>
                <li>• Laundry detergent</li>
                <li>• Glass cleaner</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-800">Personal Care:</h4>
              <ul className="text-green-700 mt-1 space-y-1">
                <li>• Shampoo</li>
                <li>• Body wash</li>
                <li>• Toothpaste</li>
                <li>• Hand sanitizer</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}