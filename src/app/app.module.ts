import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, NzModalService, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ProjectService } from './pages/services/project.serivce';
import { TokenInterceptor } from './pages/services/token.interceptor';
import { LoginService } from './pages/services/login.service';
import { ListComponentModule } from './pages/component/list/list.component.module';
import { ModalFormModule } from './pages/component/modal-form/modal-form.module';
import { UploadService } from './pages/services/files.service';


registerLocaleData(zh);



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ListComponentModule,
    ModalFormModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    ProjectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LoginService,
    NzModalService,
    UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
