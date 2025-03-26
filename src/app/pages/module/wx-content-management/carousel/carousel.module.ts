import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CarouselComponent } from "./carousel.component";
import { CarouselRoutingModule } from "./carousel-routing.module";
import { CarouselService } from "src/app/pages/services/carousel.service";
import { ListComponentModule } from "src/app/pages/component/list/list.component.module";

@NgModule({
    imports: [
        CarouselRoutingModule,
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
    declarations: [CarouselComponent],
    exports: [CarouselComponent],
    providers: [CarouselService]
})
export class CarouselModule { }