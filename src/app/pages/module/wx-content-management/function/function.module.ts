import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FunctionRoutingModule } from "./function-routing.module";
import { FunctionComponent } from "./function.component";
import { ListComponentModule } from "src/app/pages/component/list/list.component.module";
import { FunctionService } from "src/app/pages/services/function.service";

@NgModule({
    imports: [
        FunctionRoutingModule,
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
    declarations: [FunctionComponent],
    exports: [FunctionComponent],
    providers: [FunctionService]
})
export class FunctionModule { }