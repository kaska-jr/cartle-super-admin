import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthInput = ({
  name,
  type,
  placeholder,
  handleFormUpdate,
  value,
  required,
}: {
  name: string;
  type: string;
  placeholder: string;
  handleFormUpdate: any;
  value: string;
  required: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section>
      <label className="font-medium capitalize">{name}</label>
      <div className="relative">
        <input
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={handleFormUpdate}
          className="w-full mt-2 px-3 py-4 h-full text-gray-400  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff className="text-gray-400 mt-2" />
            ) : (
              <FiEye className="text-gray-400 mt-2" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthInput;
