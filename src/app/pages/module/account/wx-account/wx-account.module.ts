import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { WxAccountComponent } from "./wx-account.component";
import { WxAccountRoutingModule } from "./wx-account-routing.module";

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
        NzIconModule
    ],
    declarations: [WxAccountComponent],
    exports: [WxAccountComponent]
})
export class WxAccountModule { }