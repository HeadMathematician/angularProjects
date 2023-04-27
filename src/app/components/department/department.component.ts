import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit{
  columns = ['Department No', 'Department Name', 'Department Location'];
  dataSource: any[] = [];
  editIndex = -1;
  displayEdit = false;
  oldDepartmentNo: any;

  constructor(private apiService: ApiService, private dialog: MatDialog){

  }

  ngOnInit(){
    this.apiService.getDepartments().subscribe((data: any[]) =>{
      console.log(this.dataSource);
      this.dataSource = data;
    })
  }
  
  deleteDepartment(departmentNo: number){
    this.apiService.deleteDepartment(departmentNo).subscribe(() => {
      this.dataSource = this.dataSource.filter((department) => department.departmentNo !== departmentNo);
    });
  }

  addDepartmentDialog() {
    const dialogRef = this.dialog.open(DepartmentDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  saveRow(): void {
    const temp = this.oldDepartmentNo;
    const updatedDepartment = this.dataSource[this.editIndex];
    this.apiService.updateDepartment(temp, updatedDepartment).subscribe(() => {
      this.dataSource[this.editIndex] = updatedDepartment;
      this.displayEdit = false;
    });
  }
  

  editRow(index: number): void {
    this.editIndex = index;
    this.displayEdit = true;
    this.oldDepartmentNo = this.dataSource[this.editIndex].departmentNo;
  }

  cancelEdit(): void {
    this.displayEdit = false;
  }
  

}
