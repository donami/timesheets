import React from 'react';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Button, List, Icon, Select } from 'genui';

import { TimesheetItem, ConflictResolve } from '../store/models';
import { Project } from '../../projects/store/models';
import {
  listOfMonthsFromToday,
  monthsBetween,
  generateCalendarFromTemplate,
} from '../../../utils/calendar';
import { Translate, Form } from '../../common';
import styled from '../../../styled/styled-components';
import { DELETE_TIMESHEET } from '../store/mutations';
import { USER_VIEW_PAGE_QUERY } from '../../users/pages/user-view-page';

type Props = {
  userProjectId: any;
  previousTimesheets: TimesheetItem[];
  projects: Project[];
  userId: string;
  group: any;
};
type DataProps = {
  confirmTemplates(options: any): any;
  deleteTimesheet(options: any): any;
};
type EnhancedProps = Props & DataProps;

type State = {
  generated: {
    timesheets: any[];
    ownerId: string;
    projectId: string;
  } | null;
};

const generator = (payload: {
  from: string;
  to: string;
  template: any;
  projectId: string;
  ownerId: string;
}) => {
  const months = monthsBetween(payload.from, payload.to);

  const timesheets = months.map((startOfMonth: string) => {
    const dates = generateCalendarFromTemplate(
      startOfMonth,
      payload.template.hoursDays
    );

    return {
      dates,
      periodStart: startOfMonth,
      status: 'IN_PROGRESS',
    };
  });

  return {
    timesheets,
    projectId: payload.projectId,
    ownerId: payload.ownerId,
  };
};

class TimesheetGenerator extends React.Component<EnhancedProps, State> {
  state: State = {
    generated: null,
  };

  handleGenerateTimesheets = (model: any) => {
    const generated = generator({
      from: model.from,
      to: model.to,
      template: this.props.group.template,
      projectId: this.props.userProjectId,
      ownerId: this.props.userId,
    });

    this.setState({ generated });
  };

  handleConfirmTemplates = async (e: any) => {
    const { generated } = this.state;

    if (!generated || !generated.timesheets) {
      return;
    }

    const inserts = generated.timesheets.map((item: any) => {
      const dates: any[] = [];
      item.dates.forEach((week: any) => {
        week.forEach((day: any) => {
          if (day.date) {
            dates.push({
              date: day.date,
              expected: {
                holiday: false,
                inTime: day.expected.inTime,
                outTime: day.expected.outTime,
                break: day.expected.break,
                totalHours: day.expected.totalHours,
              },
              hours: day.hours,
            });
          }
        });
      });
      return this.props.confirmTemplates({
        variables: {
          dates,
          projectId: generated.projectId,
          ownerId: generated.ownerId,
          periodStart: item.periodStart,
          status: item.status,
        },
      });
    });

    await Promise.all(inserts);
  };

  handleCancelTemplates = (e: any) => {
    this.setState({ generated: null });
  };

  handleResolveConflict = (
    timesheetId: number,
    periodStart: string,
    resolve: ConflictResolve
  ) => {
    if (!this.state.generated) {
      return;
    }

    if (resolve === ConflictResolve.DISCARD_NEW) {
      // Remove generated timesheet from state
      this.setState({
        generated: {
          ...this.state.generated,
          timesheets: this.state.generated.timesheets.filter(
            (item: any) => item.periodStart !== periodStart
          ),
        },
      });
    } else {
      this.props.deleteTimesheet({
        variables: {
          id: timesheetId,
        },
        optimisticResponse: {
          deleteTimesheet: {
            id: timesheetId,
            __typename: 'Timesheet',
          },
        },
      });
    }
  };

  render() {
    const { previousTimesheets, group } = this.props;
    const { generated } = this.state;

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
        {group.template && (
          <React.Fragment>
            <h4>
              <Translate text="timesheet.labels.GENERATE_TIMESHEETS_USING_TEMPLATE" />
              : &nbsp;
              {group.template.name}
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
                        item => item.periodStart === month.periodStart
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
                                    month.periodStart,
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
                                    month.periodStart,
                                    ConflictResolve.DISCARD_NEW
                                  )
                                }
                              >
                                Keep Old
                              </span>
                            </Conflict>
                          )}
                          {month.periodStart}
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

        {!group.template && (
          <React.Fragment>
            <Translate text="timesheet.messages.NEED_GROUP_TO_GENERATE" />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const CONFIRM_TEMPLATES_MUTATION = gql`
  mutation(
    $periodStart: String!
    $status: String
    $dates: [TimesheetdatesTimesheetDate!]
    $ownerId: ID!
    $projectId: ID!
  ) {
    createTimesheet(
      periodStart: $periodStart
      status: $status
      projectId: $projectId
      ownerId: $ownerId
      dates: $dates
    ) {
      id
    }
  }
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(CONFIRM_TEMPLATES_MUTATION, { name: 'confirmTemplates' }),
  graphql(DELETE_TIMESHEET, {
    name: 'deleteTimesheet',
    options: (props: Props) => ({
      update: (proxy, { data }: any) => {
        const { User, ...rest }: any = proxy.readQuery({
          query: USER_VIEW_PAGE_QUERY,
          variables: {
            id: props.userId,
          },
        });

        proxy.writeQuery({
          query: USER_VIEW_PAGE_QUERY,
          data: {
            ...rest,
            User: {
              ...User,
              timesheets: User.timesheets.filter(
                (item: any) => item.id !== data.deleteTimesheet.id
              ),
            },
          },
        });
      },
    }),
  })
);

export default enhance(TimesheetGenerator);

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
