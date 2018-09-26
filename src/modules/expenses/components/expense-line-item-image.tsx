import React from 'react';
import { API_ENDPOINT_FILE } from '../../../config/constants';

type Props = {
  image: string;
};

// TODO: fix image path
const ExpenseLineItemImage: React.SFC<Props> = ({ image }) => (
  <img src={`${API_ENDPOINT_FILE}/static/uploads/${image}`} alt="" />
);

export default ExpenseLineItemImage;
