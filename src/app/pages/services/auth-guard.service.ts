// xcode-web-admin/src/app/pages/services/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const token = this.loginService.getToken();
        if (token && !this.loginService.isTokenExpired(token)) {
            return true;
        } else { 
            this.loginService.logout();
            this.router.navigate(['/login']);
            return false;
        }
    }
}