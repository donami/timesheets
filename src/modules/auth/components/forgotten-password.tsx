import React from 'react';
import { Button } from 'genui';
import uuidv4 from 'uuid';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, lifecycle } from 'recompose';

import { SEND_EMAIL } from '../../common/store/mutations';
import { APP_URL } from '../../../config/constants';

type Props = {
  user: any;
};
type DataProps = {
  sendMail(options: any): any;
  createRecoveryCode(options: any): any;
};
type EnhancedProps = Props & DataProps;

const ForgottenPassword: React.SFC<EnhancedProps> = () => (
  <>
    <p>
      An email with a verification link and information on how to reset your
      password has been sent to your email.
    </p>
    <Button to="/" color="green">
      Go Back
    </Button>
  </>
);

const CREATE_RECOVERY_CODE = gql`
  mutation($code: String!, $userId: ID!, $expiresAt: DateTime!) {
    createRecoverCode(userId: $userId, code: $code, expiresAt: $expiresAt) {
      id
      code
    }
  }
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(SEND_EMAIL, { name: 'sendMail' }),
  graphql(CREATE_RECOVERY_CODE, { name: 'createRecoveryCode' }),
  lifecycle<EnhancedProps, {}>({
    componentDidMount() {
      const { user, createRecoveryCode, sendMail } = this.props;

      const code = uuidv4();

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1);

      createRecoveryCode({
        variables: {
          code,
          expiresAt,
          userId: user.id,
        },
      }).then((recoveryCode: any) => {
        sendMail({
          variables: {
            email: user.email,
            subject: 'Forgotten password - Timefly.io',
            body: `
            Hi ${user.firstName}, <br/><br/>
  
            You are receiving this message because you have requested resetting your password on the Timefly site.<br/>
            Please, follow this link to create a new password:<br/><br/>
  
            <a href="${APP_URL}/#/auth/forgotten-password/${
              user.id
            }/${code}" target="_blank">Reset password</a><br/><br/>
  
            If you have not requested resetting your password, you can just delete this email.<br/><br/>
  
            Thank you for using our services,<br/>
            Timefly Team
            `,
          },
        });
      });
    },
  })
);

export default enhance(ForgottenPassword);
