import * as React from 'react';
import { List, Label } from 'genui';

import { Box } from '../../ui';
import { ExpenseReport } from '../store/models';
import styled from '../../../styled/styled-components';
import ExpenseLineItem from './expense-line-item';
import { parseDate } from '../../../utils/helpers';

export type Props = {
  expenseReport: ExpenseReport;
};

const ExpenseReportInfo: React.SFC<Props> = ({ expenseReport }) =>
  expenseReport ? (
    <>
      <Box title="Expense report">
        <List>
          <List.Item>
            <strong>ID:</strong> {expenseReport.id}
          </List.Item>
          <List.Item>
            <strong>Date submitted:</strong>{' '}
            {parseDate(expenseReport.dateSubmitted)}
          </List.Item>
          <List.Item>
            <strong>Status:</strong> <Label>{expenseReport.status}</Label>
          </List.Item>
          <List.Item>
            <strong>Description:</strong> {expenseReport.description}
          </List.Item>
        </List>
      </Box>
      <Box title="Line Items">
        <LineItems>
          {!expenseReport.items.length && <p>No items</p>}
          {expenseReport.items.map((item, index) => (
            <ExpenseLineItem item={item} index={index} key={index} />
          ))}
        </LineItems>
      </Box>
    </>
  ) : null;

export default ExpenseReportInfo;

const LineItems = styled.div``;
