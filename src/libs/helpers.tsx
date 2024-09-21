export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("cartle-admin-token") || "");
  return token;
};

export function convertToNormalTime(isoString: string) {
  const date = new Date(isoString);
  // Extract date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // HH:MM:SS
  const time = `${hours}:${minutes}:${seconds}`;

  // Format date and time as "YYYY-MM-DD"
  return `${day}-${month}-${year}`;
}

// Function to get subscription plan name based on subscriptionPlanId
export const getSubscriptionPlanName = (subscriptionPlanId: number): string => {
  switch (subscriptionPlanId) {
    case 2:
      return "Pro";
    case 3:
      return "Prime";
    default:
      return "Free";
  }
};
