import React from 'react';
import { Input, Button, Select } from 'genui';

import { QuestionCategory, QuestionArticle } from '../store/models';
import { UserRole } from '../../users/store/models';
import { BackButton, Form } from '../../common';
import styled, { withProps } from '../../../styled/styled-components';

type Props = {
  onSubmit: (data: State, categoryId: number) => any;
  createArticle?(options: any): any;
  article?: QuestionArticle;
  categories: QuestionCategory[];
  category?: QuestionCategory;
  updateArticle?: any;
  user?: any;
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

  handleSubmit = async (model: any) => {
    const data = {
      ...model,
      categoryId: model.categoryId,
    };

    if (
      this.props.article &&
      this.props.article.id &&
      this.props.updateArticle
    ) {
      data.id = this.props.article.id;

      await this.props.updateArticle({
        variables: {
          id: data.id,
          title: data.title,
          body: data.body,
          teaser: data.teaser,
          categoryId: data.categoryId,
        },
      });

      return this.props.onSubmit(data, data.categoryId);
    }

    if (this.props.createArticle) {
      await this.props.createArticle({
        variables: {
          ...data,
          authorId: this.props.user.id,
        },
      });

      this.props.onSubmit(data, data.categoryId);
    }
  };

  render() {
    const { article, categories } = this.props;
    const { title, teaser, body, categoryId } = this.state;

    const editing = Boolean(article);

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="title"
              label="Title"
              defaultValue={title}
              validations={{ isRequired: true }}
            >
              <Input placeholder="Title of the article" />
            </Form.Field>

            <Form.Field
              name="teaser"
              label="Teaser"
              defaultValue={teaser}
              validations={{ isRequired: true }}
            >
              <Input placeholder="Article teaser" />
            </Form.Field>

            <Form.Field
              name="body"
              label="Body"
              defaultValue={body}
              validations={{ isRequired: true }}
            >
              <MultiLineInput multiline placeholder="Article body" />
            </Form.Field>

            <Form.Field
              name="categoryId"
              label="Category"
              defaultValue={categoryId.toString()}
              validations={{ isRequired: true }}
            >
              <Select
                options={categories.map(category => ({
                  value: category.id,
                  label: category.title,
                }))}
                placeholder="Select Category"
              />
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

export default ArticleForm;

const MultiLineInput = withProps<any>(styled(Input))`
  width: 100%;
  min-height: 300px;
`;
