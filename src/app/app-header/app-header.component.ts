import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  userProfile;

  getUserProfile() {
    this.authService.getUserProfile().subscribe(userProfile => {
      console.log(userProfile);
      this.userProfile = userProfile;
    });
  }

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }
}
