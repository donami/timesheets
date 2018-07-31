import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import {
  getGroups,
  getGroupListPageState,
  getTotalCount,
} from '../store/selectors';
import { loadGroupListPage, fetchGroups } from '../store/actions';
import { Group } from '../store/models';
import { GroupList } from '../components';
import { PageHeader } from '../../common';

type Props = {
  loadGroupListPage: (options?: any) => any;
  fetchGroups: (options?: any) => any;
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

  render() {
    const { groups, totalCount } = this.props;

    return (
      <div>
        <PageHeader
          options={() => (
            <Button to="/groups/add" color="blue">
              New Group
            </Button>
          )}
        >
          Groups
        </PageHeader>
        <GroupList
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupListPage);
