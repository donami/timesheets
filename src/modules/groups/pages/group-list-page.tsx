import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import {
  getGroups,
  getGroupListPageState,
  getTotalCount,
} from '../store/selectors';
import { loadGroupListPage, fetchGroups, removeGroup } from '../store/actions';
import { Group } from '../store/models';
import { GroupList } from '../components';
import { PageHeader, Translate } from '../../common';

type Props = {
  loadGroupListPage: (options?: any) => any;
  fetchGroups: (options?: any) => any;
  removeGroup: (groupId: number) => any;
  groupListPage: any;
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

  render() {
    const { groups, totalCount } = this.props;

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
        <GroupList
          onRemoveGroup={this.handleRemoveGroup}
          groups={groups}
          onLoadMore={this.handleLoadMore}
          totalCount={totalCount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  groups: getGroups(state),
  groupListPage: getGroupListPageState(state),
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
