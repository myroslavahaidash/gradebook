import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class DefaultGuard implements CanActivate {

  role;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getUserProfile().subscribe(userProfile => {
       this.role = userProfile ? userProfile.role : 'unauthorized';
    });
  }

  canActivate() {
    switch (this.role) {
      case 'admin':
        this.router.navigate(['manage', 'groups']);
        break;

      case 'teacher':
        this.router.navigate(['groups']);
        break;

      case 'student':
        this.router.navigate(['subjects']);
        break;
    }

    return true;
  }

}
