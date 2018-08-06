import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import { getGeneratedTimesheets } from '../store/selectors';
import { getSelectedUserGroupTemplate } from '../../users/store/selectors';
import {
  generateTimesheets,
  confirmTemplates,
  cancelTemplates,
} from '../store/actions';
import { TimesheetTemplateItem } from '../store/models';
import { Project } from '../../projects/store/models';
import { listOfMonthsFromToday } from '../../../utils/calendar';
import { Translate } from '../../common';

type Props = {
  template: TimesheetTemplateItem;
  generated: any;
  confirmTemplates: (timesheets: any) => any;
  cancelTemplates: () => any;
  generateTimesheets: (
    from: string,
    to: string,
    projectId: number,
    userId: number,
    template: TimesheetTemplateItem
  ) => any;
  projects: Project[];
  userId: number;
};

class TimesheetGenerator extends React.Component<Props> {
  generateForm: HTMLFormElement | null;

  handleGenerateTimesheets = (e: any) => {
    e.preventDefault();
    const { from, to, project } = this.generateForm as any;

    this.props.generateTimesheets(
      from.value,
      to.value,
      +project.value,
      this.props.userId,
      this.props.template
    );
  };

  handleConfirmTemplates = (e: any) => {
    this.props.confirmTemplates(this.props.generated);
  };

  handleCancelTemplates = (e: any) => {
    this.props.cancelTemplates();
  };

  render() {
    const { template, generated, projects } = this.props;

    const pastMonths = listOfMonthsFromToday(
      6,
      { future: false, includeCurrent: true },
      'YYYY-MM-DD'
    );
    const futureMonths = listOfMonthsFromToday(
      6,
      { future: true, includeCurrent: true },
      'YYYY-MM-DD'
    );

    return (
      <React.Fragment>
        {template && (
          <React.Fragment>
            <h4>
              <Translate text="timesheet.labels.GENERATE_TIMESHEETS_USING_TEMPLATE" />:
              &nbsp;
              {template.name}
            </h4>

            {generated &&
              generated.timesheets.length > 0 && (
                <div>
                  <h4>
                    <Translate text="timesheet.labels.GENERATED_TIMESHEETS" />
                  </h4>

                  {generated.timesheets.map((month: any, index: any) => (
                    <div key={index}>{month.month}</div>
                  ))}

                  <div>
                    <Button color="green" onClick={this.handleConfirmTemplates}>
                      <Translate text="common.labels.CONFIRM" />
                    </Button>
                    <Button onClick={this.handleCancelTemplates}>
                      <Translate text="common.labels.CANCEL" />
                    </Button>
                  </div>
                </div>
              )}

            {!generated && (
              <form
                onSubmit={this.handleGenerateTimesheets}
                ref={form => {
                  this.generateForm = form;
                }}
              >
                <label>
                  <Translate text="common.labels.FROM" />:
                </label>
                <select name="from">
                  {pastMonths.map((month: string, index: number) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <label>
                  <Translate text="common.labels.TO" />:
                </label>
                <select name="to">
                  {futureMonths.map((month: string, index: number) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <div>
                  <label>
                    <Translate text="projects.labels.PROJECT" />:
                  </label>
                  <select name="project">
                    {projects.map(project => (
                      <option value={project.id} key={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" color="purple">
                  <Translate text="common.labels.GENERATE" />
                </Button>
              </form>
            )}
          </React.Fragment>
        )}

        {!template && (
          <React.Fragment>
            <Translate text="timesheet.messages.NEED_GROUP_TO_GENERATE" />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  template: getSelectedUserGroupTemplate(state),
  generated: getGeneratedTimesheets(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      generateTimesheets,
      confirmTemplates,
      cancelTemplates,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetGenerator);
