type AlertProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
};

function Alert({ message, type }: AlertProps) {
  const styles = {
    success:
      "bg-green-900 border-green-600 text-green-200",

    error:
      "bg-red-900 border-red-600 text-red-200",

    warning:
      "bg-yellow-900 border-yellow-600 text-yellow-200",

    info:
      "bg-blue-900 border-blue-600 text-blue-200",
  };

  return (
    <div
      className={`
        rounded-lg
        border
        p-4
        ${styles[type]}
      `}
    >
      {message}
    </div>
  );
}

export default Alert;