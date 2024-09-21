export interface Merchant {
  accountName: string;
  accountNumber: string;
  accountVerified: boolean;
  address: string | null;
  bank: string;
  countryRegion: string | null;
  createdAt: string;
  dedicatedAccountId: number;
  email: string;
  emailVerified: boolean;
  facebookURL: string | null;
  firstname: string;
  googleId: string | null;
  id: number;
  instagramURL: string | null;
  lastname: string;
  password: string;
  paystackCustomerId: number;
  phoneNumber: string;
  profilePhoto: string | null | undefined;
  revenue: number;
  role: string;
  secondaryEmail: string | null;
  subscriptionPlan: {
    id: number;
    name: string;
    price: number;
    maxStores: number;
    maxProductsPerStore: number;
  };
  subscriptionPlanId: number;
  tiktokURL: string | null;
  twitterURL: string | null;
  twoFactorEnabled: boolean;
  updatedAt: string;
  username: string | null;
}
