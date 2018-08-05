import React from 'react';
import { Field, Input, Button } from 'genui';
import { QuestionCategory, QuestionArticle } from '../store/models';
import { UserRole } from '../../users/store/models';
import { BackButton } from '../../common';

type Props = {
  onSubmit: (data: State, categoryId: number) => any;
  article?: QuestionArticle;
  categories: QuestionCategory[];
  category?: QuestionCategory;
};

type State = Readonly<{
  id?: number;
  title: string;
  teaser: string;
  body: string;
  access: UserRole[];
  categoryId: number;
}>;

class ArticleForm extends React.Component<Props, State> {
  readonly state: State = {
    title: '',
    teaser: '',
    body: '',
    access: [UserRole.User, UserRole.Manager, UserRole.Admin],
    categoryId: 0,
  };

  componentWillMount() {
    const { article, category } = this.props;

    if (article) {
      this.setInitialValues(article, category);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { article } = nextProps;

    if (article) {
      this.setInitialValues(article, nextProps.category);
    }
  }

  setInitialValues(article: QuestionArticle, category?: QuestionCategory) {
    this.setState({
      id: article.id,
      title: article.title,
      teaser: article.teaser || '',
      body: article.body,
      categoryId: category ? category.id : 0,
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

  handleCategoryChange = (e: any) => {
    const { value }: { value: string } = e.target as any;

    this.setState({
      categoryId: +value,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.state.categoryId === 0) {
      return;
    }

    this.props.onSubmit(this.state, this.state.categoryId);
  };

  render() {
    const { article, categories } = this.props;
    const { title, teaser, body, categoryId } = this.state;

    const editing = Boolean(article);

    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <label>Title *</label>
          <Input
            placeholder="Title of the article"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Teaser *</label>
          <Input
            placeholder="Article teaser"
            name="teaser"
            value={teaser}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Body *</label>
          <Input
            placeholder="Article body"
            name="body"
            value={body}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Category *</label>
          <select
            name="categoryId"
            onChange={this.handleCategoryChange}
            value={categoryId.toString()}
          >
            <option value="0">Select Category</option>
            {categories.map(category => (
              <option key={category.id.toString()} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </Field>

        <Button type="submit" color="green">
          {editing ? 'Save' : 'Add'}
        </Button>

        <BackButton>Cancel</BackButton>
      </form>
    );
  }
}

export default ArticleForm;
