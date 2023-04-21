import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { UsersComponent } from './components/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { DepartmentDialogComponent } from './components/department-dialog/department-dialog.component';
import { AuthGuard } from './auth.guard';


export function tokenGetter() {
  return localStorage.getItem('accessToken');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DepartmentComponent,
    EmployeeComponent,
    UsersComponent,
    DialogComponent,
    UserDialogComponent,
    DepartmentDialogComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: [],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthService, HttpClient, StorageService, UserService, JwtHelperService, ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
