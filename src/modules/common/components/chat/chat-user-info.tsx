import React from 'react';
import { Query, Mutation } from 'react-apollo';

import { CHAT_USER_INFO_QUERY } from './queries';
import styled from '../../../../styled/styled-components';
import { Avatar } from '../../components';
import { Icon, List } from 'genui';
import { CHAT_USER_INFO_MUTATION } from './mutations';
import { GET_USER } from 'src/modules/users/store/queries';
import Animation from '../../components/animation';
import { Link } from 'react-router-dom';

type Props = {};

const ChatUserInfo: React.SFC<Props> = () => {
  return (
    <Query query={CHAT_USER_INFO_QUERY}>
      {({ data: { chatUserInfo }, loading }) => {
        return (
          <Animation
            isVisible={chatUserInfo && chatUserInfo.open}
            animationIn="slideInRight"
            animationOut="slideOutRight"
          >
            <Container className="chat-user-container">
              {chatUserInfo &&
                chatUserInfo.open && (
                  <Query query={GET_USER} variables={{ id: chatUserInfo.user }}>
                    {({ data: { User }, loading }) => {
                      if (loading) {
                        return null;
                      }
                      return (
                        <>
                          <Top className="chat-user-top">
                            <Mutation mutation={CHAT_USER_INFO_MUTATION}>
                              {mutation => (
                                <span
                                  onClick={() => {
                                    mutation({
                                      variables: {
                                        user: null,
                                        open: false,
                                      },
                                    });
                                  }}
                                >
                                  <Icon name="fas fa-times" />
                                </span>
                              )}
                            </Mutation>
                          </Top>
                          <Presentation className="chat-user-presentation">
                            <Avatar view="xl" avatar={User.image} />

                            <h3>
                              <Link to={`/user/${User.id}`}>{`${
                                User.firstName
                              } ${User.lastName}`}</Link>
                            </h3>
                          </Presentation>
                          <Info>
                            <List>
                              <List.Item>
                                <strong>Name:</strong>{' '}
                                {`${User.firstName} ${User.lastName}`}
                              </List.Item>
                              <List.Item>
                                <strong>Gender:</strong> {User.gender}
                              </List.Item>
                            </List>
                          </Info>
                        </>
                      );
                    }}
                  </Query>
                )}
            </Container>
          </Animation>
        );
      }}
    </Query>
  );
};

export default ChatUserInfo;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  width: 40%;
  z-index: 2;
  border: #eee 1px solid;
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  span {
    font-size: 2em;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Info = styled.div`
  flex: 2;
  justify-content: center;
  padding: 10px;
  text-transform: capitalize;
`;

const Presentation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  border-bottom: #eee 1px solid;
  padding: 10px;

  > * {
    margin-bottom: 20px;
  }

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1.6em;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;
