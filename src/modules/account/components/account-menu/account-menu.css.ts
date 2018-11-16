import styled, { css } from '../../../../styled/styled-components';

export const Container = styled.div`
  background: #fff;
  border: #e8e8e8 1px solid;
  border-radius: 5px;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  display: flex;
  flex-direction: column;
  max-width: 250px;
  min-width: 190px;

  img {
    max-width: 100%;
  }
`;

export const CompanyLogoHolder = styled.div`
  padding: 20px;
`;

export const Navigation = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2em;

  a {
    display: block;
    padding: 10px 15px;

    &:hover {
      background-color: #fafcfd;
      color: #5b9bd1;
    }

    i {
      margin-right: 5px;
    }
  }
`;

export const NavigationItem = styled<{ active?: boolean }, 'li'>('li')`
  border-bottom: 1px solid #f0f4f7;
  border-left: 2px solid transparent;

  ${props => {
    if (props.active) {
      return css`
        border-left: 2px solid #5b9bd1;
      `;
    }
    return null;
  }};
`;
