import { NgModule } from "@angular/core";
import { PortfolioRoutingModule } from "./portfolio-routing.moudle";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NzLayoutModule, NzTableModule, NzGridModule, NzInputModule, NzFormModule, NzButtonModule, NzIconModule, NzTypographyModule, NzInputNumberModule, NzSwitchModule, NzUploadModule } from "ng-zorro-antd";
import { ListComponentModule } from "src/app/pages/component/list/list.component.module";
import { PortfolioComponent } from "./portfolio.component";
import { PortfolioService } from "src/app/pages/services/portfolio.service";
import { PortfolioDetailComponent } from "./detail/detail.component";
import { SelectImageModule } from "src/app/pages/component/select-image/select-image.module";


@NgModule({
  imports: [
    PortfolioRoutingModule,
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
  declarations: [PortfolioComponent, PortfolioDetailComponent],
  exports: [PortfolioComponent],
  providers: [PortfolioService]
})
export class PortfolioModule { }