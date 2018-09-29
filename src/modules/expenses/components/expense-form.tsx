import React, { Component } from 'react';
import { Button, Input, Icon } from 'genui';

import {
  ExpenseReport,
  ExpenseLineItem,
  ExpenseLineItemType,
} from '../store/models';
import { BackButton, Form } from '../../common';
import ExpenseFormLineItem from './expense-form-line-item';
import { Box } from '../../ui';
import styled from '../../../styled/styled-components';

type Props = {
  initialValues?: ExpenseReport;
  onSubmit(data: any): any;
};

type State = Readonly<{
  items: ExpenseLineItem[];
  editing: boolean;
}>;

const initialState: State = {
  items: [],
  editing: false,
};

class ExpenseForm extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    if (this.props.initialValues && this.props.initialValues.id) {
      this.setState({ editing: true });

      this.setState({
        items: this.props.initialValues.items,
      });
    }
  }

  handleSubmit = (model: any) => {
    const data = {
      ...model,
      items: this.state.items,
    };

    this.props.onSubmit(data);
  };

  addLineItem = () => {
    this.setState({
      items: [
        ...this.state.items,
        {
          amount: 0,
          expenseDate: '',
          expenseType: ExpenseLineItemType.Meal,
          currency: 'USD',
          files: [],
        },
      ],
    });
  };

  handleItemChange = (e: any, index: number) => {
    const { name, value } = e.target;

    const item = {
      ...this.state.items[index],
      [name]: value,
    };

    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        item,
        ...this.state.items.slice(index + 1),
      ],
    });
  };

  handleItemUpload = (data: any, index: number) => {
    const item = {
      ...this.state.items[index],
      files: this.state.items[index].files.filter(file => file.id).concat(data),
    };

    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        item,
        ...this.state.items.slice(index + 1),
      ],
    });
  };

  handleRemoveLineItem = (index: number) => {
    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        ...this.state.items.slice(index + 1),
      ],
    });
  };

  handleRemoveUploadedFile = (index: number, filename: string) => {
    const item = this.state.items[index];

    const files = item.files.filter((file: any) => {
      if (typeof file !== 'string') {
        return true;
      }
      return file !== filename;
    });

    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        {
          ...item,
          files,
        },
        ...this.state.items.slice(index + 1),
      ],
    });
  };

  render() {
    const { initialValues } = this.props;
    const { items } = this.state;

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="description"
              label="Description"
              defaultValue={initialValues && initialValues.description}
              validations={{ isRequired: true }}
            >
              <Input placeholder="Description" />
            </Form.Field>

            <Box
              title={() => (
                <>
                  <AddLineItemButton>
                    <Icon
                      onClick={this.addLineItem}
                      name="fas fa-plus-square"
                    />
                  </AddLineItemButton>
                  Line Items
                </>
              )}
            >
              <div>
                {items.length === 0 && (
                  <p>
                    Add expenses by clicking on the plus sign in the right
                    corner.
                  </p>
                )}
                {items.map((item, index) => (
                  <ExpenseFormLineItem
                    initialValues={item}
                    onRemoveItem={() => this.handleRemoveLineItem(index)}
                    onRemoveUploadedFile={filename =>
                      this.handleRemoveUploadedFile(index, filename)
                    }
                    onItemChange={e => this.handleItemChange(e, index)}
                    onItemUpload={data => this.handleItemUpload(data, index)}
                    key={index}
                  />
                ))}
              </div>
            </Box>

            <Button type="submit" color="green" disabled={!formState.isValid}>
              {initialValues && initialValues.id ? 'Save' : 'Add'}
            </Button>
            <BackButton>Cancel</BackButton>
          </>
        )}
      </Form>
    );
  }
}

export default ExpenseForm;

const AddLineItemButton = styled.div`
  float: right;

  i {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
