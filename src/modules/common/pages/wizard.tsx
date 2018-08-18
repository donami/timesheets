import React, { Component } from 'react';
import { Column, Row } from '../../ui';
import { Button } from 'genui';
import { toastr } from 'react-redux-toastr';

import styled, { withProps, css } from '../../../styled/styled-components';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import {
  WizardStepOne,
  WizardStepTwo,
  WizardStepThree,
} from '../components/wizard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { setup, checkConfiguration } from '../store/actions';
import WizardComplete from '../components/wizard/complete';
import { validateEmail } from '../../../utils/helpers';

const steps = [
  {
    title: 'Basic Information',
    infoTitle: 'Add Basic Details',
    description:
      'Add details like your name and email for your master admin account which you will be using when configuring the application',
  },
  {
    title: 'First Project',
    infoTitle: 'Setup your first project',
    description: 'You need to setup your first project before finishing',
  },
  {
    title: 'Finish Up',
    infoTitle: 'Finishing touches',
    description:
      'Complete the wizard by filling out the last finishing touches',
  },
];

type State = Readonly<{
  step: number;
  complete: boolean;
  form: {
    1: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      confirmPassword: string;
    };
    2: {
      name: string;
    };
    3: {
      name: string;
    };
  };
}>;

type Props = {
  match: any;
  push: any;
  setup: (data: any) => any;
  checkConfiguration: () => any;
  isConfigured: boolean | undefined;
  checkedConfiguration: boolean;
};

const initialState: State = {
  complete: false,
  step: 1,
  form: {
    1: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    2: { name: '' },
    3: { name: '' },
  },
};

