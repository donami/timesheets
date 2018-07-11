import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetTemplateItem } from '../store/models';
import { selectTemplate, fetchTemplateById } from '../store/actions';
import { getSelectedTemplate } from '../store/selectors';
import { TemplateInfo } from '../components';

export interface TemplateViewPageProps {
  match: any;
  template: TimesheetTemplateItem;
  selectTemplate: (templateId: number) => any;
  fetchTemplateById: (templateId: number) => any;
}

class TemplateViewPage extends React.Component<TemplateViewPageProps> {
  componentWillMount() {
    const { match, selectTemplate, fetchTemplateById } = this.props;

    if (match && match.params.id) {
      selectTemplate(+match.params.id);
      fetchTemplateById(+match.params.id);
    }
  }

  render() {
    const { template } = this.props;

    if (!template) {
      return null;
    }
    return (
      <div>
        <TemplateInfo template={template} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  template: getSelectedTemplate(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectTemplate,
      fetchTemplateById,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateViewPage);
