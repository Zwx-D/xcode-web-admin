import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { path: 'welcome', loadChildren: () => import('./pages/module/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', loadChildren: () => import('./pages/module/login/login.module').then(m => m.LoginModule) },
  { path: 'backend-account', loadChildren: () => import('./pages/module/account/backend-account/backend-accont.module').then(m => m.BackendAccountModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
