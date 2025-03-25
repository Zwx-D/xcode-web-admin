// models.ts
// 用户模型
export interface User {
    createdBy: string;
    createdTime: string;
    lastModifiedBy: string;
    lastModifiedTime: string;
    uuid: string;
    id: number;
    username: string;
    password: string;
    realName: string;
    email: string | null;
    phone: string | null;
    enabled: boolean;
    lastLoginTime: string;
    roles: Role[];
}

// 角色模型
export interface Role {
    createdBy: string;
    createdTime: string;
    lastModifiedBy: string;
    lastModifiedTime: string;
    uuid: string;
    id: number;
    roleName: string;
    roleCode: string;
    description: string;
    isSuperAdmin: boolean;
    permissions: any[];
}



