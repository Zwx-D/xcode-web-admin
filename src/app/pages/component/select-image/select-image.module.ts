import { NgModule } from "@angular/core";
import { NzButtonModule, NzCheckboxModule, NzDatePickerModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzInputNumberModule, NzLayoutModule, NzMessageModule, NzModalModule, NzPaginationModule, NzPopoverModule, NzRadioModule, NzSelectModule, NzSwitchModule, NzTableModule, NzToolTipModule, NzUploadModule } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SelectImageComponent } from "./select-image.component";

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
        NzModalModule,
        NzInputNumberModule,
        NzCheckboxModule,
        NzDatePickerModule,
        NzRadioModule,
        NzSelectModule,
        NzSwitchModule,
        NzUploadModule,
        FormsModule,
        NzPaginationModule,
        NzMessageModule,
        NzToolTipModule,
        NzPopoverModule 
        // NzSpaceModule
    ],
    declarations: [SelectImageComponent],
    exports: [SelectImageComponent],
    entryComponents: [SelectImageComponent]
})
export class SelectImageModule { }