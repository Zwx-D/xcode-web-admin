export class MenuNavigation {
    title: string;
    icon?: string;
    type: 'group' | 'item';
    url?: string;
    children?: MenuNavigation[];
}