import styled from '../../../styled/styled-components';

export const Container = styled.div`
  display: flex;
`;

export const ContentWrapper = styled.div`
  margin-left: 10px;
  width: 100%;
`;

export const Content = styled.div`
  background: #fff;
  border: #e8e8e8 1px solid;
  border-radius: 5px;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  margin-bottom: 10px;
`;

export const ContentTitle = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eef1f5;
  font-size: 1.2em;
  font-weight: 300;
  text-transform: uppercase;
  color: ${props => props.theme.primaryColor};

  i {
    margin-right: 5px;
  }
`;

export const ContentBody = styled.div`
  padding: 10px;
`;
