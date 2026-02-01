import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/90 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          input-dark
          w-full px-4 py-2.5 rounded-2xl border
          text-white placeholder-white/50
          bg-[#3b2d5c] border-white/20
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed transition-all
          ${error ? 'border-red-400 focus:ring-red-400' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';
