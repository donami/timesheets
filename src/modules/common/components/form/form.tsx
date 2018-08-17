import React, { Component } from 'react';

import FormField from './form-field';
import { validationRules, validationRuleMessages } from './validation-rules';

export const FormContext = React.createContext({
  attachToForm: (component: any) => {},
  validate: (component: any) => {},
  updateFormValidStatus: () => {},
});

type Props = {
  children(props: any): JSX.Element;
  onValidSubmit?: (values: { [key: string]: string }) => any;
} & React.HTMLProps<HTMLFormElement>;

type State = {
  isValid: boolean;
};

const initialState: State = {
  isValid: false,
};

class Form extends Component<Props, State> {
  state = initialState;

  static Field = FormField;

  inputs: any[];

  constructor(props: any) {
    super(props);

    this.inputs = [];
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    const values = this.getCurrentValues();

    this.props.onValidSubmit && this.props.onValidSubmit(values);
  };

  onAttachToForm = (component: any) => {
    if (this.inputs.indexOf(component) === -1) {
      this.inputs.push(component);
    }

    this.validateForm();
  };

  getCurrentValues() {
    return this.inputs.reduce((acc, component) => {
      const { name } = component.props;

      return {
        ...acc,
        [name]: component.state.value,
      };
    }, {});
  }

  getValidationMessage(methodName: string, arg: string): string {
    if (typeof validationRuleMessages[methodName] === 'string') {
      return validationRuleMessages[methodName];
    }

    if (typeof validationRuleMessages[methodName] === 'function') {
      return validationRuleMessages[methodName](arg);
    }

    // If no validation message was found, return default message
    return 'Invalid value provided';
  }

  runValidations(component: any) {
    const validations = component.props.validations || [];
    const value = component.getValue();
    const currentValues = this.getCurrentValues();

    const errors = {};

    Object.keys(validations).forEach(validationMethod => {
      const invokableMethod = validationRules[validationMethod];
      const arg = validations[validationMethod];

      if (typeof invokableMethod !== 'function') {
        throw new Error(`Validation rule: ${validationMethod} does not exist.`);
      }

      const passed = invokableMethod.apply(this, [currentValues, value, arg]);

      if (passed === false) {
        errors[validationMethod] = this.getValidationMessage(
          validationMethod,
          arg
        );
      }
    });

    return errors;
  }

  validateField = (component: any) => {
    const errors = this.runValidations(component);

    component.updateStatus({
      errors,
      isValid: Object.keys(errors).length === 0,
    });
  };

  updateFormValidStatus = () => {
    if (this.inputs) {
      const formIsValid = this.inputs.every(
        component => component.state.isValid
      );

      this.setState({
        isValid: formIsValid,
      });
    }
  };

  validateForm = () => {
    this.inputs.forEach(component => {
      this.validateField(component);
    });
  };

  render() {
    const { children, onValidSubmit, ...rest } = this.props;

    return (
      <form {...rest} onSubmit={this.handleSubmit}>
        <FormContext.Provider
          value={{
            attachToForm: this.onAttachToForm,
            validate: this.validateField,
            updateFormValidStatus: this.updateFormValidStatus,
          }}
        >
          {children && children({ isValid: this.state.isValid })}
        </FormContext.Provider>
      </form>
    );
  }
}

export default Form;
