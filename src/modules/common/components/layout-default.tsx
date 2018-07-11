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
            <MainContentContainer className="main-content-container">
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
const sidebarWidth = 120;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - ${headerHeight}px);
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: ${headerHeight}px;
`;

const ContentContainer = styled.div`
  width: calc(100% - ${sidebarWidth}px);
  float: left;
  height: 100%;
`;

const MainContentContainer = styled.div`
  min-height: calc(100% - ${footerHeight}px);
`;

const MainContent = styled.div`
  padding: 10px;
`;

const SideBarContainer = styled.div`
  width: ${sidebarWidth}px;
  float: left;
  height: 100%;
`;

const FooterContainer = styled.div`
  height: ${footerHeight}px;
`;

export default LayoutDefault;
