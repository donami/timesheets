import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose, withHandlers, branch, renderNothing } from 'recompose';
import { graphql, Query } from 'react-apollo';

import { ProjectForm } from '../components';
import { PageHeader } from '../../common';
import { GET_PROJECT } from '../store/queries';
import { UPDATE_PROJECT } from '../store/mutations';
import ProjectView from '../components/project-view';

type Props = {
  match: any;
  history: any;
};
type DataProps = {
  updateProject(options: any): any;
};
type HandlerProps = {
  onSave(data: any): any;
};
type EnhancedProps = Props & DataProps & HandlerProps;

const ProjectViewPage: React.SFC<EnhancedProps> = ({ onSave }) => {
  return (
    <Switch>
      <Route
        path={`/project/:id/edit`}
        render={props => (
          <Query
            query={GET_PROJECT}
            variables={{
              id: props.match.params.id,
            }}
          >
            {({ data, loading }) => (
              <div>
                <PageHeader>Edit Project</PageHeader>
                <ProjectForm
                  onSubmit={onSave}
                  loading={loading}
                  initialValues={data.Project}
                />
              </div>
            )}
          </Query>
        )}
      />
      <Route
        path="/project/:id"
        render={props => (
          <Query
            query={GET_PROJECT}
            variables={{
              id: props.match.params.id,
            }}
          >
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
  graphql(UPDATE_PROJECT, { name: 'updateProject' }),
  withHandlers<EnhancedProps, HandlerProps>({
    onSave: ({ updateProject, history }) => (data: any) => {
      updateProject({ variables: { id: data.id, name: data.name } }).then(() =>
        history.goBack()
      );
    },
  })
);

export default enhance(ProjectViewPage);
