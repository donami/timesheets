import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Select } from 'genui';
import { bindActionCreators } from 'redux';

import { User, UserRole } from '../store/models';
import { Form, BackButton } from '../../common';
import { getProjects } from '../../projects/store/selectors';
import { updateUser } from '../store/actions';

type Props = {
  user: User;
  updateUser(userId: number, data: any): any;
};

class EditUserStatus extends Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
    };

    this.props.updateUser(this.props.user.id, data);
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <Form onValidSubmit={this.handleSubmit}>
          {formState => (
            <>
              <Form.Field
                name="role"
                label="User type"
                defaultValue={user.role}
                validations={{ isRequired: true }}
              >
                <Select
                  options={[
                    { value: UserRole.User, label: 'User' },
                    { value: UserRole.Manager, label: 'Manager' },
                    { value: UserRole.Admin, label: 'Admin' },
                  ]}
                  placeholder="User Type"
                />
              </Form.Field>

              <Button type="submit" disabled={!formState.isValid} color="green">
                Save
              </Button>
              <BackButton>Cancel</BackButton>
            </>
          )}
        </Form>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({ projects: getProjects(state) }),
  (dispatch: any) => bindActionCreators({ updateUser }, dispatch)
)(EditUserStatus);
