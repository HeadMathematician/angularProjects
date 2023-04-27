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
  columns = ['Employee No', 'Employee Name', 'Salary', 'Department No'];
  dataSource: any[] = [];
  data = [];
  editEmployee: any = null;
  editIndex = -1;
  displayEdit = false;
  oldEmployeeNo: any;

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
    const temp = this.oldEmployeeNo;
    const updatedEmployee = this.dataSource[this.editIndex];
    this.apiService.updateEmployee(temp, updatedEmployee).subscribe(() => {
      this.dataSource[this.editIndex] = updatedEmployee;
      this.displayEdit = false;
    });
  }
  
  
  

  editRow(index: number): void {
    this.editIndex = index;
    this.displayEdit = true;
    this.oldEmployeeNo = this.dataSource[this.editIndex].employeeNo;
  }

  cancelEdit(): void {
    this.displayEdit = false;
  }

}