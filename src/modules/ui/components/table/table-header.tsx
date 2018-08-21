import React from 'react';

type Props = {};

const TableHeader: React.SFC<Props> = ({ children }) => {
  return <thead>{children}</thead>;
};

export default TableHeader;
