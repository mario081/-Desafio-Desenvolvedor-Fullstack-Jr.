interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-400 focus:ring-primary-400 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/30',
  secondary:
    'bg-surface border border-white/20 text-white hover:bg-white/10 focus:ring-white/30',
  danger:
    'bg-red-500/90 text-white hover:bg-red-500 focus:ring-red-400',
  ghost:
    'text-white/90 hover:bg-white/10 focus:ring-white/20',
};

export function Button({
  variant = 'primary',
  isLoading,
  fullWidth,
  className = '',
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-2xl
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
