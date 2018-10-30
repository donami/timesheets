import React from 'react';
import { compose } from 'recompose';
import { graphql, Query } from 'react-apollo';

import { Search, Category } from '../components';
import { GET_CATEGORIES, SEARCH_QUERY } from '../store/queries';
import styled from '../../../styled/styled-components';
import { PageLoader } from 'src/modules/ui';
import { CompanyContext } from '../../common/components/routing';

type Props = {};
type DataProps = {
  query: string;
};
type EnhancedProps = Props & DataProps;

const HelpPage: React.SFC<EnhancedProps> = ({ query }) => (
  <div>
    <Search />

    <CompanyContext.Consumer>
      {({ company }: any) => (
        <Query query={GET_CATEGORIES} variables={{ companyId: company.id }}>
          {({ data, loading }) => {
            if (loading) {
              return <PageLoader />;
            }

            if (data.allCategories.length === 0) {
              return <NoArticles>No articles published yet.</NoArticles>;
            }

            return (
              <>
                {data.allCategories.map((category: any) => (
                  <Category key={category.id} category={category} />
                ))}
              </>
            );
          }}
        </Query>
      )}
    </CompanyContext.Consumer>
  </div>
);

const enhance = compose<any, any>(
  graphql(SEARCH_QUERY, {
    props: ({ data }: any) => ({
      query: (data.helpSearch && data.helpSearch.value) || '',
    }),
  })
);

export default enhance(HelpPage);

const NoArticles = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  border: #e8e8e8 1px solid;
  margin: 10px 0;
`;
