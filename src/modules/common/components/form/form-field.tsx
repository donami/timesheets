import React, { Component } from 'react';
import { Field } from 'genui';

import { FormContext } from './form';
import styled, { withProps, css } from '../../../../styled/styled-components';

const withFormContext = (Component: any) => {
  const ComponentWithFormContext: React.SFC<any> = props => {
    return (
      <FormContext.Consumer>
        {context => (
          <Component
            {...props}
            attachToForm={context.attachToForm}
            updateFormValidStatus={context.updateFormValidStatus}
            validate={context.validate}
          />
        )}
      </FormContext.Consumer>
    );
  };

  return ComponentWithFormContext;
};

type Props = {
  attachToForm: (component: any) => any;
  validate: (component: any) => boolean;
  updateFormValidStatus: () => any;
  label?: string;
  validations?: string[];
  name: string;
};
type State = {
  isValid: boolean;
  value: any;
  errors: { [key: string]: string };
  dirty: boolean;
};

const initialState: State = {
  isValid: false,
  dirty: false,
  value: '',
  errors: {},
};

class FormField extends React.Component<Props, State> {
  state = initialState;

  componentWillMount() {
    this.props.attachToForm(this);
  }

  setValue = (e: any) => {
    this.setState({ value: e.target.value, dirty: true }, () =>
      this.props.validate(this)
    );
  };

  getValue = () => this.state.value;

  updateStatus = (newState: any) => {
    this.setState(newState, () => this.props.updateFormValidStatus());
  };

  render() {
    const {
      name,
      children,
      validate,
      updateFormValidStatus,
      attachToForm,
      label,
      ...rest
    } = this.props;
    const { isValid, errors, dirty } = this.state;

    const hasErrors = dirty && Object.keys(errors).length > 0;

    return (
      <Container hasErrors={hasErrors}>
        <Field>
          <>
            {label && <label>{label}</label>}

            {hasErrors && (
              <Errors>
                {Object.keys(errors).map(error => (
                  <div key={error}>* {errors[error]}</div>
                ))}
              </Errors>
            )}

            {React.isValidElement(children) &&
              React.cloneElement(children as any, {
                name,
                onChange: this.setValue,
                ...rest,
              })}
          </>
        </Field>
      </Container>
    );
  }
}

const Container = withProps<{ hasErrors: boolean }, HTMLDivElement>(styled.div)`
  ${({ hasErrors }) =>
    hasErrors &&
    css`
      input,
      input:focus {
        background: #fff6f6;
        border-color: #e0b4b4;
        color: #9f3a38;
      }
    `}
`;

const Errors = styled.div`
  color: #9f3a38;
  margin-bottom: 10px;
`;

export default withFormContext(FormField);
