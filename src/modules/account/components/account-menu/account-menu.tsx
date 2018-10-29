import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'genui';

import {
  Container,
  CompanyLogoHolder,
  Navigation,
  NavigationItem,
} from './account-menu.css';

import logo from './company_default_logo.png';

type Props = {
  active: string;
};

const AccountMenu: React.SFC<Props> = ({ active }) => {
  return (
    <Container>
      <CompanyLogoHolder>
        <img src={logo} alt="" />
      </CompanyLogoHolder>
      <div>
        <Navigation>
          <NavigationItem active={active === 'company-settings'}>
            <Link to="/account/company-settings">
              <Icon name="fas fa-cog" />
              Company Settings
            </Link>
          </NavigationItem>
          <NavigationItem active={active === 'integrations'}>
            <Link to="/account/integrations">
              <Icon name="fas fa-link" />
              Integrations
            </Link>
          </NavigationItem>
          <NavigationItem active={active === 'billing'}>
            <Link to="/account/billing">
              <Icon name="fas fa-credit-card" />
              Billing
            </Link>
          </NavigationItem>
        </Navigation>
      </div>
    </Container>
  );
};

export default AccountMenu;
