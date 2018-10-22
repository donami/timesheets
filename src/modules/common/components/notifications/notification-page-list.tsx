import React from 'react';
import styled, { withProps } from '../../../../styled/styled-components';
import { dateFormat } from '../../../../utils/calendar';
import { Icon } from 'genui';

type Props = {
  notifications: any[];
  onLoadMore: any;
  totalCount: number;
};

const NotificationPageList: React.SFC<Props> = ({
  notifications,
  onLoadMore,
  totalCount,
}) => {
  return (
    <>
      {notifications.map((notification: any) => (
        <Item key={notification.id} unread={notification.unread}>
          <IconItem>
            <Icon name={notification.icon} size="2x" />
          </IconItem>
          <DescriptionItem>{notification.message}</DescriptionItem>
          <MetaItem>
            {dateFormat(notification.createdAt, 'MMM D, HH:mm')}
          </MetaItem>
        </Item>
      ))}

      {totalCount > notifications.length && (
        <LoadMoreItem
          disabled={totalCount <= notifications.length}
          onClick={onLoadMore}
        >
          Load more...
        </LoadMoreItem>
      )}
    </>
  );
};

export default NotificationPageList;

const Item = withProps<{ unread?: boolean }>(styled.div)`
  display: flex;
  border-bottom: #e8e8e8 1px solid;
  padding: 20px;
  align-items: center;

  background: ${({ unread }) => (unread ? '#f7f5fc' : '#fff')};
`;

const IconItem = styled.div`
  flex: 1;
  max-width: 10%;
`;
const DescriptionItem = styled.div`
  flex: 1;
`;
const MetaItem = styled.div`
  flex: 1;
  text-align: right;
  color: #b0b4bb;
  font-size: 0.8em;
`;

const LoadMoreItem = styled.button`
  text-align: center;
  padding: 20px;
  display: block;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 300;

  background: none;
  border: none;
  width: 100%;
  display: block;
  color: ${props => props.theme.primaryColor};

  &:hover {
    background: #f7f5fc;
  }
`;
