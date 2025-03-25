
/**
 * 列表页通用返回题
 */
export interface CommonResponse<T> {
    data: T[];
    total: number;
}


export type SelectConfig = {
    label: string;
    column: string;
    errorTip?: string;
    placeholder?: string;
}

interface BaseColummConfig {
    name: string;
    label: string;
    enableSelect: boolean;
    errorTip?: string;
    placeholder?: string;
}

interface SelectColummConfig extends BaseColummConfig {
    selectType: 'select';
    option: SelectOpt[];
}

interface InputColummConfig extends BaseColummConfig {
    selectType: 'input';
}

interface DateColummConfig extends BaseColummConfig {
    selectType: 'date';
}

export type ColummConfig = InputColummConfig | SelectColummConfig | DateColummConfig;

// 列配置
export interface ColumnConfig {
    name: string;
    selectType: string;
    label: string;
    enableSelect: boolean;
}

export class SelectOpt {
    label: string;
    value: string;
}

// 用户列表视图模型
export interface UserVM {
    id: number;
    username: string;
    realName: string;
    role: string;
    enabled: string;
    lastLoginTime: string;
    lastModifiedTime: string;
    lastModifiedBy: string;
}
