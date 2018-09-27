import * as React from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  TimesheetsPage,
  TimesheetViewPage,
  ManageTimesheets,
  TimesheetTemplatesPage,
  TemplateViewPage,
  TimesheetTemplateCreatePage,
  TimesheetTemplateEditPage,
} from '../../timesheets';
import ProtectedRoute from './protected-route';
import { ExpenseReportPage, ExpensesPage } from '../../expenses';
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
import { NotFoundPage, Wizard, SearchPage } from '../pages';
import { UserRole } from '../../users/store/models';
import {
  HelpPage,
  ArticleViewPage,
  CategoryViewPage,
  SearchPage as HelpSearchPage,
  ManageHelpPage,
  CategoryAddPage,
  ArticleAddPage,
  ArticleEditPage,
} from '../../help';
import categoryEditPage from '../../help/pages/category-edit-page';
import { ThemeProvider } from '../../../styled/styled-components';
import { theme } from '../../../styled/theme';

type Props = {};

export const TextManagerContext = React.createContext(textManager);

class Routing extends React.Component<Props> {
  textManager: any;

  constructor(props: any) {
    super(props);

    this.textManager = textManager;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TextManagerContext.Provider value={this.textManager}>
          <HashRouter>
            <Switch>
              <ProtectedRoute exact path="/" component={DashboardPage} />
              <Route path="/auth" component={AuthPage} />
              <Route path="/logout" component={LogoutPage} />
              <Route path="/setup-wizard/step/:step" component={Wizard} />
              <Route
                path="/setup-wizard"
                render={() => <Redirect to="/setup-wizard/step/1" />}
              />
              <ProtectedRoute
                path="/search"
                component={SearchPage}
                roles={[UserRole.Manager, UserRole.Admin]}
              />
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
              <ProtectedRoute
                path="/help/search"
                component={HelpSearchPage}
                roles={[UserRole.User, UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute
                path="/help/category/:id"
                component={CategoryViewPage}
                roles={[UserRole.User, UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute
                path="/help/:id"
                component={ArticleViewPage}
                roles={[UserRole.User, UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute
                path="/help"
                component={HelpPage}
                roles={[UserRole.User, UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute
                path="/timesheet/:id"
                component={TimesheetViewPage}
                roles={[UserRole.User, UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute path="/timesheets" component={TimesheetsPage} />
              <ProtectedRoute
                path="/expense-report/:id/:page?"
                component={ExpenseReportPage}
              />
              <ProtectedRoute
                path="/expense-reports/:page?"
                component={ExpensesPage}
              />
              <ProtectedRoute
                path="/profile/:page?"
                component={ProfilePage}
                roles={[UserRole.User, UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute
                path="/user/:id/:page?"
                component={UserViewPage}
              />
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
                path="/timesheet-template/:id/edit"
                component={TimesheetTemplateEditPage}
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
                path="/project/:id/:page?"
                component={ProjectViewPage}
                roles={[UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute
                path="/projects"
                component={ProjectListPage}
                roles={[UserRole.Manager, UserRole.Admin]}
              />
              <ProtectedRoute
                path="/group/:id/:page?"
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
          </HashRouter>
        </TextManagerContext.Provider>
      </ThemeProvider>
    );
  }
}

const LOGGED_IN_USER = gql`
  query user {
    user {
      id
    }
  }
`;

const enhance = compose(graphql(LOGGED_IN_USER));

export default enhance(Routing);
