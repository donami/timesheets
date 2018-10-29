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
  createdAt: Date;
  updatedAt: Date;
  image?: {
    id: string;
    url: string;
  };
  invoices: Invoice[];
};
