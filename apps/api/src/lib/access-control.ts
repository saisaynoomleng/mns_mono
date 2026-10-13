import { createAccessControl } from 'better-auth/plugins/access';

const statement = {
  user: [
    'create',
    'list',
    'set-role',
    'ban',
    'impersonate',
    'impersonate-admins',
    'delete',
    'set-password',
    'set-email',
    'get',
    'update',
  ],
  session: ['list', 'revoke', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  user: ['create'],
});

export const admin = ac.newRole({
  user: [
    'create',
    'list',
    'set-role',
    'ban',
    'impersonate',
    'set-password',
    'set-email',
    'delete',
  ],
  session: ['revoke', 'list'],
});

export const super_admin = ac.newRole({
  user: [
    'create',
    'list',
    'set-role',
    'ban',
    'impersonate',
    'impersonate-admins',
    'delete',
    'set-password',
    'set-email',
    'get',
    'update',
  ],
  session: ['list', 'revoke', 'delete'],
});
