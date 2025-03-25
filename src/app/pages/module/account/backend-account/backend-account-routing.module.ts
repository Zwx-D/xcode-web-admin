import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackendAccountComponent } from './backend-account.component';
import { BackendAccountService } from 'src/app/pages/services/backend-account.service';

const routes: Routes = [
  { path: '', component: BackendAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BackendAccountService]
})
export class BackendAccountRoutingModule { }
