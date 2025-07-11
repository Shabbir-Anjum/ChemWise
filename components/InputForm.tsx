'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface InputFormProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
  placeholder: string;
  label: string;
  multiline?: boolean;
}

export function InputForm({ onSubmit, isLoading, placeholder, label, multiline = false }: InputFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  const InputComponent = multiline ? Textarea : Input;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="input" className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        <InputComponent
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full"
          rows={multiline ? 4 : undefined}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading || !input.trim()}
        className="w-full bg-[#0077B6] hover:bg-[#005E91] text-white"
      >
        {isLoading ? 'Analyzing...' : 'Ask ChemWise'}
      </Button>
    </form>
  );
}