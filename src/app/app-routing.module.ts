import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'home', loadChildren: () => import('./pages/module/wx-content-management/carousel/carousel.module').then(m => m.CarouselModule) },
  // { path: 'welcome', loadChildren: () => import('./pages/module/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', loadChildren: () => import('./pages/module/login/login.module').then(m => m.LoginModule) },
  { path: 'backend-account', loadChildren: () => import('./pages/module/account/backend-account/backend-accont.module').then(m => m.BackendAccountModule) },
  { path: 'wx-account', loadChildren: () => import('./pages/module/account/wx-account/wx-account.module').then(m => m.WxAccountModule) },
  { path: 'carousel', loadChildren: () => import('./pages/module/wx-content-management/carousel/carousel.module').then(m => m.CarouselModule) },
  { path: 'photography', loadChildren: () => import('./pages/module/wx-content-management/photography/photography.module').then(m => m.PhotographyModule) },
  { path: 'wxHomeFunction', loadChildren: () => import('./pages/module/wx-content-management/function/function.module').then(m => m.FunctionModule) },
  { path: 'portfolio', loadChildren: () => import('./pages/module/wx-content-management/portfolio/portfolio.moudle').then(m => m.PortfolioModule) },
  { path: 'photographer', loadChildren: () => import('./pages/module/wx-content-management/photographer/photographer.moudle').then(m => m.PhotographerModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
