import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NzLayoutModule, NzTableModule, NzGridModule, NzInputModule, NzFormModule, NzButtonModule, NzIconModule, NzUploadModule, NzSwitchModule } from "ng-zorro-antd";
import { ListComponentModule } from "src/app/pages/component/list/list.component.module";
import { PhotographerComponent } from "./photographer.component";
import { PhotographerRoutingModule } from "./photographer-routing.moudle";
import { PhotographerService } from "src/app/pages/services/photographer.service";
import { SelectImageModule } from "src/app/pages/component/select-image/select-image.module";


@NgModule({
  imports: [
    PhotographerRoutingModule,
    NzLayoutModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzFormModule,
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzUploadModule,
    NzSwitchModule,
    SelectImageModule,
    ListComponentModule
  ],
  declarations: [PhotographerComponent],
  exports: [PhotographerComponent],
  providers: [PhotographerService]
})
export class PhotographerModule { }