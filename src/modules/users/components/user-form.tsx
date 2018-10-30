import React from 'react';
import { Input, Button, Select } from 'genui';

import { Project } from '../../projects/store/models';
import { Form } from '../../common/components/form';
import { BackButton } from '../../common';
import { Group } from '../../groups/store/models';
import { CompanyContext } from '../../common/components/routing';

type Props = {
  onSubmit: (data: any) => any;
  projects: Project[];
  groups: Group[];
};

class UserForm extends React.Component<Props> {
  handleSubmit = (model: any, companyId: string) => {
    const data = {
      ...model,
      companyId,
    };

    delete data.confirmPassword;

    this.props.onSubmit(data);
  };

  render() {
    const { projects, groups } = this.props;

    return (
      <CompanyContext.Consumer>
        {({ company }: any) => (
          <Form onValidSubmit={model => this.handleSubmit(model, company.id)}>
            {formState => (
              <>
                <Form.Field
                  name="email"
                  label="Email"
                  validations={{ isEmail: true, isRequired: true }}
                >
                  <Input placeholder="john@email.com" />
                </Form.Field>

                <Form.Field
                  name="firstname"
                  label="First name"
                  validations={{ isRequired: true }}
                >
                  <Input placeholder="John" />
                </Form.Field>

                <Form.Field
                  name="lastname"
                  label="Last name"
                  validations={{ isRequired: true }}
                >
                  <Input placeholder="Doe" name="lastname" />
                </Form.Field>

                <Form.Field
                  name="password"
                  label="Password"
                  validations={{ isRequired: true }}
                >
                  <Input placeholder="Password" type="password" />
                </Form.Field>

                <Form.Field
                  name="confirmPassword"
                  label="Confirm password"
                  validations={{ isRequired: true, equalsField: 'password' }}
                >
                  <Input placeholder="Password again..." type="password" />
                </Form.Field>

                <Form.Field
                  name="project"
                  label="Assign to project"
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

                <Form.Field
                  name="group"
                  label="Assign to group"
                  validations={{ isRequired: true }}
                >
                  <Select
                    options={groups.map(group => ({
                      value: group.id,
                      label: group.name,
                    }))}
                    placeholder="Select Group"
                  />
                </Form.Field>

                <Button
                  type="submit"
                  disabled={!formState.isValid}
                  color="green"
                >
                  Add
                </Button>
                <BackButton>Cancel</BackButton>
              </>
            )}
          </Form>
        )}
      </CompanyContext.Consumer>
    );
  }
}

export default UserForm;
