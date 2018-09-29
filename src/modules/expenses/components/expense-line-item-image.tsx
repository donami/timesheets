import React from 'react';
import { API_ENDPOINT_FILE } from '../../../config/constants';

type Props = {
  image: {
    id: string;
    url: string;
    name: string;
  };
};

// TODO: fix image path
const ExpenseLineItemImage: React.SFC<Props> = ({ image }) => (
  <img src={`${image.url}`} alt="" />
);

export default ExpenseLineItemImage;
