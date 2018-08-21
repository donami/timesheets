import React from 'react';
import { Icon, StatusColor } from 'genui';

import styled from '../../../../styled/styled-components';
import { Select } from '../../../common';

type Props = {
  onChange(value: any): any;
  options: { label: any; value: any }[];
  label: string;
  placeholder?: string;
};

const TableFilter: React.SFC<Props> = ({
  label,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <Container>
      <Label>{label}: </Label>

      <Select
        options={options}
        onChange={onChange}
        placeholder={placeholder || undefined}
      />
    </Container>
  );
};

export default TableFilter;

const Container = styled.div`
  display: inline-block;
  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const Label = styled.div`
  display: inline-block;
  margin-right: 10px;
  text-transform: uppercase;
  font-weight: 300;
`;

// const TableFilter: React.SFC<Props> = () => {
//   return (
//     <Container>
//       <Label>Status: </Label>

//       <Selector>
//         <StatusColor />
//         All
//         <Icon name="fas fa-chevron-down" />
//       </Selector>
//     </Container>
//   );
// };

// export default TableFilter;

// const Container = styled.div`
//   display: inline-block;

//   i {
//     margin-left: 10px;
//     opacity: 0.5;
//   }
// `;

// const Label = styled.div`
//   display: inline-block;
//   margin-right: 10px;
//   text-transform: uppercase;
//   font-weight: 300;
// `;

// const Selector = styled.div`
//   background: #f0f4f5;
//   padding: 10px 20px;
//   border-radius: 20px;

//   display: inline-block;

//   > div {
//     margin-right: 10px;
//   }
// `;
