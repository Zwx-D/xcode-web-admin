import { navigation } from "../../navigation/navigation";
import { MenuNavigation } from "./menu-navigation.module";

export class BackendConfig {
    systemName: string = '系统';
    systemBarImg: string = '';
    bar: MenuNavigation[] = navigation;
}
