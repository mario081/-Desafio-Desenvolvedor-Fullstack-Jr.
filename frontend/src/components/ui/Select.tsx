import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/90 mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          input-dark
          w-full px-4 py-2.5 rounded-2xl text-white
          bg-[#3b2d5c] border border-white/20
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed transition-all
          [&>option]:bg-[#2d2347] [&>option]:text-white
          ${error ? 'border-red-400 focus:ring-red-400' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  )
);

Select.displayName = 'Select';
