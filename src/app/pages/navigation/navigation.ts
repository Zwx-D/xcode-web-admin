import { MenuNavigation } from "../type/main/menu-navigation.module";

export const navigation: MenuNavigation[] = [
    {
        title: "小程序内容管理",
        icon: "user",
        type: "group",
        children: [
            {
                title: "轮播图",
                icon: "",
                type: "item",
                url: "carousel"
            },
            {
                title: "摄影作品展示",
                icon: "",
                type: "item",
                url: "photography"
            }
        ]
    },
    {
        title: "用户管理",
        icon: "user",
        type: "group",
        children: [
            {
                title: "后台用户",
                icon: "",
                type: "item",
                url: "backend-account"
            },
            {
                title: "微信用户",
                icon: "",
                type: "item",
                url: "wx-account"
            }
        ]
    }
];