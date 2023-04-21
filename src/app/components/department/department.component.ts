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
  columns = ['Department Number', 'Department Name', 'Department Location'];
  dataSource: any[] = [];
  editIndex = -1;

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
    const updatedDepartment = this.dataSource[this.editIndex];
    this.apiService.updateDepartment(updatedDepartment).subscribe(() => {
      this.dataSource[this.editIndex] = updatedDepartment;
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
