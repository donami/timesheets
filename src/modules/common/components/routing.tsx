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
import { UserListPage, UserViewPage, UserAddPage } from '../../users';
import {
  ProjectListPage,
  ProjectViewPage,
  ProjectAddPage,
} from '../../projects';
import { GroupViewPage, GroupListPage } from '../../groups';
import textManager from '../../../services/text-manager';
import { history } from '../../../store';
import { NotFoundPage } from '../pages';
import { UserRole } from '../../users/store/models';

type Props = {
  checkStorage: () => any;
};

export const TextManagerContext = React.createContext(textManager);

class Routing extends React.Component<Props> {
  textManager: any;

  constructor(props: any) {
    super(props);

    this.textManager = textManager;
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
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <ProtectedRoute path="/user/:id" component={UserViewPage} />
            <ProtectedRoute
              path="/users/add"
              component={UserAddPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/projects/add"
              component={ProjectAddPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/users"
              component={UserListPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/manage-timesheets"
              component={ManageTimesheets}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/timesheet-template/:id"
              component={TemplateViewPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/timesheet-templates"
              component={TimesheetTemplatesPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/project/:id"
              component={ProjectViewPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/projects"
              component={ProjectListPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/group/:id"
              component={GroupViewPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/groups"
              component={GroupListPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
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
