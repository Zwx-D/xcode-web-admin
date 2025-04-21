import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PortfolioComponent } from "./portfolio.component";
import { PortfolioDetailComponent } from "./detail/detail.component";


const routes: Routes = [
    { path: '', component: PortfolioComponent },
    { path: 'detail', component: PortfolioDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PortfolioRoutingModule { }