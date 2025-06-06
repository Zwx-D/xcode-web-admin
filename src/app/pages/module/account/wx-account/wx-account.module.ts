import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { WxAccountComponent } from "./wx-account.component";
import { WxAccountRoutingModule } from "./wx-account-routing.module";
import { ListComponentModule } from "src/app/pages/component/list/list.component.module";
import { WxAccountService } from "src/app/pages/services/wx-account.service";

@NgModule({
    imports: [
        WxAccountRoutingModule,
        NzLayoutModule,
        NzTableModule,
        NzGridModule,
        NzInputModule,
        NzFormModule,
        CommonModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzIconModule,
        ListComponentModule
    ],
    declarations: [WxAccountComponent],
    exports: [WxAccountComponent],
    providers: [WxAccountService]
})
export class WxAccountModule { }