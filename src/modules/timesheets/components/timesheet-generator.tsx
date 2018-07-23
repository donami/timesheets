import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import { getGeneratedTimesheets } from '../store/selectors';
import { getSelectedUserGroupTemplate } from '../../users/store/selectors';
import { generateTimesheets, confirmTemplates } from '../store/actions';
import { TimesheetTemplateItem } from '../store/models';
import { Project } from '../../projects/store/models';

type Props = {
  template: TimesheetTemplateItem;
  generated: any;
  confirmTemplates: (timesheets: any) => any;
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

  render() {
    const { template, generated, projects } = this.props;

    return (
      <React.Fragment>
        {template && (
          <React.Fragment>
            <h4>Generate timesheets using the template: {template.name}</h4>

            {generated &&
              generated.timesheets.length > 0 && (
                <div>
                  <h4>Generated Timesheets</h4>

                  {generated.timesheets.map((month: any, index: any) => (
                    <div key={index}>{month.month}</div>
                  ))}

                  <div>
                    <Button color="green" onClick={this.handleConfirmTemplates}>
                      Confirm
                    </Button>
                    <Button>Cancel</Button>
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
                <label>From:</label>
                <select name="from">
                  <option value="2018-06-01">Jun 2018</option>
                </select>

                <label>To:</label>
                <select name="to">
                  <option value="2018-12-01">Dec 2018</option>
                </select>

                <div>
                  <label>Project:</label>
                  <select name="project">
                    {projects.map(project => (
                      <option value={project.id} key={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" color="blue">
                  Generate
                </Button>
              </form>
            )}
          </React.Fragment>
        )}

        {!template && (
          <React.Fragment>
            In order to generate timesheets, the user needs to be attached to a
            group which has a timesheet template assigned to it.
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetGenerator);
