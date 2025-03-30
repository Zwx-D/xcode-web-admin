import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule, NzToolTipModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";

@NgModule({
    imports: [
        NzLayoutModule,
        NzTableModule,
        NzGridModule,
        NzInputModule,
        NzFormModule,
        CommonModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzIconModule,
        NzToolTipModule
    ],
    declarations: [ListComponent],
    exports: [ListComponent]
})
export class ListComponentModule { }