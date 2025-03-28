import { ValidatorFn, Validators } from "@angular/forms";

/**
 * 列表页通用返回体
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
    errorTip?: string;
    placeholder?: string;
}

export class SelectOpt {
    label: string;
    value: string;
}

export class ButtonConfig {
    color?: string;
    label: string;
    icon?: string;
    disabled?: boolean = false;
    type?: string = 'primary';
    shape?: string;
    event: () => void
}

type InputType = 'text' | 'number' | 'datepicker' | 'checkbox'| 'switch' | 'upload';
export interface ModalFormItem {
    key: string;
    vali?: ValidatorFn;
    label: string;
    type: InputType;
    errorTip?: string;
    placeholder?: string;
    required?: boolean;
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


// 轮播图列表视图模型
export interface CarouselVM {
    id: number;
    imageUuid: string;
    linkUrl: string;
    sortOrder: number;
}