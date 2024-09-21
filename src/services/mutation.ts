import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAdmin, sendNotification } from "./api";
import { FormData } from "../types/authentication";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Newsletter } from "../types/newsletter";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  return useMutation({
    mutationFn: (data: FormData) => loginAdmin(data),
    onSuccess(data) {
      const role = data?.data?.merchant?.role;
      if (role === "admin") {
        toast.success("welcome back admin");
        login(data?.data);
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 2000);
      } else {
        toast.warning("please login as an admin");
      }
    },
    onError(error) {
      console.log(error);
      toast.error("Error during Login");
    },
  });
};

export const useNotificationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Newsletter) => sendNotification(data),
    onSuccess() {
      toast.success("Message sent to all Users");
      queryClient.invalidateQueries({
        queryKey: ["notifications-list"],
      });
    },
    onError(error) {
      console.log(error);
      toast.error("Error during Login");
    },
  });
};
