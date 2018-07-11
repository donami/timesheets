import * as React from 'react';

export interface ColumnProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

const Column: React.StatelessComponent<ColumnProps> = ({
  xs,
  sm,
  md,
  lg,
  children,
}) => {
  const classes = [];

  if (xs) {
    classes.push(`col-xs-${xs}`);
  }
  if (sm) {
    classes.push(`col-sm-${sm}`);
  }
  if (md) {
    classes.push(`col-md-${md}`);
  }
  if (lg) {
    classes.push(`col-lg-${lg}`);
  }

  const classname = classes.join(' ');

  return <div className={classname}>{children}</div>;
};

export default Column;
