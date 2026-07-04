import React from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

function Button({
  text,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
}: ButtonProps) {

  const baseClasses =
    "w-full rounded-lg py-3 font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-zinc-700 hover:bg-zinc-600 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}

export default Button;