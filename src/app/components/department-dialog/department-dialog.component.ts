import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss']
})
export class DepartmentDialogComponent {

  tableData: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private http: HttpClient
  ) {

  }

  create(form: any) {
    const url = 'http://localhost:8080/api/department';
    const data = {
      departmentNo: form.value.departmentNo,
      departmentName: form.value.departmentName,
      departmentLocation: form.value.departmentLocation,
    };
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    this.http.post(url, body, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        this.tableData.push(response); 
        this.dialogRef.close(); 
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
