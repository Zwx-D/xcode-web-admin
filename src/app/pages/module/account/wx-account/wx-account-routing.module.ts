import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WxAccountComponent } from './wx-account.component';

const routes: Routes = [
    { path: '', component: WxAccountComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class WxAccountRoutingModule { }
