import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import { NotFoundPage, Wizard } from '../pages';
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
import withLoading from './with-loading';

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
            <ProtectedRoute
              exact
              path="/"
              component={withLoading(DashboardPage)}
            />
            <Route path="/auth" component={AuthPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/setup-wizard/step/:step" component={Wizard} />
            <Route
              path="/setup-wizard"
              render={() => <Redirect to="/setup-wizard/step/1" />}
            />
            <ProtectedRoute
              path="/help/manage/add-category"
              component={withLoading(CategoryAddPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage/edit-category/:id"
              component={withLoading(categoryEditPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage/add-article"
              component={withLoading(ArticleAddPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage/edit-article/:id"
              component={withLoading(ArticleEditPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/help/manage"
              component={withLoading(ManageHelpPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute path="/help/search" component={SearchPage} />
            <ProtectedRoute
              path="/help/category/:id"
              component={withLoading(CategoryViewPage)}
            />
            <ProtectedRoute
              path="/help/:id"
              component={withLoading(ArticleViewPage)}
            />
            <ProtectedRoute path="/help" component={withLoading(HelpPage)} />
            <ProtectedRoute
              path="/timesheet/:id"
              component={withLoading(TimesheetViewPage)}
            />
            <ProtectedRoute
              path="/timesheets"
              component={withLoading(TimesheetsPage)}
            />
            <ProtectedRoute
              path="/expense-report/:id"
              component={withLoading(ExpenseReportPage)}
            />
            <ProtectedRoute
              path="/expense-reports"
              component={withLoading(ExpensesPage)}
            />
            <ProtectedRoute
              path="/profile"
              component={withLoading(ProfilePage)}
            />
            <ProtectedRoute
              path="/user/:id"
              component={withLoading(UserViewPage)}
            />
            <ProtectedRoute
              path="/users/add"
              component={withLoading(UserAddPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/projects/add"
              component={withLoading(ProjectAddPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/groups/add"
              component={withLoading(GroupAddPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/users"
              component={withLoading(UserListPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/manage-timesheets"
              component={withLoading(ManageTimesheets)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/timesheet-template/:id"
              component={withLoading(TemplateViewPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/timesheet-templates/create"
              component={withLoading(TimesheetTemplateCreatePage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/timesheet-templates"
              component={withLoading(TimesheetTemplatesPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/project/:id"
              component={withLoading(ProjectViewPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/projects"
              component={withLoading(ProjectListPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/group/:id"
              component={withLoading(GroupViewPage)}
              roles={[UserRole.Manager, UserRole.Admin]}
            />
            <ProtectedRoute
              path="/groups"
              component={withLoading(GroupListPage)}
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
