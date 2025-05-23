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
    label?: string;
    width?: number;
    enableSelect?: boolean;
    selectType?: string;
    selectValue?: string | number;
    errorTip?: string;
    placeholder?: string;
    isImg?: boolean;
    canSort?: boolean;
    isBtn?: boolean;
    btnConfig?: ButtonConfig[];
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
    event: (event) => void
}

type InputType = 'text' | 'number' | 'datepicker' | 'checkbox' | 'switch' | 'upload' | 'select';
export interface ModalFormItem {
    key: string;
    vali?: ValidatorFn;
    label: string;
    type: InputType;
    errorTip?: string;
    placeholder?: string;
    required?: boolean;
    options?: Options[];
}
export interface Options {
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

// 用户列表视图模型
export interface WechatUserVM {
    id: number;
    nickName: string;
    openId: string;
    unionId: string;
    lastLoginTime: string;
    loginIp: string;
    os: string;
    lastModifiedTime: string;
    lastModifiedBy: string;
}


// 轮播图列表视图模型
export interface CarouselVM {
    uuid: string;
    id: number;
    imageUuid: string;
    linkUrl: string;
    sortOrder: number;
    isShow: boolean;
    isShowTxt?: String;
}

// 摄影作品展示列表视图模型
export interface PhotographyVM {
    uuid: string;
    id: number;
    imageUuid: string;
    linkUrl: string;
    sortOrder: number;
    desc: string;
    isShow: boolean;
    isShowTxt?: String;
}

// 摄影作品集列表视图模型
export interface PortfolioVM {
    uuid: string;
    id: number;
    name: string;
    imageUuid: string;
    linkUrl: string;
    sortOrder: number;
    desc: string;
    isShow: boolean;
    isShowTxt?: string;
    typeTag?: string;
    portfolioItemList?: PortfolioItemVM[];
}

// 摄影作品集详情中的作品项列表视图模型
export interface PortfolioItemVM {
    uuid: string;
    id: number;
    name: string;
    imageUuid: string;
    linkUrl: string;
    sortOrder: number;
    desc: string;
    isShow: boolean;
    isShowTxt?: String;
}

export interface PortfolioTagVM {
    uuid: string;
    id: number;
    name: string;
    desc: string;
}

export interface FunctionVM {
    uuid: string;
    id: number;
    imageUuid: string;
    linkUrl: string;
    sortOrder: number;
    desc: string;
    route: string;
    isShow: boolean;
    isShowTxt?: String;
}


export class ListQueryParams {
    page: number = 0;
    size: number = 10;
    sort?: string;
    [key: string]: any;
    // [key: string]: FieldFilter | FieldFilter[] | string | number | undefined;  
}


type QueryOperator = 'equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';

interface FieldFilter {
    operator: QueryOperator;  // 查询操作符
    value: string | number | boolean | any[];  // 查询的值
}