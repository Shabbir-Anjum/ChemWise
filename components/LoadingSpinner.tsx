interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-3 border-[#0077B6] border-t-transparent"></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}