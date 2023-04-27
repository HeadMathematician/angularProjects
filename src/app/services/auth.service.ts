import { Router, } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private fbauth: SocialAuthService
  ) {
    let accessToken = this.storageService.get('accessToken');
    let tokenPayload = this.jwtHelper.decodeToken(accessToken);
    if (
      accessToken != null &&
      !this.jwtHelper.isTokenExpired(accessToken)
    ) {
      this.userService.user.username = tokenPayload.userName;
      this.userService.$user.next({ username: tokenPayload.userName });
    }
  }

  apiURL = 'http://localhost:8080/api/authentication';

  getAccessToken() {
    return this.storageService.get('accessToken');
  }

  getRefreshToken() {
    return this.storageService.get('refreshToken');
  }

  loginToken(user: any) {
    return this.http.post(this.apiURL, user).subscribe((response: any) => {
      if (
        response.accessToken != null &&
        response.refreshToken != null &&
        !this.jwtHelper.isTokenExpired(response.accessToken)
      ) {
        console.log(response);

        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        this.storageService.set('accessToken', accessToken);
        this.storageService.set('refreshToken', refreshToken);

        let tokenPayload = this.jwtHelper.decodeToken(accessToken);
        this.userService.$user.next({ username: tokenPayload.userName });

        this.router.navigate(['/departments']);
      }
    });
  }

  isLoggedIn() {
    return this.userService.$user.value.username != '';
  }


  logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate([''])
  }

  signOuFB(): void {
    this.fbauth.signOut();
  }
  
}


