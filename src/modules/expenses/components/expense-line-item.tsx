import React from 'react';
import { List } from 'genui';

import { ExpenseLineItem } from '../store/models';
import styled from '../../../styled/styled-components';
import { parseDate } from '../../../utils/helpers';
import ExpenseLineItemImage from './expense-line-item-image';

type Props = {
  item: ExpenseLineItem;
  index: number;
};

const ExpenseLineItem: React.SFC<Props> = ({ item, index }) => {
  return (
    <Container className="expense-line-item">
      <h3>Line Item: #{index + 1}</h3>
      <List>
        <List.Item>
          <strong>Amount:</strong> {`${item.amount} ${item.currency}`}
        </List.Item>
        <List.Item>
          <strong>Expense type:</strong> {item.expenseType}
        </List.Item>
        <List.Item>
          <strong>Expense date:</strong> {parseDate(item.expenseDate)}
        </List.Item>
      </List>
      {item.files.length > 0 && (
        <Images className="expense-line-item-images">
          <h4>Attachments ({item.files.length})</h4>
          <div>
            {item.files.map(file => (
              <ExpenseLineItemImage key={file.id} image={file} />
            ))}
          </div>
        </Images>
      )}
    </Container>
  );
};

export default ExpenseLineItem;

const Container = styled.div`
  margin: 10px 0;

  &:first-of-type {
    margin-top: 0;
  }

  h3 {
    margin: 10px 0;
    text-transform: uppercase;
    font-weight: 300;
    border-bottom: #ccc 1px solid;
    padding-bottom: 10px;
  }
`;

const Images = styled.div`
  margin: 10px 0;

  h4 {
    margin-bottom: 10px;
  }

  img {
    max-width: 64px;
    margin-right: 15px;
  }
`;
