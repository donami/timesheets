import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {
  attention?: boolean;
};

const TableRow: React.SFC<Props> = ({ attention, children, ...rest }) => {
  const cells = React.Children.map(children, child => {
    return React.cloneElement(child as any, {
      attention: typeof attention === 'undefined' ? true : attention,
      ...rest,
    });
  });

  return <Row>{cells}</Row>;
};

export default TableRow;

const Row = styled.tr``;
