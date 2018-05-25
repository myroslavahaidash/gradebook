import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  email;

  onSubmit() {
    console.log(this.email);
    this.authService.resetPassword(this.email);
  }

  ngOnInit() {
  }

}
