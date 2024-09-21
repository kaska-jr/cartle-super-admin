import { useQuery } from "@tanstack/react-query";
import { getMerchants, getNotification, getStores } from "./api";

export const useGetAllMerchants = () => {
  return useQuery({
    queryKey: ["merchants-list"],
    queryFn: () => getMerchants(),
  });
};

export const useGetAllStores = () => {
  return useQuery({
    queryKey: ["stores-list"],
    queryFn: () => getStores(),
  });
};

export const useGetAllNotifications = () => {
  return useQuery({
    queryKey: ["notifications-list"],
    queryFn: () => getNotification(),
  });
};
