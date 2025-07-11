'use client';

interface OutputBoxProps {
  content: string;
  isLoading: boolean;
  error?: string;
}

export function OutputBox({ content, isLoading, error }: OutputBoxProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0077B6] border-t-transparent"></div>
          <span className="text-gray-600">ChemWise is thinking...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <span className="text-red-700 font-medium">Error</span>
        </div>
        <p className="mt-2 text-red-600">{error}</p>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-5 h-5 bg-[#0077B6] rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
        <span className="text-[#0077B6] font-medium">ChemWise Response</span>
      </div>
      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}