import React from 'react';
import { graphql } from 'react-apollo';
import { compose, withHandlers, renderNothing, branch } from 'recompose';

import { ProjectForm } from '../components';
import { PageHeader } from '../../common';
import { CREATE_PROJECT } from '../store/mutations';
import { LOGGED_IN_USER } from '../../auth/store/queries';

type Props = {
  history: any;
};
type DataProps = {
  createProject(options: any): any;
  loading: boolean;
  user: any;
};
type HandlerProps = { onAdd(data: any): void };
type EnhancedProps = Props & DataProps & HandlerProps;

const ProjectAddPage: React.SFC<EnhancedProps> = ({ onAdd }) => (
  <div>
    <PageHeader>Create new project</PageHeader>

    <ProjectForm onSubmit={onAdd} />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(CREATE_PROJECT, { name: 'createProject' }),
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      loading: data.loading,
      user: data.user,
    }),
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onAdd: props => (data: any) => {
      props
        .createProject({
          variables: {
            name: data.name,
            userId: props.user.id,
            role: props.user.role,
          },
        })
        .then(() => {
          props.history.goBack();
        });
    },
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(ProjectAddPage);
