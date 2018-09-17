import * as React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';

import { TemplateInfo } from '../components';
import { PageHeader } from '../../common';
import { GET_TEMPLATE } from '../store/queries';

type Props = {
  match: any;
};
type DataProps = {
  template: any;
  loading: boolean;
};
type EnhancedProps = Props & DataProps;

const TemplateViewPage: React.SFC<EnhancedProps> = ({ template }) => (
  <div>
    <PageHeader>View Template: {template.name}</PageHeader>
    <TemplateInfo template={template} />
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
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(TemplateViewPage);
