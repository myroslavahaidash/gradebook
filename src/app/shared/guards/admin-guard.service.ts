import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  userProfile;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getUserProfile().subscribe(userProfile => {
      this.userProfile = userProfile;
    });

  }

  canActivate() {
    if (this.userProfile && this.userProfile.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() {
    return this.canActivate();
  }

}
