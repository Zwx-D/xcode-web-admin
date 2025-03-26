import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from './project.serivce';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tokenKey = 'auth_token';
  private realNameKey = 'realName';


  constructor(private http: HttpClient, private projectService: ProjectService) { }

  login(username: string, password: string): Promise<any> {
    const apiBaseUrl = this.projectService.getBackendConfig().baseUrl;
    const loginUrl = `${apiBaseUrl}/api/backendUser/login`;
    return this.http.post(loginUrl, { username, password }).toPromise();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setRealName(realName: string): void {
    localStorage.setItem(this.realNameKey, realName);
  }

  getRealName(): string | null {
    return localStorage.getItem(this.realNameKey);
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }
    const payload = this.parseJwt(token);
    if (!payload || !payload.exp) {
      return true;
    }
    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate < new Date();
  }

  parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('解析 JWT 时出错:', error);
      return null;
    }
  }
}    