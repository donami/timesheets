export type Log = {
  id: number;
  createdAt: string;
  updatedAt: string;
  message: string;
  reference: {
    kind: string;
    item: {
      id: number;
    };
  };
};
