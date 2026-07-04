type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-700
        bg-zinc-900
        p-6
        shadow-lg
      "
    >
      {children}
    </div>
  );
}

export default Card;