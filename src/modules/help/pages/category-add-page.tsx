import React, { Component } from 'react';
import { CategoryForm } from '../components';
import { QuestionCategory } from '../store/models';
import { PageHeader } from '../../common';
import { compose } from 'recompose';
import { graphql, Mutation } from 'react-apollo';
import { CREATE_CATEGORY } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_CATEGORIES } from '../store/queries';
import { CompanyContext } from '../../common/components/routing';

type Props = {
  createCategory(options: any): void;
  history: any;
};
type EnhancedProps = Props & WithToastrProps;

class CategoryAddPage extends Component<EnhancedProps> {
  handleSubmit = async (
    data: Partial<QuestionCategory>,
    companyId: string,
    mutate: (options: any) => any
  ) => {
    // await this.props.createCategory({
    //   variables: { title: data.title, icon: data.icon },
    // });
    await mutate({
      variables: {
        companyId,
        title: data.title,
        icon: data.icon,
      },
    });
    this.props.addToast('Created', 'Category was created.', 'positive');
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <PageHeader>Create new category</PageHeader>
        <CompanyContext.Consumer>
          {({ company }: any) => (
            <Mutation
              mutation={CREATE_CATEGORY}
              update={(proxy, { data: { createCategory } }) => {
                const { allCategories }: any = proxy.readQuery({
                  query: GET_CATEGORIES,
                  variables: {
                    companyId: company.id,
                  },
                });

                proxy.writeQuery({
                  query: GET_CATEGORIES,
                  variables: {
                    companyId: company.id,
                  },
                  data: {
                    allCategories: allCategories.concat(createCategory),
                  },
                });
              }}
            >
              {mutate => (
                <CategoryForm
                  onSubmit={data => this.handleSubmit(data, company.id, mutate)}
                />
              )}
            </Mutation>
          )}
        </CompanyContext.Consumer>
      </div>
    );
  }
}

const enhance = compose(
  withToastr
  // graphql(CREATE_CATEGORY, {
  //   name: 'createCategory',
  //   options: {
  //     update: (proxy, { data: { createCategory } }: { data: any }) => {
  //       const { allCategories }: any = proxy.readQuery({
  //         query: GET_CATEGORIES,
  //       });

  //       proxy.writeQuery({
  //         query: GET_CATEGORIES,
  //         data: {
  //           allCategories: allCategories.concat(createCategory),
  //         },
  //       });
  //     },
  //   },
  // })
);

export default enhance(CategoryAddPage);
