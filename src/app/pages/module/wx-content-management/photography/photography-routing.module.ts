import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotographyComponent } from './photography.component';

const routes: Routes = [
    { path: '', component: PhotographyComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PhotographyRoutingModule { }
