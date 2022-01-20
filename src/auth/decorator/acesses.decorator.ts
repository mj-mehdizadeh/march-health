import { SetMetadata } from '@nestjs/common';

import { UsersRole } from '../../users/users.type';
import { PUBLIC_ROUTE_KEY, ROLES_KEY } from '../auth.constants';

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE_KEY, true);

export const Roles = (...roles: UsersRole[]) => SetMetadata(ROLES_KEY, roles);
