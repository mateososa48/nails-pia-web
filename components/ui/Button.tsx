import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "pink" | "lavender" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants = {
  pink: "bg-pink text-white hover:bg-pink/80",
  lavender: "bg-lavender text-white hover:bg-lavender/80",
  outline: "border-2 border-pink text-pink hover:bg-pink hover:text-white",
};

export default function Button({
  children,
  href,
  variant = "pink",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base = `inline-block px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
}
