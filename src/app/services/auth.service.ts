import { Router, } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService,
    private jwtHelper: JwtHelperService,
    private router: Router
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
        console.log(tokenPayload);
        // this.userService.user.username = tokenPayload.username;

        this.userService.$user.next({ username: tokenPayload.userName });

        // console.log((this.userService.user.username = tokenPayload.username));

        this.router.navigate(['/dashboard']);
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
  
}


