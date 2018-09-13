import * as React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'genui';
import { compose, defaultProps, mapProps } from 'recompose';

import { ExpenseReport } from '../store/models';
import { Translate } from '../../common';
import { parseDate } from '../../../utils/helpers';
import styled from '../../../styled/styled-components';
import { ListProps } from '../../common/components/list/list';
import List from '../../common/components/list';

type Props = {
  items: ExpenseReport[];
  limit?: number;
  paginated?: boolean;
  noItemsText?: string;
};

type EnhancedProps = Props & ListProps;

const ExpenseReportList: React.SFC<EnhancedProps> = ({
  items,
  pageSize,
  renderItem,
  paginated,
  filter,
  limit,
  noItemsText,
}) => {
  return (
    <Container className="expense-list">
      <StyledList
        items={items}
        pageSize={pageSize}
        limit={limit}
        paginated={paginated}
        filter={filter}
        renderItem={renderItem}
        noItemsText={noItemsText}
        header={
          <Headings className="expense-list-headings">
            <div>ID</div>
            <div>Submitted</div>
            <div>Status</div>
          </Headings>
        }
        className="expense-list-content"
      />
    </Container>
  );
};

const enhance = compose<EnhancedProps, Props>(
  defaultProps({
    noItemsText: 'No expense reports',
    disableFilter: false,
    paginated: false,
    pageSize: 10,
  }),
  mapProps<EnhancedProps, Props>(props => {
    const newProps = {
      ...props,
      renderItem: (item: ExpenseReport, index: number) => (
        <Row key={index} className="expense-list-row">
          <div>
            <Link to={`/expense-report/${item.id}`}>{item.id}</Link>
          </div>
          <div>{parseDate(item.dateSubmitted)}</div>
          <div>
            <Label>
              <Translate text={`expenses.status.${item.status}`} />
            </Label>
          </div>
        </Row>
      ),
    };

    return newProps;
  })
);

export default enhance(ExpenseReportList);

const StyledList = styled(List)`
  border-bottom: #ccc 1px solid;
  border-left: #ccc 1px solid;
  border-right: #ccc 1px solid;
  margin-bottom: 20px;
`;

const Container = styled.div`
  a {
    text-decoration: none;
  }
`;

const Row = styled.div`
  display: flex;

  > div {
    flex: 1;
    padding: 10px;
  }
`;

const Headings = styled(Row)`
  border: #ccc 1px solid;
  font-weight: 700;
`;
