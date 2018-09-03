import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, TableBuilder, Table } from 'genui';

import {
  getGroups,
  getGroupListPageState,
  getTotalCount,
} from '../store/selectors';
import { loadGroupListPage, fetchGroups, removeGroup } from '../store/actions';
import { Group } from '../store/models';
// import { GroupList } from '../components';
import { PageHeader, Translate } from '../../common';
import { Link } from 'react-router-dom';
import { getProjects } from '../../projects/store/selectors';
import { Project } from '../../projects/store/models';

type Props = {
  loadGroupListPage: (options?: any) => any;
  fetchGroups: (options?: any) => any;
  removeGroup: (groupId: number) => any;
  groupListPage: any;
  projects: Project[];
  groups: Group[];
  totalCount: number;
};

class GroupListPage extends React.Component<Props> {
  componentWillMount() {
    const { take, skip } = this.props.groupListPage;

    this.props.loadGroupListPage({ take, skip });
  }

  handleLoadMore = () => {
    const { take, skip } = this.props.groupListPage;

    this.props.loadGroupListPage({ take, skip: skip + take });
  };

  handleRemoveGroup = (groupId: number) => {
    this.props.removeGroup(groupId);
  };

  getProject = (group: Group) => {
    return this.props.projects.find(
      (project: any) => project.groups.indexOf(group.id) > -1
    );
  };

  render() {
    const { groups } = this.props;
    // const { groups, totalCount } = this.props;

    return (
      <div>
        <PageHeader
          options={() => (
            <Button to="/groups/add" color="purple">
              <Translate text="groups.labels.NEW_GROUP" />
            </Button>
          )}
        >
          <Translate text="groups.labels.GROUPS" />
        </PageHeader>

        {/* <GroupList
          onRemoveGroup={this.handleRemoveGroup}
          groups={groups}
          onLoadMore={this.handleLoadMore}
          totalCount={totalCount}
        /> */}

        <TableBuilder
          selectable
          items={groups}
          itemsOptions={(item: any) => [
            {
              label: 'View group',
              icon: 'fas fa-eye',
              to: `/group/${item.id}`,
            },
          ]}
          renderHeaders={
            <>
              <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
              <Table.HeaderCell sortableBy="name">Name</Table.HeaderCell>
              <Table.HeaderCell sortableBy="project">Project</Table.HeaderCell>
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
            </>
          }
          renderItem={(item: any) => {
            const project = this.getProject(item);
            return (
              <>
                <Table.Cell>
                  <Link to={`/group/${item.id}`}>#{item.id}</Link>
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  {(project && project.name) || 'No project'}
                </Table.Cell>

                <Table.Cell
                  option={{
                    icon: 'fas fa-pencil-alt',
                    to: `/group/${item.id}/edit`,
                  }}
                />
                <Table.Cell
                  option={{
                    icon: 'fas fa-trash',
                    onClick: () => this.handleRemoveGroup(item.id),
                  }}
                />
              </>
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  groups: getGroups(state),
  groupListPage: getGroupListPageState(state),
  projects: getProjects(state),
  totalCount: getTotalCount(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      loadGroupListPage,
      fetchGroups,
      removeGroup,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupListPage);
