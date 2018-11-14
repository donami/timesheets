import React from 'react';
import { Input, Button, Select } from 'genui';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import { Form, BackButton, AppToaster } from '../../common';
import { Project } from '../../projects/store/models';
import { CREATE_PROJECT_MEMBER } from '../../../store/mutations';
import { UPDATE_USER } from '../store/mutations';
import { Intent } from '@blueprintjs/core';
import { History } from 'history';
import { UserRole } from '../store/models';

type Props = {
  user: any;
  history: History;
  projects: Project[];
  userProject: Project[];
};
type DataProps = {
  createProjectMember(options: any): any;
  updateUser(options: any): any;
};
type HandlerProps = { onSubmit(model: any): any };
type EnhancedProps = Props & DataProps & HandlerProps;

const EditUser: React.SFC<EnhancedProps> = ({
  user,
  projects,
  userProject,
  onSubmit,
}) => (
  <div>
    <Form onValidSubmit={onSubmit}>
      {formState => (
        <>
          <Form.Field
            name="email"
            label="Email"
            defaultValue={user.email}
            validations={{ isEmail: true, isRequired: true }}
          >
            <Input placeholder="john@email.com" />
          </Form.Field>

          <Form.Field
            name="firstname"
            label="First name"
            defaultValue={user.firstName}
            validations={{ isRequired: true }}
          >
            <Input placeholder="John" />
          </Form.Field>

          <Form.Field
            name="lastname"
            label="Last name"
            defaultValue={user.lastName}
            validations={{ isRequired: true }}
          >
            <Input placeholder="Doe" name="lastname" />
          </Form.Field>

          {user.role !== UserRole.Admin && (
            <Form.Field
              name="project"
              label="Assign to project"
              defaultValue={
                (userProject[0] && userProject[0].id.toString()) || undefined
              }
              validations={{ isRequired: true }}
            >
              <Select
                options={projects.map(project => ({
                  value: project.id,
                  label: project.name,
                }))}
                placeholder="Select Project"
              />
            </Form.Field>
          )}

          <Button type="submit" disabled={!formState.isValid} color="green">
            Save
          </Button>
          <BackButton>Cancel</BackButton>
        </>
      )}
    </Form>
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(CREATE_PROJECT_MEMBER, { name: 'createProjectMember' }),
  graphql(UPDATE_USER, { name: 'updateUser' }),
  withHandlers<EnhancedProps, HandlerProps>({
    onSubmit: ({
      updateUser,
      createProjectMember,
      user,
      userProject,
      history,
    }) => async model => {
      AppToaster.show({
        icon: 'tick',
        message: 'User was updated.',
        intent: Intent.SUCCESS,
      });
      await updateUser({
        variables: {
          id: user.id,
          firstName: model.firstname,
          lastName: model.lastname,
        },
      });

      if (model.project) {
        if (!userProject.find(project => project.id === model.project)) {
          await createProjectMember({
            variables: { userId: user.id, projectId: model.project },
          });
        }
      }

      history.push(`/user/${user.id}`);
    },
  })
);

export default enhance(EditUser);
