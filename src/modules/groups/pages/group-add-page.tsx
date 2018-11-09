import React from 'react';
import { compose, branch, renderNothing, withHandlers } from 'recompose';
import { graphql, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GroupForm } from '../components';
import { PageHeader } from '../../common';
import { Project } from '../../projects/store/models';
import { TimesheetTemplateItem } from '../../timesheets/store/models';
import { CREATE_GROUP } from '../store/mutations';
import { PROJECT_LIST_ITEM_FRAGMENT } from '../../projects/store/queries';
import { GET_GROUPS } from '../store/queries';
import { withToastr } from '../../common/components/toastr/toastr';
import { CompanyContext } from '../../common/components/routing';
import { TEMPLATE_LIST_ITEM_FRAGMENT } from '../../timesheets/store/fragments';
import { PageLoader } from '../../ui';
import { LOGGED_IN_USER } from '../../auth/store/queries';

type Props = {
  userId: number;
};
type DataProps = {
  createGroup(options: any): any;
  addToastMutate(options: any): any;
  addToast(title: string, message: string, type: string): Promise<any>;
  history: any;
};
type HandlerProps = { onAdd(data: any, createGroup: any): any };
type EnhancedProps = Props & DataProps & HandlerProps;

const GroupAddPage: React.SFC<EnhancedProps> = ({ onAdd }) => (
  <CompanyContext.Consumer>
    {({ company }: any) => (
      <div>
        <PageHeader>Create new Group</PageHeader>

        <Query query={QUERY} variables={{ companyId: company.id }}>
          {({ data, loading }) => {
            if (loading) {
              return <PageLoader />;
            }

            return (
              <Mutation
                mutation={CREATE_GROUP}
                update={(proxy, { data: { createGroup } }: { data: any }) => {
                  const { allGroups }: any = proxy.readQuery({
                    query: GET_GROUPS,
                    variables: {
                      companyId: createGroup.project.company.id,
                    },
                  });

                  proxy.writeQuery({
                    query: GET_GROUPS,
                    variables: {
                      companyId: createGroup.project.company.id,
                    },
                    data: {
                      allGroups: allGroups.concat(createGroup),
                    },
                  });
                }}
              >
                {(createGroup, { loading }) => (
                  <GroupForm
                    onSubmit={data => onAdd(data, createGroup)}
                    companyId={company.id}
                    projects={data.allProjects || []}
                    templates={data.allTemplates || []}
                    loading={loading}
                  />
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    )}
  </CompanyContext.Consumer>
);

const QUERY = gql`
  query($companyId: ID!) {
    allTemplates(filter: { company: { id: $companyId } }) {
      ...TemplateListItem
    }
    allProjects(filter: { company: { id: $companyId } }) {
      ...ProjectListItem
    }
  }
  ${PROJECT_LIST_ITEM_FRAGMENT}
  ${TEMPLATE_LIST_ITEM_FRAGMENT}
`;

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  withHandlers<EnhancedProps, HandlerProps>({
    onAdd: ({ addToast, history }) => (data, createGroup) => {
      createGroup({
        variables: {
          name: data.name,
          projectId: data.project,
          templateId: data.timesheetTemplate,
        },
      }).then(() => {
        addToast(
          'Group was added',
          'Group was successfully created',
          'positive'
        ).then(() => {
          history.goBack();
        });
      });
    },
  })
);

export default enhance(GroupAddPage);
