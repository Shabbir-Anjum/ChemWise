'use client';

import { useState } from 'react';
import { InputForm } from '@/components/InputForm';
import { OutputBox } from '@/components/OutputBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const calculatorTypes = [
  { name: 'Molarity', description: 'Calculate molar concentration' },
  { name: 'Dilution', description: 'Dilution calculations and ratios' },
  { name: 'pH', description: 'pH and acid-base calculations' },
  { name: 'Stoichiometry', description: 'Chemical reaction calculations' },
];

export default function LabCalcPage() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCalc, setSelectedCalc] = useState('');

  const handleSubmit = async (problem: string) => {
    setIsLoading(true);
    setError('');
    setResponse('');

    const prompt = `You are a chemistry tutor. A student needs help with a ${selectedCalc} calculation: "${problem}". 

Please provide:
1. Step-by-step solution with clear explanations
2. The relevant formulas used
3. Practical lab tips for accuracy
4. Common mistakes to avoid
5. A worked example if helpful

Be educational and thorough in your explanation.`;

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
          🧪 Lab Calculator & AI Tutor
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get step-by-step solutions and explanations for chemistry calculations with practical lab tips.
        </p>
      </div>

      {/* Calculator Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {calculatorTypes.map((calc) => (
          <Card 
            key={calc.name}
            className={`cursor-pointer transition-all ${
              selectedCalc === calc.name 
                ? 'ring-2 ring-[#0077B6] bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedCalc(calc.name)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{calc.name}</CardTitle>
              <CardDescription>{calc.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedCalc && (
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-4">
            <span className="inline-block bg-[#0077B6] text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedCalc} Calculator
            </span>
          </div>
          <InputForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder={`Enter your ${selectedCalc.toLowerCase()} problem (e.g., "Calculate the molarity of 5g NaCl in 200mL water")`}
            label={`What ${selectedCalc.toLowerCase()} problem would you like help with?`}
            multiline
          />
        </div>
      )}

      {!selectedCalc && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-purple-900 mb-2">👆 Select a Calculator Type Above</h3>
          <p className="text-purple-700 text-sm">Choose the type of calculation you need help with to get started.</p>
        </div>
      )}

      {selectedCalc && <OutputBox content={response} isLoading={isLoading} error={error} />}

      {selectedCalc && !response && !isLoading && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-purple-900 mb-2">💡 Example Problems:</h3>
          <div className="text-sm text-purple-800 space-y-2">
            {selectedCalc === 'Molarity' && (
              <div>
                <p>• "Calculate the molarity of 10g NaCl in 500mL solution"</p>
                <p>• "How many grams of glucose needed for 0.5M solution in 250mL?"</p>
              </div>
            )}
            {selectedCalc === 'Dilution' && (
              <div>
                <p>• "Dilute 100mL of 6M HCl to 2M concentration"</p>
                <p>• "What volume of water to add to 50mL of 0.5M solution to make 0.1M?"</p>
              </div>
            )}
            {selectedCalc === 'pH' && (
              <div>
                <p>• "Calculate pH of 0.01M HCl solution"</p>
                <p>• "What is the pH of 0.05M NaOH solution?"</p>
              </div>
            )}
            {selectedCalc === 'Stoichiometry' && (
              <div>
                <p>• "How many grams of CO2 produced from 10g CaCO3?"</p>
                <p>• "Calculate limiting reagent in 2Na + Cl2 → 2NaCl"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}