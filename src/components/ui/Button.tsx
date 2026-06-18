type ButtonProps = {
  buttonText: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  buttonText,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-accent text-font-dark px-6 py-2 rounded-lg text-center hover:scale-105 transition-transform duration-200 cursor-pointer ${className}`}
    >
      <p className="text-base font-medium">{buttonText}</p>
    </button>
  );
}