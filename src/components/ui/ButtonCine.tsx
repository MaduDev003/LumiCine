type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

export default function ButtonCine({
  text,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 rounded-lg flex items-center justify-center  ${className}`}
    >
      <span className="text-base font-medium text-white/90 tracking-wider">
        {text}
      </span>
    </button>
  );
}