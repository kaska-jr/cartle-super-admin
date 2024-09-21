import { useState, ChangeEvent } from "react";
import { AuthInput, AuthRecover, AuthButton } from "../../components";
import { FormData } from "../../types/authentication";
import { useLoginMutation } from "../../services/mutation";

export default function Login() {
  const { mutate, isPending } = useLoginMutation();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // Handle form change
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <>
      <main className="w-full flex">
        {/* Left side */}
        <div className="bg-image relative flex-1 hidden items-center justify-center h-screen lg:flex"></div>

        {/* Right side */}
        <div className="flex-1 flex items-center bg-gray-50 justify-center h-screen sm-mt-0">
          <div className="w-full max-w-md space-y-8 px-4  text-gray-600 sm:px-0">
            <form onSubmit={handleAdminLogin} className="space-y-5">
              <AuthInput
                name="email"
                type="email"
                handleFormUpdate={handleFormChange}
                placeholder="Enter your email address"
                value={formData.email}
                required={true}
              />
              <AuthInput
                name="password"
                type="password"
                handleFormUpdate={handleFormChange}
                placeholder="Enter your password"
                value={formData.password}
                required={true}
              />
              <AuthRecover />

              <AuthButton type="submit" text="Login" loading={isPending} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
