import React from 'react';
import { graphql, Mutation, Query } from 'react-apollo';
import { compose, withHandlers, renderNothing, branch } from 'recompose';

import { ProjectForm } from '../components';
import { PageHeader } from '../../common';
import { CREATE_PROJECT } from '../store/mutations';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { PageLoader } from '../../ui';

type Props = {
  history: any;
};
type DataProps = {
  createProject(options: any): any;
};
type HandlerProps = { onAdd(data: any, createProject: any, user: any): void };
type EnhancedProps = Props & DataProps & HandlerProps;

const ProjectAddPage: React.SFC<EnhancedProps> = ({ onAdd }) => (
  <Query query={LOGGED_IN_USER}>
    {({ data: { user }, loading }) => {
      if (loading) {
        return <PageLoader />;
      }
      return (
        <div>
          <PageHeader>Create new project</PageHeader>
          <Mutation mutation={CREATE_PROJECT}>
            {(createProject, { loading }) => (
              <ProjectForm
                submitting={loading}
                onSubmit={data => onAdd(data, createProject, user)}
              />
            )}
          </Mutation>
        </div>
      );
    }}
  </Query>
);

const enhance = compose<EnhancedProps, Props>(
  withHandlers<EnhancedProps, HandlerProps>({
    onAdd: props => (data, createProject, user) => {
      createProject({
        variables: {
          name: data.name,
          userId: user.id,
          role: user.role,
          companyId: user.company.id,
        },
      }).then(() => {
        props.history.goBack();
      });
    },
  })
);

export default enhance(ProjectAddPage);
