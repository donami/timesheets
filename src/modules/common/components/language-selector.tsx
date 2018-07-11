import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectLanguage } from '../store/actions';
import { getSelectedLanguage } from '../store/selectors';
import Flag from './flag';
import styled from '../../../styled/styled-components';

type Props = {
  language: string;
  selectLanguage(language: string): any;
};

const renderFlag = (
  language: { key: string; value: string },
  current: string,
  callback: (language: string) => void
): JSX.Element => {
  return (
    <Flag
      key={language.key}
      code={language.key}
      language={language.value}
      active={current === language.key}
      onClick={callback}
    />
  );
};

class LanguageSelector extends React.Component<Props> {
  handleClick = (language: string) => {
    if (this.props.language === language) {
      return;
    }

    this.props.selectLanguage(language);
  };

  render() {
    const { language } = this.props;

    const languages = [
      { key: 'en', value: 'English' },
      { key: 'sv', value: 'Swedish' },
    ];

    return (
      <Container>
        {languages.map(flag => renderFlag(flag, language, this.handleClick))}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: getSelectedLanguage(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectLanguage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector);

const Container = styled.div`
  display: flex;

  img {
    align-self: center;
  }
`;
