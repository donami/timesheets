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
  form: { name: '' },
};

class WizardStepTwo extends Component<Props, State> {
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
        <Field>
          <label>Project name</label>
          <Input
            name="name"
            placeholder="Your Project"
            defaultValue={this.state.form.name}
            onChange={(e: any) => onInputChange(e, 2)}
          />
        </Field>
      </div>
    );
  }
}

export default WizardStepTwo;
