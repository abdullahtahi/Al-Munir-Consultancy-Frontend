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
  const authUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!permission) {
      setRender(true);
      return;
    }

    const directPermissions = authUser?.data?.permissions || [];
    // Combine permissions from direct user permissions and terminal specific permissions
    const userPermissions = [...new Set(directPermissions.map((p: any) => p.permission))];

    // normalize permission into an array
    const permissionArray = Array.isArray(permission)
      ? permission
      : _split(permission, ',');

    const hasAdminAccess =
      authUser?.data?.role=="super_admin"
      
    if (hasAdminAccess) {
        setRender(true);
      } else if (
        permissionArray.length > 0 &&
        _intersection(userPermissions, permissionArray).length > 0
      ) {
      
      setRender(true);
    } else {
      setRender(false);
    }
  }, [authUser, permission]);
  return render ? children : null;
};

export default AuthorizeComponent;