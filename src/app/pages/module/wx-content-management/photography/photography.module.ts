import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PhotographyRoutingModule } from "./photography-routing.module";
import { PhotographyComponent } from "./photography.component";
import { PhotographyService } from "src/app/pages/services/photography.service";
import { ListComponentModule } from "src/app/pages/component/list/list.component.module";

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
        NzIconModule,
        ListComponentModule
    ],
    declarations: [PhotographyComponent],
    exports: [PhotographyComponent],
    providers: [PhotographyService]
})
export class PhotographyModule { }