class Wizard extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    this.props.checkConfiguration();

    const { match } = this.props;

    if (match && match.params.step) {
      const step = +match.params.step > steps.length ? 1 : +match.params.step;

      const complete = match.params.step === 'complete';

      this.setState({ step, complete });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { match } = nextProps;

    if (match && match.params.step) {
      const step = +match.params.step > steps.length ? 1 : +match.params.step;
      const complete = match.params.step === 'complete';

      this.setState({ step, complete });
    }
  }

  handleSubmit = () => {
    const { form } = this.state;

    const data = {
      user: form['1'],
      project: form['2'],
      group: form['3'],
    };

    const hasEmptyFields = Object.keys(form).reduce((flag, key) => {
      let value = flag;
      Object.keys(form[key]).forEach(inputFieldKey => {
        if (!form[key][inputFieldKey].length) {
          value = true;
        }
      });

      return value;
    }, false);

    if (hasEmptyFields) {
      toastr.error(
        'Empty fields',
        'You need to fill out all the mandatory fields before proceeding.'
      );
      return;
    }

    if (!validateEmail(form[1].email)) {
      toastr.error(
        'Invalid email address.',
        'The email address provided for the master admin account is not a valid email.'
      );
      return;
    }

    if (form[1].password !== form[1].confirmPassword) {
      toastr.error('Password mismatch.', 'The passwords does not match.');
      return;
    }

    this.props.setup(data);
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>, step: number) => {
    const {
      name,
      value,
    }: { name: keyof State; value: string } = e.target as any;

    this.setState({
      form: {
        ...this.state.form,
        [step]: {
          ...this.state.form[step],
          [name]: value,
        },
      },
    });
  };

  render() {
    const { step, complete } = this.state;
    const { checkedConfiguration, isConfigured } = this.props;

    const numberOfSteps = steps.length;
    const currentStep = steps[step - 1];

    // Should not be able to run wizard if projects already exists
    if (!checkedConfiguration || isConfigured) {
      return null;
    }

    return (
      <Container>
        <Wrapper>
          <Content>
            <Header>Application Setup Wizard</Header>

            <Row>
              {!complete && (
                <Column sm={3}>
                  <>
                    <Steps>
                      {steps.map((item, index) => (
                        <Step
                          key={index}
                          active={step === index + 1 ? 1 : 0}
                          to={`/setup-wizard/step/${index + 1}`}
                        >
                          {index + 1}
                        </Step>
                      ))}
                    </Steps>

                    <Information>
                      <h3>{currentStep.infoTitle}</h3>
                      <p>{currentStep.description}</p>
                    </Information>
                  </>
                </Column>
              )}
              <Column sm={complete ? 12 : 9}>
                <MainContent>
                  <MainTitle>
                    {(currentStep && currentStep.title) || 'Setup Complete!'}
                  </MainTitle>

                  <Switch>
                    <Route
                      path={`/setup-wizard/step/1`}
                      render={props => (
                        <WizardStepOne
                          onInputChange={this.handleInputChange}
                          initialValues={this.state.form[1]}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path={`/setup-wizard/step/2`}
                      render={props => (
                        <WizardStepTwo
                          onInputChange={this.handleInputChange}
                          initialValues={this.state.form[2]}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path={`/setup-wizard/step/3`}
                      render={props => (
                        <WizardStepThree
                          onInputChange={this.handleInputChange}
                          initialValues={this.state.form[3]}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path={`/setup-wizard/step/complete`}
                      render={props => <WizardComplete {...props} />}
                    />
                  </Switch>

                  <Buttons>
                    {step < numberOfSteps && (
                      <Button
                        color="blue"
                        onClick={() =>
                          this.props.push(`/setup-wizard/step/${step + 1}`)
                        }
                      >
                        Next Step
                      </Button>
                    )}
                    {step === numberOfSteps && (
                      <Button color="green" onClick={this.handleSubmit}>
                        Finish
                      </Button>
                    )}
                  </Buttons>
                </MainContent>
              </Column>
            </Row>
          </Content>
        </Wrapper>
      </Container>
    );
  }
}

export default connect(
  (state: any) => ({
    isConfigured: state.common.isConfigured,
    checkedConfiguration: state.common.checkedConfiguration,
  }),
  (dispatch: any) =>
    bindActionCreators(
      {
        checkConfiguration,
        push,
        setup,
      },
      dispatch
    )
)(Wizard);

const Container = styled.div`
  background: rgba(243, 101, 70, 1);
  background: -moz-linear-gradient(
    top,
    rgba(243, 101, 70, 1) 0%,
    rgba(239, 77, 74, 1) 60%,
    rgba(236, 63, 77, 1) 77%,
    rgba(236, 63, 77, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(243, 101, 70, 1)),
    color-stop(60%, rgba(239, 77, 74, 1)),
    color-stop(77%, rgba(236, 63, 77, 1)),
    color-stop(100%, rgba(236, 63, 77, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(243, 101, 70, 1) 0%,
    rgba(239, 77, 74, 1) 60%,
    rgba(236, 63, 77, 1) 77%,
    rgba(236, 63, 77, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(243, 101, 70, 1) 0%,
    rgba(239, 77, 74, 1) 60%,
    rgba(236, 63, 77, 1) 77%,
    rgba(236, 63, 77, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(243, 101, 70, 1) 0%,
    rgba(239, 77, 74, 1) 60%,
    rgba(236, 63, 77, 1) 77%,
    rgba(236, 63, 77, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(243, 101, 70, 1) 0%,
    rgba(239, 77, 74, 1) 60%,
    rgba(236, 63, 77, 1) 77%,
    rgba(236, 63, 77, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f36546', endColorstr='#ec3f4d', GradientType=0 );

  height: 100%;
`;

const Wrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  padding-top: 50px;
`;

const Content = styled.div`
  background: #fff;
  padding: 20px 40px 30px 40px;
  min-height: 500px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
`;

const Header = styled.h1`
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 40px;
  border-bottom: #eee 1px solid;
  padding-bottom: 20px;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const Step = withProps<{ active: number; to: any }, any>(styled(Link))`
  display: flex;
  max-width: 32px;
  border-radius: 500px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  color: #0b7bff;
  cursor: pointer;
  text-decoration: none;

  ${({ active }) =>
    active &&
    css`
      border: 1px solid #0b7bff;
    `};
`;

const Information = styled.div`
  text-align: center;

  h3 {
    margin-bottom: 15px;
    color: #516378;
  }

  p {
    color: #7f92a6;
  }
`;

const Buttons = styled.div`
  text-align: right;
`;

const MainTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 300;
  border-bottom: #eee 1px solid;
  padding-bottom: 10px;
  margin-bottom: 20px;
  margin-top: 0;
`;

const MainContent = styled.div`
  margin-left: 20px;
`;