import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhotographerComponent } from "./photographer.component";


const routes: Routes = [
    { path: '', component: PhotographerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PhotographerRoutingModule { }