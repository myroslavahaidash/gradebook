import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  userProfile;

  constructor(
    private authService: AuthService
  ) {
    this.authService.getUserProfile().subscribe(userProfile => {
      this.userProfile = userProfile;
    });

  }

  canActivate() {
    return this.userProfile && this.userProfile.role === 'admin';
  }

  canActivateChild() {
    return this.canActivate();
  }

}
