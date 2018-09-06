import React, { Component } from 'react';

import { PageHeader } from '../../common';
import { ExpenseForm } from '../components';
import { ExpenseReport } from '../store/models';

type Props = {
  onAddExpense(data: ExpenseReport): any;
};

class ExpenseAddPage extends Component<Props> {
  handleSubmit = (model: any) => {
    this.props.onAddExpense(model);
  };

  render() {
    return (
      <div>
        <PageHeader>Create Expense Report</PageHeader>
        <ExpenseForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default ExpenseAddPage;
