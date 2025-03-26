import { NgModule } from "@angular/core";
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzTableModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CarouselComponent } from "./carousel.component";
import { CarouselRoutingModule } from "./carousel-routing.module";

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
        NzIconModule
    ],
    declarations: [CarouselComponent],
    exports: [CarouselComponent]
})
export class CarouselModule { }