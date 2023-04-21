import { DialogComponent } from './../dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  columns = ['Employee Number', 'Employee Name', 'Salary', 'Department Number'];
  dataSource: any[] = [];
  data = [];
  editEmployee: any = null;
  editIndex = -1;

  constructor(private apiService: ApiService, private dialog: MatDialog){

  }

  ngOnInit(){
    this.apiService.getEmployees().subscribe((data: any[]) =>{
      console.log(this.dataSource);
      this.dataSource = data;
    })
  }

  deleteEmployee(employeeNo: number){
    this.apiService.deleteEmployee(employeeNo).subscribe(() => {
      this.dataSource = this.dataSource.filter((employee) => employee.employeeNo !== employeeNo);
    });
  }


  addEmployeeDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  saveRow(): void {
    const updatedEmployee = this.dataSource[this.editIndex];
    this.apiService.updateEmployee(updatedEmployee).subscribe(() => {
      this.dataSource[this.editIndex] = updatedEmployee;
      this.editIndex = -1;
    });
  }
  
  
  

  editRow(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.editIndex = -1;
  }

}