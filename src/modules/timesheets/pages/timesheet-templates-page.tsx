import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, TableBuilder, Table } from 'genui';

// import { TimesheetTemplateList } from '../components';
import {
  fetchTimesheetTemplatesIfNeeded,
  removeTimesheetTemplate,
} from '../store/actions';
import { timesheetSelectors } from '../store';
import { PageHeader, Translate } from '../../common';
import { Link } from 'react-router-dom';

export interface TimesheetTemplatesPageProps {
  templates: any;
  fetchTimesheetTemplatesIfNeeded(): any;
  removeTimesheetTemplate(templateId: number): any;
}

class TimesheetTemplatesPage extends React.Component<
  TimesheetTemplatesPageProps
> {
  componentWillMount() {
    this.props.fetchTimesheetTemplatesIfNeeded();
  }

  handleRemove = (templateId: number) => {
    this.props.removeTimesheetTemplate(templateId);
  };

  render() {
    const { templates } = this.props;

    return (
      <div>
        <PageHeader
          options={() => (
            <Button to="/timesheet-templates/create" color="purple">
              <Translate text="timesheetTemplates.labels.NEW_TIMESHEET_TEMPLATE" />
            </Button>
          )}
        >
          <Translate text="timesheetTemplates.labels.TIMESHEET_TEMPLATES" />
        </PageHeader>

        <TableBuilder
          selectable
          items={templates}
          itemsOptions={(item: any) => [
            {
              label: 'View template',
              icon: 'fas fa-eye',
              to: `/timesheet-template/${item.id}`,
            },
          ]}
          renderHeaders={
            <>
              <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
              <Table.HeaderCell sortableBy="name">Name</Table.HeaderCell>
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
            </>
          }
          renderItem={(item: any) => (
            <>
              <Table.Cell>
                <Link to={`/timesheet-template/${item.id}`}>#{item.id}</Link>
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>

              <Table.Cell
                option={{
                  icon: 'fas fa-pencil-alt',
                  to: `/timesheet-template/${item.id}/edit`,
                }}
              />
              <Table.Cell
                option={{
                  icon: 'fas fa-trash',
                  onClick: () => this.handleRemove(item.id),
                }}
              />
            </>
          )}
        />

        {/* <TimesheetTemplateList
          templates={templates}
          onRemoveTemplate={this.handleRemove}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  templates: timesheetSelectors.getTimesheetTemplates(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchTimesheetTemplatesIfNeeded,
      removeTimesheetTemplate,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetTemplatesPage);
