import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  constructor(private apiService: ApiService, private router:Router, 
    private auth:AuthService, private fbauth: SocialAuthService){

  }

  
goToDepartments(){
  this.router.navigate(['/departments'])
}

goToEmployees(){
  this.router.navigate(['/employees']);
}

goToDashboard(){
  this.router.navigate(['dasboard']);
}

goToUsers(){
  this.router.navigate(['/users']);
}
  

logout(){
  this.auth.logout()
}

signOut(){
  this.fbauth.signOut();
}

}
