import * as React from 'react';

export interface RowProps {}

const Row: React.StatelessComponent<RowProps> = ({ children }) => (
  <div className="row">{children}</div>
);

export default Row;
