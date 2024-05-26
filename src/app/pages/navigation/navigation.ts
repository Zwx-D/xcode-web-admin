import { MenuNavigation } from "../type/main/menu-navigation.module";

export const navigation: MenuNavigation[] = [
    {
        title: "用户管理",
        icon: "user",
        type: "group",
        children: [
            {
                title: "后台用户",
                icon: "",
                type: "item",
                url: "/welcome"
            }
        ]
    }
];