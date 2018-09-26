import React, { Component } from 'react';
import { compose } from 'recompose';
import { graphql, Mutation } from 'react-apollo';

import { TimesheetTemplateForm } from '../components';
import { PageHeader } from '../../common';
import { CREATE_TEMPLATE } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_TEMPLATES } from '../store/queries';

type Props = {
  history: any;
};
type DataProps = {
  createTemplate(options: any): any;
};
type EnhancedProps = Props & DataProps & WithToastrProps;

class TimesheetTemplateCreatePage extends Component<EnhancedProps> {
  handleSubmit = (data: any) => {
    this.props.addToast(
      'Template created',
      'Template was created successfully',
      'positive'
    );
    this.props.history.goBack();

    // this.props
    //   .createTemplate({
    //     variables: {
    //       hoursDays: data.hoursDays,
    //       name: data.name,
    //       shiftEndTime: data.shiftEndTime,
    //       shiftStartTime: data.shiftStartTime,
    //       workHoursPerDay: data.workHoursPerDay,
    //     },
    //   })
    //   .then(() => {
    //     this.props.history.goBack();
    //   });
  };

  render() {
    return (
      <div>
        <PageHeader>Create Timesheet Template</PageHeader>

        <Mutation
          mutation={CREATE_TEMPLATE}
          update={(proxy, { data: { createTemplate } }: any) => {
            const { allTemplates }: any = proxy.readQuery({
              query: GET_TEMPLATES,
            });

            proxy.writeQuery({
              query: GET_TEMPLATES,
              data: {
                allTemplates: allTemplates.concat(createTemplate),
              },
            });
          }}
        >
          {createTemplate => (
            <TimesheetTemplateForm
              onSubmit={this.handleSubmit}
              createTemplate={createTemplate}
            />
          )}
        </Mutation>
      </div>
    );
  }
}

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  graphql(CREATE_TEMPLATE, { name: 'createTemplate' })
);

export default enhance(TimesheetTemplateCreatePage);
