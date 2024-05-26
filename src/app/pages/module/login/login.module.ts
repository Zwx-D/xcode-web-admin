import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule, NzInputModule, NzButtonModule, NzCheckboxModule } from "ng-zorro-antd";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: LoginComponent },
];
@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzCheckboxModule 
    ],
    providers: [],
    exports: [LoginComponent]
})
export class LoginModule { }