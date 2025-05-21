import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NzLayoutModule, NzTableModule, NzGridModule, NzInputModule, NzFormModule, NzButtonModule, NzIconModule, NzInputNumberModule, NzSwitchModule, NzUploadModule } from "ng-zorro-antd";
import { ListComponentModule } from "src/app/pages/component/list/list.component.module";
import { SelectImageModule } from "src/app/pages/component/select-image/select-image.module";
import { PortfolioTagComponent } from "./portfolio-tag.component";
import { PortfolioTagService } from "src/app/pages/services/portfolio-tag.service";
import { PortfolioTagRoutingModule } from "./portfolio-tag-routing.module";


@NgModule({
    imports: [
      PortfolioTagRoutingModule,
      NzLayoutModule,
      NzTableModule,
      NzGridModule,
      NzInputModule,
      NzFormModule,
      CommonModule,
      ReactiveFormsModule,
      NzButtonModule,
      NzIconModule,
      ListComponentModule,
      NzInputNumberModule,
      NzSwitchModule,
      NzUploadModule,
      SelectImageModule
    ],
    declarations: [PortfolioTagComponent],
    exports: [PortfolioTagComponent],
    providers: [PortfolioTagService]
  })
  export class PortfolioTagModule { }