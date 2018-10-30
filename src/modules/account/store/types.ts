export enum SubscriptionStatus {
  Trial = 'Trial',
  Active = 'Active',
  Inactive = 'Inactive',
}

export type Invoice = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  amount: string;
  file?: string;
  company: Company;
};

export type Company = {
  id: string;
  name: string;
  address: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionEnds: Date;
  createdAt: Date;
  updatedAt: Date;
  image?: { id: string; url: string };
  invoices: Invoice[];
};
