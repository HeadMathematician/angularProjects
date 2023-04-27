import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  tableData: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private http: HttpClient
  ) {

  }

  create(form: any) {
    const url = 'http://localhost:8080/api/employee';
    const data = {
      employeeNo: form.value.employeeNo,
      employeeName: form.value.employeeName,
      salary: form.value.salary,
      departmentNo: form.value.departmentNo
    };
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    this.http.post(url, body, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        this.tableData.push(response); // add the new row to the table data array
        this.dialogRef.close(); // close the dialog
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
