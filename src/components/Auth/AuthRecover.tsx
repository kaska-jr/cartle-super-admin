import { Link } from "react-router-dom";

const AuthRecover = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="rememberMe"
          className="ml-2 block text-sm font-medium leading-5 text-gray-900"
        >
          Remember me
        </label>
      </div>
      <div className="text-sm">
        <Link
          to="/auth/forgot-password"
          className="font-semibold text-primary hover:text-indigo-500"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default AuthRecover;
