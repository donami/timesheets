import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getGroups } from '../store/selectors';
import { fetchGroups } from '../store/actions';
import { Group } from '../store/models';
import { GroupList } from '../components';

export interface GroupListPageProps {
  fetchGroups: () => any;
  groups: Group[];
}

class GroupListPage extends React.Component<GroupListPageProps> {
  componentWillMount() {
    this.props.fetchGroups();
  }

  render() {
    const { groups } = this.props;

    return <GroupList groups={groups} />;
  }
}

const mapStateToProps = (state: any) => ({
  groups: getGroups(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchGroups,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupListPage);
