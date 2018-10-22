import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Input, Icon, Select } from 'genui';

import { Uploader } from '../../common';
import styled, { withProps, css } from '../../../styled/styled-components';
import { Column, Row } from '../../ui';
import ExpenseLineItemImage from './expense-line-item-image';
import { ExpenseLineItemType } from '../store/models';
import { DatePicker } from '../../common/components';

type Props = {
  onItemChange(e: any): any;
  onItemUpload(data: File): any;
  onRemoveUploadedFile(filename: string): any;
  onRemoveItem(): any;
  initialValues: {
    amount: any;
    expenseDate: string;
    expenseType: any;
    files: {
      id: string;
      url: string;
      name: string;
    }[];
  };
};

type State = {
  expanded: boolean;
};

type StateHandlers = {
  setExpanded(expanded: boolean): void;
};
type HandlerProps = {
  toggleExpanded(): void;
};

type EnhancedProps = Props & State & StateHandlers & HandlerProps;

const ExpenseFormLineItem: React.SFC<EnhancedProps> = ({
  onItemChange,
  onItemUpload,
  initialValues,
  onRemoveItem,
  onRemoveUploadedFile,
  expanded,
  toggleExpanded,
}) => (
  <Container>
    <Heading expanded={expanded}>
      <div className="expense-form-line-item-options" title="Remove expense">
        <Icon name="fas fa-times" onClick={onRemoveItem} />
      </div>
      <span onClick={toggleExpanded}>
        Line Item
        <Icon name={expanded ? 'fas fa-caret-up' : 'fas fa-caret-down'} />
      </span>
    </Heading>
    <Content expanded={expanded}>
      <Row>
        <Column xs={12} md={6}>
          <InputField>
            <label>Amount</label>
            <Input
              type="number"
              name="amount"
              value={initialValues.amount}
              placeholder="Amount"
              onChange={onItemChange}
            />
          </InputField>
          <InputField>
            <label>Date of expense</label>
            <DatePicker
              initialDate={initialValues.expenseDate}
              onChange={onItemChange}
              name="expenseDate"
            />
          </InputField>
          <InputField>
            <label>Type</label>
            <Select
              name="expenseType"
              options={[
                {
                  label: 'Meals & Entertainment',
                  value: ExpenseLineItemType.Meal,
                },
                { label: 'Lodging', value: ExpenseLineItemType.Lodging },
                {
                  label: 'Transportation',
                  value: ExpenseLineItemType.Transportation,
                },
                {
                  label: 'Other Business Expense',
                  value: ExpenseLineItemType.Other,
                },
              ]}
              value={initialValues.expenseType}
              onChange={(value: string) =>
                onItemChange({ target: { value, name: 'expenseType' } })
              }
              placeholder="Choose expense type"
            />
          </InputField>
        </Column>
        <Column xs={12} md={6}>
          {initialValues &&
            initialValues.files && (
              <PreviousFiles>
                {initialValues.files.map(file => {
                  // if (typeof file !== 'string') {
                  //   return null;
                  // }
                  if (!file.id) {
                    return null;
                  }
                  return (
                    <PreviousFileContainer key={file.id}>
                      <ExpenseLineItemImage image={file} />
                      <span
                        className="fa-stack fa-2x"
                        title="Remove attachment"
                        // onClick={() => onRemoveUploadedFile(file)}
                      >
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fas fa-times fa-stack-1x fa-inverse" />
                      </span>
                    </PreviousFileContainer>
                  );
                })}
              </PreviousFiles>
            )}
          <Uploader
            withIcon={false}
            buttonText="Attach files"
            onChange={onItemUpload}
            singleImage={false}
            withPreview={true}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />
        </Column>
      </Row>
    </Content>
  </Container>
);

const enhance = compose<EnhancedProps, Props>(
  withState<Props, boolean, 'expanded', 'setExpanded'>(
    'expanded',
    'setExpanded',
    true
  ),
  withHandlers<EnhancedProps, HandlerProps>({
    toggleExpanded: ({ setExpanded, expanded }) => () => setExpanded(!expanded),
  })
);

export default enhance(ExpenseFormLineItem);

const Container = styled.div`
  border: #ccc 1px solid;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
`;

const InputField = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9em;
    text-transform: uppercase;
  }
`;

const Heading = withProps<{ expanded: boolean }, HTMLHeadingElement>(styled.h3)`
  text-transform: uppercase;
  font-weight: 300;
  cursor: pointer;
  color: ${props => props.theme.primaryColor};

  ${({ expanded }) =>
    expanded &&
    css`
      border-bottom: #ddd 1px solid;
      padding-bottom: 10px;
      margin-bottom: 10px;
    `}

  span {
    &:hover {
      opacity: 0.7;
    }

    > i {
      margin-left: 10px;
    }
  }

  .expense-form-line-item-options {
    float: right;
    color: ${props => props.theme.red};

    &:hover {
      opacity: 0.7;
    }
  }
`;

const Content = withProps<{ expanded: boolean }, HTMLDivElement>(styled.div)`
  display: ${props => (props.expanded ? 'block' : 'none')};
`;

const PreviousFiles = styled.div`
  margin-top: 20px;
`;

const PreviousFileContainer = styled.div`
  position: relative;
  display: inline-block;

  img {
    max-width: 64px;
    margin-right: 10px;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    color: #dd4e7f;
    font-size: 1em;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`;
