import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, List, Icon } from 'genui';

import { getGeneratedTimesheets } from '../store/selectors';
import { getSelectedUserGroupTemplate } from '../../users/store/selectors';
import {
  generateTimesheets,
  confirmTemplates,
  cancelTemplates,
  resolveTimesheetConflict,
} from '../store/actions';
import {
  TimesheetTemplateItem,
  TimesheetItem,
  ConflictResolve,
} from '../store/models';
import { Project } from '../../projects/store/models';
import { listOfMonthsFromToday } from '../../../utils/calendar';
import { Translate, Select, Form } from '../../common';
import styled from '../../../styled/styled-components';
import { Row, Column } from '../../ui';

type Props = {
  template: TimesheetTemplateItem;
  generated: any;
  previousTimesheets: TimesheetItem[];
  resolveTimesheetConflict: (
    timesheetId: number,
    periodStart: string,
    resolve: ConflictResolve
  ) => any;
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
  handleGenerateTimesheets = (model: any) => {
    this.props.generateTimesheets(
      model.from,
      model.to,
      +model.project,
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

  handleResolveConflict = (
    timesheetId: number,
    periodStart: string,
    resolve: ConflictResolve
  ) => {
    this.props.resolveTimesheetConflict(timesheetId, periodStart, resolve);
  };

  render() {
    const { template, generated, projects, previousTimesheets } = this.props;

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

    let conflictingDates = false;

    return (
      <React.Fragment>
        {template && (
          <React.Fragment>
            <h4>
              <Translate text="timesheet.labels.GENERATE_TIMESHEETS_USING_TEMPLATE" />
              : &nbsp;
              {template.name}
            </h4>

            {generated &&
              generated.timesheets.length > 0 && (
                <div>
                  <h4>
                    <Translate text="timesheet.labels.GENERATED_TIMESHEETS" />
                  </h4>

                  <List divided>
                    {generated.timesheets.map((month: any, index: any) => {
                      const hasConflict = previousTimesheets.find(
                        item => item.periodStart === month.month
                      );

                      if (hasConflict) {
                        conflictingDates = true;
                      }

                      return (
                        <List.Item key={index}>
                          {hasConflict && (
                            <Conflict>
                              <Icon
                                name="fas fa-exclamation-triangle"
                                title="Date Conflict"
                              />
                              <span
                                onClick={() =>
                                  this.handleResolveConflict(
                                    hasConflict.id,
                                    month.month,
                                    ConflictResolve.DISCARD_OLD
                                  )
                                }
                              >
                                Keep New,
                              </span>
                              <span
                                onClick={() =>
                                  this.handleResolveConflict(
                                    hasConflict.id,
                                    month.month,
                                    ConflictResolve.DISCARD_NEW
                                  )
                                }
                              >
                                Keep Old
                              </span>
                            </Conflict>
                          )}
                          {month.month}
                        </List.Item>
                      );
                    })}
                  </List>

                  <div>
                    {conflictingDates && (
                      <div>
                        <h4>Conflicting Dates</h4>
                        <p>
                          There are already one or more timesheets with the
                          generated date. Please resolve conflicts by either
                          keeping the newly generated timesheet, or discard it.
                        </p>
                      </div>
                    )}
                    <Button
                      color="green"
                      onClick={this.handleConfirmTemplates}
                      disabled={conflictingDates}
                    >
                      <Translate text="common.labels.CONFIRM" />
                    </Button>
                    <Button onClick={this.handleCancelTemplates}>
                      <Translate text="common.labels.CANCEL" />
                    </Button>
                  </div>
                </div>
              )}

            {!generated && (
              <Form onValidSubmit={this.handleGenerateTimesheets}>
                {formState => (
                  <>
                    <Form.Field
                      name="from"
                      label="From:"
                      validations={{ isRequired: true }}
                    >
                      <Select
                        placeholder="From"
                        options={pastMonths.map((month: string) => ({
                          value: month,
                          label: month,
                        }))}
                      />
                    </Form.Field>

                    <Form.Field
                      name="to"
                      label="To:"
                      validations={{ isRequired: true }}
                    >
                      <Select
                        placeholder="To"
                        options={futureMonths.map((month: string) => ({
                          value: month,
                          label: month,
                        }))}
                      />
                    </Form.Field>

                    <Form.Field
                      name="project"
                      label="Project:"
                      validations={{ isRequired: true }}
                    >
                      <Select
                        placeholder="Project"
                        options={projects.map(project => ({
                          value: project.id,
                          label: project.name,
                        }))}
                      />
                    </Form.Field>

                    <Button
                      type="submit"
                      disabled={!formState.isValid}
                      color="purple"
                    >
                      <Translate text="common.labels.GENERATE" />
                    </Button>
                  </>
                )}
              </Form>
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
      resolveTimesheetConflict,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetGenerator);

const Conflict = styled.div`
  float: right;

  i,
  svg {
    margin-right: 5px;
    color: #ff7987;
  }

  span {
    margin-right: 5px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
