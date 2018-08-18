import React from 'react';

import { Loader } from '../../ui';

const withLoading = (Component: any): React.SFC<any> => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) return <Component {...props} />;
    return <Loader />;
  };
};

export default withLoading;
