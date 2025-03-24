import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackendAccountComponent } from './backend-account.component';

const routes: Routes = [
  { path: '', component: BackendAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendAccountRoutingModule { }
