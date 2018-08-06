import React from 'react';
import { Link } from 'react-router-dom';

import { UserRole } from '../../users/store/models';
import HasAccess from './has-access';

type Props = {
  icon: string;
  label: string;
  to: string;
  roles?: UserRole[];
};

const SidebarLink: React.SFC<Props> = ({ icon, label, to, roles }) => {
  const link = (
    <li>
      <Link to={to}>
        <i className={icon} />
        <span>{label}</span>
      </Link>
    </li>
  );

  if (roles) {
    return <HasAccess roles={roles}>{link}</HasAccess>;
  }

  return link;
};

export default SidebarLink;
