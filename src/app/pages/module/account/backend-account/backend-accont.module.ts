import { NgModule } from "@angular/core";
import { BackendAccountComponent } from "./backend-account.component";
import { BackendAccountRoutingModule } from "./backend-account-routing.module";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        BackendAccountRoutingModule,
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
    declarations: [BackendAccountComponent],
    exports: [BackendAccountComponent]
})
export class BackendAccountModule { }