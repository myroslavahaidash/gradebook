import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  login;
  password;

  onSubmit() {
    this.authService.login(this.login, this.password).subscribe(userProfile => {
      if (!userProfile) {
        return;
      }
      if (userProfile.role === 'student') {
        this.router.navigate(['subjects']);
      } else if (userProfile.role === 'teacher') {
        this.router.navigate(['groups']);
      } else if (userProfile.role === 'admin') {
        this.router.navigate(['manage/groups']);
      }
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
