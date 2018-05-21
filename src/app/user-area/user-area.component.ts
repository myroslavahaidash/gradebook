import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {
  user = {
    name: 'Andrey Ivanov'
  };

  onChangePasswordClick() {
    this.router.navigate(['change_password']);
  }

  onSignOutClick() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

}
