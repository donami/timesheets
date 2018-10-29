import React from 'react';
import { Icon } from 'genui';

import {
  Content,
  ContentTitle,
  ContentBody,
} from '../../pages/account-page.css';
import { Company } from '../../store/types';

type Props = {
  user: any;
  company: Company;
};

const Integrations: React.SFC<Props> = () => {
  return (
    <Content>
      <ContentTitle>
        <Icon name="fas fa-link" />
        Integrations
      </ContentTitle>
      <ContentBody>
        <em>Feature coming soon...</em>
      </ContentBody>
    </Content>
  );
};

export default Integrations;
