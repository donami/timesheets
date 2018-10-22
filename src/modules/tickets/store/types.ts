export enum TicketStatus {
  Pending = 'Pending',
  Open = 'Open',
  Closed = 'Closed',
}

export enum TicketPriority {
  VeryLow = 'Very Low',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  VeryHigh = 'Very High',
}

type TicketUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: {
    id: string;
    url: string;
  };
};

export type Ticket = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt?: Date;
  owner: TicketUser;
  // project: string;
  type: string;
  status: TicketStatus;
  priority: TicketPriority;
  assigned: TicketUser;
  description: string;
  comments: TicketComment[];
};

export type TicketComment = {
  id: string;
  body: string;
  createdAt: Date;
  owner: TicketUser;
};
