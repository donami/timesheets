// Expense report:
// - Description
// - Line items
// - Date submitted
// - Date approved

// Line Items:
// - Expense Type (e.g Meals)
// - Expense Date (when purchase was made)
// - Amount (cash)
// - Currency (e.g USD/SEK)
// - Attachment (e.g photo of receipt)

export enum ExpenseLineItemType {
  Meal = 'MEAL',
  Lodging = 'LODGING',
  Transportation = 'TRANSPORTATION',
  Other = 'OTHER',
}

export enum ExpenseReportStatus {
  Submitted = 'Submitted',
  Approved = 'Approved',
}

export interface ExpenseReport {
  id: number;
  description: string;
  items: ExpenseLineItem[];
  dateSubmitted: string;
  dateApproved?: string;
  status: ExpenseReportStatus;
}

export interface ExpenseLineItem {
  expenseType: ExpenseLineItemType;
  expenseDate: string;
  amount: number;
  currency: string;
  attachment?: string;
  files: any[];
}
