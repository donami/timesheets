export type Log = {
  // createdBy: User;
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
