import React from 'react';
import { graphql } from 'react-apollo';
import { compose, branch, renderNothing, withHandlers } from 'recompose';

import { TimesheetTemplateForm } from '../components';
import { PageHeader } from '../../common';
import { GET_TEMPLATE } from '../store/queries';
import { UPDATE_TEMPLATE, UPDATE_HOURS_DAYS } from '../store/mutations';

type Props = {
  match: any;
  history: any;
};
type DataProps = {
  template: any;
  loading: boolean;
  updateTemplate(options: any): any;
  updateHoursDays(options: any): any;
};
type HandlerProps = {
  onSubmit(data: any): any;
};
type EnhancedProps = Props & DataProps & HandlerProps;

const TimesheetTemplateEditPage: React.SFC<EnhancedProps> = ({
  template,
  onSubmit,
}) => (
  <div>
    <PageHeader>Edit Timesheet Template</PageHeader>

    <TimesheetTemplateForm initialValues={template} onSubmit={onSubmit} />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TEMPLATE, {
    options: (props: any) => ({
      variables: { id: props.match.params.id },
    }),
    props: ({ data }: any) => ({
      loading: data.loading,
      template: data.Template,
    }),
  }),
  graphql(UPDATE_TEMPLATE, { name: 'updateTemplate' }),
  graphql(UPDATE_HOURS_DAYS, { name: 'updateHoursDays' }),
  withHandlers<EnhancedProps, HandlerProps>({
    onSubmit: props => data => {
      const updateDays = data.hoursDays.map((day: any) => {
        return props.updateHoursDays({
          variables: {
            id: day.id,
            break: day.break,
            holiday: day.holiday,
            inTime: day.inTime,
            outTime: day.outTime,
            totalHours: day.totalHours,
          },
        });
      });

      Promise.all(updateDays)
        .then(() => {
          props.updateTemplate({
            variables: {
              id: data.id,
              name: data.name,
              workHoursPerDay: data.workHoursPerDay,
              shiftStartTime: data.shiftStartTime,
              shiftEndTime: data.shiftEndTime,
            },
          });
        })
        .then(() => {
          props.history.goBack();
        });
    },
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(TimesheetTemplateEditPage);
