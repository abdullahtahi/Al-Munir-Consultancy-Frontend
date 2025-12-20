import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { intersection as _intersection, split as _split } from 'lodash';

import type { RootState } from 'src/store';

interface AuthorizeComponentProps {
  permission?: string | string[] | undefined;
  children: React.ReactNode;
}

const AuthorizeComponent = ({ permission, children }: AuthorizeComponentProps) => {
  const [render, setRender] = useState(false);
  const selectedDepot = useSelector((state: RootState) => state.depot.selectedDepot);
  const authUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!permission) {
      setRender(true);
      return;
    }

    const { terminals = {} } = authUser;
    const terminalPermissions = terminals[`${selectedDepot?.id}`]?.permissions || [];

    // normalize permission into an array
    const permissionArray = Array.isArray(permission)
      ? permission
      : _split(permission, ',');

    const hasAdminAccess =
      authUser.isSuperAdmin ||
      authUser.isCompanyAdmin ||
      authUser.isShippingLineAdmin ||
      authUser.isTerminalAdmin;

    if (hasAdminAccess) {
      setRender(true);
    } else if (
      permissionArray.length > 0 &&
      _intersection(terminalPermissions, permissionArray).length > 0
    ) {
      setRender(true);
    } else {
      setRender(false);
    }
  }, [authUser, permission, selectedDepot]);

  return render ? children : null;
};

export default AuthorizeComponent;