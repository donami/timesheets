import React, { Component } from 'react';
import { compose } from 'recompose';
import { Mutation } from 'react-apollo';

import { TimesheetTemplateForm } from '../components';
import { PageHeader } from '../../common';
import { CREATE_TEMPLATE } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_TEMPLATES } from '../store/queries';
import { CompanyContext } from '../../common/components/routing';

type Props = {
  history: any;
};
type EnhancedProps = Props & WithToastrProps;

class TimesheetTemplateCreatePage extends Component<EnhancedProps> {
  handleSubmit = (data: any) => {
    this.props.addToast(
      'Template created',
      'Template was created successfully',
      'positive'
    );
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CompanyContext.Consumer>
          {({ company }: any) => (
            <>
              <PageHeader>Create Timesheet Template</PageHeader>

              <Mutation
                mutation={CREATE_TEMPLATE}
                update={(proxy, { data: { createTemplate } }: any) => {
                  const { allTemplates }: any = proxy.readQuery({
                    query: GET_TEMPLATES,
                    variables: {
                      companyId: company.id,
                    },
                  });

                  proxy.writeQuery({
                    query: GET_TEMPLATES,
                    variables: {
                      companyId: company.id,
                    },
                    data: {
                      allTemplates: allTemplates.concat(createTemplate),
                    },
                  });
                }}
              >
                {(createTemplate, { loading }) => (
                  <TimesheetTemplateForm
                    onSubmit={this.handleSubmit}
                    createTemplate={createTemplate}
                    loading={loading}
                    companyId={company.id}
                  />
                )}
              </Mutation>
            </>
          )}
        </CompanyContext.Consumer>
      </div>
    );
  }
}

const enhance = compose<EnhancedProps, Props>(withToastr);

export default enhance(TimesheetTemplateCreatePage);
