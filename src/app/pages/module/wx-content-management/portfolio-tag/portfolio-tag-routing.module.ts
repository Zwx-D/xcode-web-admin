import { RouterModule, Routes } from "@angular/router";
import { PortfolioTagComponent } from "./portfolio-tag.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: PortfolioTagComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PortfolioTagRoutingModule { }