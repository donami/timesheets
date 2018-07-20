import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'connected-react-router';

import {
  TimesheetsPage,
  TimesheetViewPage,
  ManageTimesheets,
  TimesheetTemplatesPage,
  TemplateViewPage,
} from '../../timesheets';
import ProtectedRoute from './protected-route';
import { ExpenseReportPage, ExpensesPage } from '../../expenses';
import { connect } from 'react-redux';
import { DashboardPage } from '../../dashboard';
import { AuthPage, LogoutPage, ProfilePage } from '../../auth';
import { checkStorage } from '../../auth/store/actions';
import { UserListPage, UserViewPage } from '../../users';
import { ProjectListPage, ProjectViewPage } from '../../projects';
import { GroupViewPage, GroupListPage } from '../../groups';
import textManager from '../../../services/text-manager';
import { history } from '../../../store';
import { NotFoundPage } from '../pages';

export interface RoutingProps {
  checkStorage: () => any;
}

export const TextManagerContext = React.createContext(textManager);

class Routing extends React.Component<RoutingProps> {
  textManager: any;

  constructor(props: any) {
    super(props);

    this.textManager = textManager;
  }

  componentWillMount() {
    // this.props.checkStorage();
  }

  render() {
    return (
      <TextManagerContext.Provider value={this.textManager}>
        <ConnectedRouter history={history}>
          <Switch>
            <ProtectedRoute exact path="/" component={DashboardPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/logout" component={LogoutPage} />
            <ProtectedRoute
              path="/timesheet/:id"
              component={TimesheetViewPage}
            />
            <ProtectedRoute path="/timesheets" component={TimesheetsPage} />
            <ProtectedRoute
              path="/expense-report/:id"
              component={ExpenseReportPage}
            />
            <ProtectedRoute path="/expense-reports" component={ExpensesPage} />
            <ProtectedRoute path="/user/:id" component={UserViewPage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <ProtectedRoute path="/users" component={UserListPage} />
            <ProtectedRoute
              path="/manage-timesheets"
              component={ManageTimesheets}
            />
            <ProtectedRoute
              path="/timesheet-template/:id"
              component={TemplateViewPage}
            />
            <ProtectedRoute
              path="/timesheet-templates"
              component={TimesheetTemplatesPage}
            />
            <ProtectedRoute path="/project/:id" component={ProjectViewPage} />
            <ProtectedRoute path="/projects" component={ProjectListPage} />
            <ProtectedRoute path="/group/:id" component={GroupViewPage} />
            <ProtectedRoute path="/groups" component={GroupListPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>
      </TextManagerContext.Provider>
    );
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      checkStorage,
    },
    dispatch
  );

export default connect(
  undefined,
  mapDispatchToProps
)(Routing);
