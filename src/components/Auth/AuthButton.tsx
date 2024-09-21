import { Loader2 } from "lucide-react";

const AuthButton = ({
  type,
  loading,
  text,
}: {
  type: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  text: string;
}) => {
  return (
    <button
      type={type}
      className={`w-full px-4 py-4 text-white font-medium text-lg  rounded-lg duration-150 bg-orange-500 flex items-center justify-center gap-2 ${
        loading && "cursor-wait"
      }`}
      disabled={loading}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} {text}
    </button>
  );
};

export default AuthButton;
