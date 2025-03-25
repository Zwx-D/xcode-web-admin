import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const { userName, password } = this.validateForm.value;
      this.loginService.login(userName, password).subscribe(
        (response) => {
          if (response && response.token) {
            this.loginService.setToken(response.token);
            console.log(this.loginService.getToken());
            this.route.navigate(['/home']);
          } else {
            console.error('未返回有效的 token');
          }
        },
        (error) => {
          console.error('登录请求失败:', error);
        }
      );
    }
  }

  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
