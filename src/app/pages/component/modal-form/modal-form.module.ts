import { NgModule } from "@angular/core";
import { NzButtonModule, NzCheckboxModule, NzDatePickerModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzInputNumberModule, NzLayoutModule, NzModalModule, NzRadioModule, NzSelectModule, NzSwitchModule, NzTableModule, NzUploadModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ModalFormComponent } from "./modal-form.component";
import { SelectImageModule } from "../select-image/select-image.module";

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
        SelectImageModule
    ],
    declarations: [ModalFormComponent],
    exports: [ModalFormComponent],
    entryComponents: [ModalFormComponent]
})
export class ModalFormModule { }