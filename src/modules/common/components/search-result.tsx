import React from 'react';
import { Link } from 'react-router-dom';
import { StatusColor } from 'genui';

import styled from '../../../styled/styled-components';
import Avatar from './avatar';
import { User } from '../../users/store/models';
import { parseDate } from '../../../utils/helpers';

type Props = {
  item: User;
};

const SearchResult: React.SFC<Props> = ({ item }) => {
  return (
    <Container>
      <LeftNode>
        <Avatar avatar={item.image} view="lg" />
      </LeftNode>
      <RightNode>
        <StatusWrapper className="status-wrapper">
          <StatusColor positive={!item.disabled} negative={item.disabled} />
        </StatusWrapper>
        <h3>
          <Link to={`/user/${item.id}`}>{`${item.firstName} ${
            item.lastName
          }`}</Link>
        </h3>
        <div>
          Member since: <em>{parseDate(item.createdAt)}</em>
        </div>
      </RightNode>
    </Container>
  );
};

export default SearchResult;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;

  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
`;
const LeftNode = styled.div`
  flex: 1;
  max-width: 100px;
`;
const RightNode = styled.div`
  flex: 3;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    margin-top: 0;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const StatusWrapper = styled.div`
  float: right;
`;
