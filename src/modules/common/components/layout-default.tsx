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
        <Wrapper className="wrapper">
          <SideBarContainer className="sidebar-container">
            <Sidebar />
          </SideBarContainer>
          <ContentContainer className="content-container">
            <HeaderContainer className="header-container">
              <Header containerHeight={headerHeight} />
            </HeaderContainer>

            <MainContentContainer className="main-content-container">
              <MainContent className="main-content">{children}</MainContent>
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

const headerHeight = 60;
const footerHeight = 60;
const sidebarWidth = 200;

const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
  background: #f8f9fd;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: ${headerHeight}px;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const MainContentContainer = styled.div`
  min-height: calc(100% - ${footerHeight + headerHeight}px);
`;

const MainContent = styled.div`
  padding: 20px;
  position: relative;
`;

const SideBarContainer = styled.div`
  flex: 1;
  max-width: ${sidebarWidth}px;
`;

const FooterContainer = styled.div`
  height: ${footerHeight}px;
`;

export default LayoutDefault;
