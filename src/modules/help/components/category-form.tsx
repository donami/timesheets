import React from 'react';
import { Field, Input, Button } from 'genui';
import { QuestionCategory } from '../store/models';
import { BackButton } from '../../common';

type Props = {
  onSubmit: (data: State) => any;
  category?: QuestionCategory;
};

type State = Readonly<{
  id?: number;
  title: string;
  icon: string;
}>;

class CategoryForm extends React.Component<Props, State> {
  readonly state: State = {
    title: '',
    icon: '',
  };

  componentWillMount() {
    const { category } = this.props;

    if (category) {
      this.setInitialValues(category);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { category } = nextProps;

    if (category) {
      this.setInitialValues(category);
    }
  }

  setInitialValues(category: QuestionCategory) {
    this.setState({
      id: category.id,
      title: category.title,
      icon: category.icon,
    });
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    }: { name: keyof State; value: string } = e.target as any;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    const { category } = this.props;
    const { title, icon } = this.state;

    const editing = Boolean(category);

    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <label>Name *</label>
          <Input
            placeholder="Name of the category"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Icon *</label>
          <Input
            placeholder="fas fa-user"
            name="icon"
            value={icon}
            onChange={this.handleChange}
          />
        </Field>

        <Button type="submit" color="green">
          {editing ? 'Save' : 'Add'}
        </Button>

        <BackButton>Cancel</BackButton>
      </form>
    );
  }
}

export default CategoryForm;
