import { NgModule } from "@angular/core";
import { NzButtonModule, NzDropDownModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule, NzToolTipModule } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
        NzToolTipModule,
        NzDropDownModule,
        FormsModule
    ],
    declarations: [ListComponent],
    exports: [ListComponent]
})
export class ListComponentModule { }