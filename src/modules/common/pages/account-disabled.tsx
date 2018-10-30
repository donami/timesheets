import React from 'react';
import { Button } from 'genui';

import styled from '../../../styled/styled-components';

const AccountDisabled = () => {
  return (
    <Container>
      <Content>
        <h3>Account Disabled</h3>
        <p>
          This account has been disabled. If you are a system administrator and
          this is incorrect please get in touch with us.
        </p>

        <Button to="/auth" color="blue">
          Go back to login
        </Button>
      </Content>
    </Container>
  );
};

export default AccountDisabled;

const Container = styled.div`
  background: #fff;
  width: 980px;
  margin: 60px auto;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(234, 234, 234, 1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(234, 234, 234, 1);
  box-shadow: 0px 0px 10px 0px rgba(234, 234, 234, 1);
`;

const Content = styled.div`
  padding: 20px;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
  }
`;
