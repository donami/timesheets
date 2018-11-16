import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose, withHandlers, branch, renderNothing } from 'recompose';
import { graphql, Query, Mutation } from 'react-apollo';

import { ProjectForm } from '../components';
import { PageHeader, AppToaster } from '../../common';
import { GET_PROJECT } from '../store/queries';
import { UPDATE_PROJECT } from '../store/mutations';
import ProjectView from '../components/project-view';
import { Intent } from '@blueprintjs/core';

type Props = {
  match: any;
  history: any;
};
type DataProps = {
  updateProject(options: any): any;
};
type HandlerProps = {
  onSave(data: any, updateProject: any): any;
};
type EnhancedProps = Props & DataProps & HandlerProps;

const ProjectViewPage: React.SFC<EnhancedProps> = ({ onSave }) => {
  return (
    <Switch>
      <Route
        path={`/project/:id/edit`}
        render={props => (
          <Query query={GET_PROJECT} variables={{ id: props.match.params.id }}>
            {({ data, loading }) => (
              <div>
                <PageHeader>Edit Project</PageHeader>
                <Mutation mutation={UPDATE_PROJECT}>
                  {(updateProject, { loading: submitting }) => (
                    <ProjectForm
                      onSubmit={model => onSave(model, updateProject)}
                      loading={loading}
                      submitting={submitting}
                      initialValues={data.Project}
                    />
                  )}
                </Mutation>
              </div>
            )}
          </Query>
        )}
      />
      <Route
        path="/project/:id"
        render={props => (
          <Query query={GET_PROJECT} variables={{ id: props.match.params.id }}>
            {({ data, loading }) => (
              <ProjectView project={data.Project} loading={loading} />
            )}
          </Query>
        )}
      />
    </Switch>
  );
};

const enhance = compose(
  withHandlers<EnhancedProps, HandlerProps>({
    onSave: ({ history }) => async (data, updateProject) => {
      await updateProject({ variables: { id: data.id, name: data.name } });

      history.goBack();

      AppToaster.show({
        icon: 'tick',
        message: 'Project was updated.',
        intent: Intent.SUCCESS,
      });
    },
  })
);

export default enhance(ProjectViewPage);
