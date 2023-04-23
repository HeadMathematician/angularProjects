import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  userFB:any;
  loggedIn:any;
  user = {
    username: '',
    password: '',
  }

  constructor(private auth: AuthService, private fbauth: SocialAuthService, private http: HttpClient){

  }

  ngOnInit() {
    this.fbauth.authState.subscribe((userFB) => {
      this.userFB = userFB;
      console.log(this.userFB);
      this.loggedIn = (userFB != null);
    });
  }
 
  signInWithFB(): void {
    this.fbauth.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        const accessToken = user.authToken;
        console.log('this is access token: ' + accessToken);
        this.http.get('http://localhost:8080/api/auth/facebook/callback', { params: { accessToken: accessToken } }).subscribe(response => {
          console.log('Backend response:', response);
        });
      })
      .catch(error => {
        console.log('Facebook login error:', error);
      });
  }
  

  login(){
    this.auth.loginToken(this.user);
  }

  signOutFB(){
    this.fbauth.signOut();
  }

  
}
