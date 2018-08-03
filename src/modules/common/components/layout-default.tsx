import * as React from 'react';
import styled from 'styled-components';

import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';

class LayoutDefault extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <HeaderContainer className="header-container">
          <Header containerHeight={headerHeight} />
        </HeaderContainer>

        <Wrapper className="wrapper">
          <SideBarContainer className="sidebar-container">
            <Sidebar />
          </SideBarContainer>
          <ContentContainer className="content-container">
            <MainContentContainer>
              <MainContent>{children}</MainContent>
            </MainContentContainer>

            <FooterContainer>
              <Footer containerHeight={footerHeight} />
            </FooterContainer>
          </ContentContainer>
        </Wrapper>
      </React.Fragment>
    );
  }
}

const headerHeight = 80;
const footerHeight = 60;
const sidebarWidth = 150;

const Wrapper = styled.div`
  display: flex;
  min-height: calc(100% - ${headerHeight}px);
  width: 100%;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: ${headerHeight}px;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const MainContentContainer = styled.div`
  min-height: calc(100% - ${footerHeight}px);
`;

const MainContent = styled.div`
  padding: 10px;
`;

const SideBarContainer = styled.div`
  flex: 1;
  max-width: ${sidebarWidth}px;
`;

const FooterContainer = styled.div`
  height: ${footerHeight}px;
`;

export default LayoutDefault;
