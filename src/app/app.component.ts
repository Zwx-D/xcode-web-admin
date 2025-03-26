import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BackendConfig } from './pages/type/main/config.module';
import { ProjectService } from './pages/services/project.serivce';
import { navigation } from './pages/navigation/navigation';
import { LoginService } from './pages/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isLoginRoute = false;
  backendConfig: BackendConfig;
  userName: string = '';

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router, private projectService: ProjectService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = this.router.url === '/login';
      }
    });
  }
  ngOnInit(): void {
    this.backendConfig = this.projectService.getBackendConfig();
  }
  ngOnDestroy(): void {
  }
}



