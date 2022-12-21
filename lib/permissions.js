const roles = {
	0: 'admin',
	1: 'quản lí',
	2: 'thu ngân',
	3: 'nhân viên',
	4: 'khách hàng',
};

const permissions = {
	0: {
		read: ['*'],
		write: ['*'],
	},
	1: {
		read: ['*'],
		write: ['*'],
	},
	2: {
		read: ['*'],
		write: ['report', 'wedding'],
	},
	3: {
		read: ['service', 'dish', 'wedding', 'working_shift', 'working_schedule', 'hall'],
	},
	4: {
		read: ['service', 'dish', 'wedding'],
	},
};

const hasPermission = ({ user, resource=null, action='read' }) => {
	if (!user || user.disabled) return false;

	const roleId = (user.roleId === null || user.roleId === undefined) ? 4 : user.roleId;
	const rolePermissions = permissions[roleId] || {};
	const actionPermissions = rolePermissions[action] || [];
	if (actionPermissions.length > 0 && (actionPermissions[0] === '*' || actionPermissions.includes(resource)))
		return true;
	return false;
};

export {
	roles,
	permissions,
	hasPermission,
};