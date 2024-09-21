export interface Account {
  id: number;
  name: string;
  pending_balance: number;
  available_balance: number;
  revenue: number;
  storeId: number;
}

export interface Store {
  id: number;
  merchantId: number;
  name: string;
  storeImg: string | null;
  domainName: string;
  published: boolean;
  billingCurrency: string | null;
  storeCurrency: string | null;
  timeZone: string | null;
  storePhone: string;
  storeEmail: string;
  businessName: string | null;
  countryRegion: string | null;
  address: string | null;
  apartment: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  productsCount: number | null;
  whatDoYouWantToSell: string[];
  howWillYouGetTheGoods: string[];
  createdAt: string;
  updatedAt: string;
  percentage: number;
  account: Account[];
}
