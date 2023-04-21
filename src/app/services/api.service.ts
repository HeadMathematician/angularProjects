import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getDepartmentsURL = 'http://localhost:8080/api/departments';
  getEmployeesURL = 'http://localhost:8080/api/employees';
  getUsersURL = 'http://localhost:8080/api/users';
  deleteDepartmentURL = 'http://localhost:8080/api/department/:no'
  deleteEmployeeURL = 'http://localhost:8080/api/employee/:no'
  deleteUserURL = 'http://localhost:8080/api/user/:no'
  createUserURL = 'http://localhost:8080/api/user';
  updateEmployeeURL = 'http://localhost:8080/api/employee/:no'
  updateDepartmentURL = 'http://localhost:8080/api/department/:no'


  constructor(private http: HttpClient){

  }


  
  getDepartments() {
    return this.http.get<any[]>(this.getDepartmentsURL);
  }

  getEmployees() {
    return this.http.get<any[]>(this.getEmployeesURL);
  }

  
  getUsers(){
    return this.http.get<any[]>(this.getUsersURL)
  }

  deleteDepartment(no:number){
    const url = `${this.deleteDepartmentURL.replace(':no', no.toString())}`;
    return this.http.delete(url);
  }

  deleteEmployee(no:number){
    const url = `${this.deleteEmployeeURL.replace(':no', no.toString())}`;
    return this.http.delete(url);
  }

  deleteUser(no:number){
    const url = `${this.deleteUserURL.replace(':no', no.toString())}`;
    return this.http.delete(url);
  }


  updateEmployee(employeeData: any){
    const updateEmployeeURL = `http://localhost:8080/api/employee/${employeeData.employeeNo}`;
    return this.http.put(updateEmployeeURL, employeeData);
  }

  updateDepartment(departmentData: any){
    const updateDepartmentURL = `http://localhost:8080/api/department/${departmentData.departmentNo}`;
    return this.http.put(updateDepartmentURL, departmentData);
  }

  updateUser(userData:any){
    console.log(userData.loginNo_Id);
    const updateUserURL = `http://localhost:8080/api/user/${userData.loginNo}`
    return this.http.put(updateUserURL, userData)
  }

  

}
