import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PhotographyRoutingModule } from "./photography-routing.module";
import { PhotographyComponent } from "./photography.component";

@NgModule({
    imports: [
        PhotographyRoutingModule,
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
    declarations: [PhotographyComponent],
    exports: [PhotographyComponent]
})
export class PhotographyModule { }