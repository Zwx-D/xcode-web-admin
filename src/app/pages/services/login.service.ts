import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectService } from './project.serivce';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private projectService: ProjectService) {}

  login(username: string, password: string): Observable<any> {
    const apiBaseUrl = this.projectService.getBackendConfig().baseUrl;
    const loginUrl = `${apiBaseUrl}/api/backendUser/login`;
    return this.http.post(loginUrl, { username, password });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}    