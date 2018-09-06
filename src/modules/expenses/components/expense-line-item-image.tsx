import React from 'react';
import { STATICS_URL } from '../../../config/constants';

type Props = {
  image: string;
};

const ExpenseLineItemImage: React.SFC<Props> = ({ image }) => (
  <img src={`${STATICS_URL}/static/uploads/${image}`} alt="" />
);

export default ExpenseLineItemImage;
