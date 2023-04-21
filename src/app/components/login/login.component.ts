import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  

  user = {
    username: '',
    password: '',
  }

  constructor(private auth: AuthService){

  }

  login(){
    this.auth.loginToken(this.user);
  }

}
