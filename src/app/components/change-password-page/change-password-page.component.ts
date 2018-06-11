import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  oldPassword;
  newPassword;

  onSubmit() {
    this.authService.changePassword(this.oldPassword, this.newPassword);
    this.oldPassword = '';
    this.newPassword = '';
  }

  ngOnInit() {
  }

}
