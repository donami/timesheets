import React from 'react';
import { Input, Button } from 'genui';
import { QuestionCategory } from '../store/models';
import { BackButton, Form } from '../../common';

type FormData = {
  id?: number;
  title: string;
  icon: string;
};

type Props = {
  onSubmit: (data: FormData) => any;
  category?: QuestionCategory;
};

type State = Readonly<{
  category?: QuestionCategory;
}>;

class CategoryForm extends React.Component<Props, State> {
  readonly state: State = {
    category: undefined,
  };

  componentWillMount() {
    this.setState({ category: this.props.category });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ category: nextProps.category });
  }

  handleSubmit = (model: any) => {
    const data = {
      ...model,
    };

    if (this.props.category && this.props.category.id) {
      data.id = this.props.category.id;
    }

    this.props.onSubmit(data);
  };

  render() {
    const { category } = this.state;

    const editing = Boolean(category);

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="title"
              label="Name"
              defaultValue={(category && category.title) || ''}
              validations={{ isRequired: true }}
            >
              <Input placeholder="Name of the category" />
            </Form.Field>

            <Form.Field
              name="icon"
              label="Icon"
              defaultValue={(category && category.icon) || ''}
              validations={{ isRequired: true }}
            >
              <Input placeholder="fas fa-user" />
            </Form.Field>

            <Button type="submit" color="green" disabled={!formState.isValid}>
              {editing ? 'Save' : 'Add'}
            </Button>

            <BackButton>Cancel</BackButton>
          </>
        )}
      </Form>
    );
  }
}

export default CategoryForm;
