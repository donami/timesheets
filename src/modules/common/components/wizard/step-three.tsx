import React, { Component } from 'react';
import { Button, Input, Field } from 'genui';

type State = Readonly<{
  form: {
    name: string;
  };
}>;

type Props = {
  initialValues?: any;
  onInputChange: (e: any, step: number) => any;
};

const initialState: State = {
  form: {
    name: '',
  },
};

class WizardStepThree extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    const { initialValues } = this.props;

    if (initialValues) {
      this.setState({ form: initialValues });
    }
  }

  render() {
    const { onInputChange } = this.props;

    return (
      <div>
        <p>
          Your project needs a group, which will be used when configuring time
          templates. Create a group by filling out the name below.
        </p>
        <Field>
          <label>Group Name</label>
          <Input
            name="name"
            placeholder="Group name"
            defaultValue={this.state.form.name}
            onChange={(e: any) => onInputChange(e, 3)}
          />
        </Field>
      </div>
    );
  }
}

export default WizardStepThree;
