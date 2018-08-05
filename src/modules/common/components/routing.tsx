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
  TimesheetTemplateCreatePage,
} from '../../timesheets';
import ProtectedRoute from './protected-route';
import { ExpenseReportPage, ExpensesPage } from '../../expenses';
import { connect } from 'react-redux';
import { DashboardPage } from '../../dashboard';
import { AuthPage, LogoutPage, ProfilePage } from '../../auth';
import { UserListPage, UserViewPage, UserAddPage } from '../../users';
import {
  ProjectListPage,
  ProjectViewPage,
  ProjectAddPage,
} from '../../projects';
import { GroupViewPage, GroupListPage, GroupAddPage } from '../../groups';
import textManager from '../../../services/text-manager';
import { history } from '../../../store';
import { NotFoundPage } from '../pages';
import { UserRole } from '../../users/store/models';
import {
  HelpPage,
  ArticleViewPage,
  CategoryViewPage,
  SearchPage,
  ManageHelpPage,
  CategoryAddPage,
  ArticleAddPage,
  ArticleEditPage,
} from '../../help';
import categoryEditPage from '../../help/pages/category-edit-page';

type Props = {
  initialize: () => any;
};

export const TextManagerContext = React.createContext(textManager);

class Routing extends React.Component<Props> {
  textManager: any;

  constructor(props: any) {
    super(props);

    this.textManager = textManager;
  }

  componentWillMount() {
    this.props.initialize();
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
              path="/help/manage/add-category"
              component={CategoryAddPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage/edit-category/:id"
              component={categoryEditPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage/add-article"
              component={ArticleAddPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage/edit-article/:id"
              component={ArticleEditPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage"
              component={ManageHelpPage}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute path="/help/search" component={SearchPage} />
            <ProtectedRoute
              path="/help/category/:id"
              component={CategoryViewPage}
            />
            <ProtectedRoute path="/help/:id" component={ArticleViewPage} />
            <ProtectedRoute path="/help" component={HelpPage} />
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
              path="/groups/add"
              component={GroupAddPage}
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
              path="/timesheet-templates/create"
              component={TimesheetTemplateCreatePage}
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
      initialize: () => ({
        type: 'INITIALIZE_ROUTING',
      }),
    },
    dispatch
  );

export default connect(
  undefined,
  mapDispatchToProps
)(Routing);
